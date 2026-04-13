# Mode: scan — Portal Scanner (Offer Discovery)

Scan configured job portals, filter by title relevance, and add new offers to the pipeline for later evaluation.

## Recommended Execution

Run as subagent to avoid consuming main context:

```
Agent(
    subagent_type="general-purpose",
    prompt="[this file content + specific data]",
    run_in_background=True
)
```

## Configuration

Read `portals.yml` containing:
- `search_queries`: List of WebSearch queries with `site:` filters by portal (broad discovery)
- `tracked_companies`: Specific companies with `careers_url` for direct navigation
- `title_filter`: Keywords positive/negative/seniority_boost for title filtering

## Discovery Strategy (3 levels)

### Level 1 — Direct Playwright (PRIMARY)

**For each company in `tracked_companies`:** Navigate to their `careers_url` with Playwright (`browser_navigate` + `browser_snapshot`), read ALL visible job listings, and extract title + URL for each. This is the most reliable method because:
- Sees page in real-time (not cached Google results)
- Works with SPAs (Ashby, Lever, Workday)
- Detects new offers instantly
- Doesn't depend on Google indexing

**Each company MUST have `careers_url` in portals.yml.** If missing, search for it once, save it, and use in future scans.

### Level 2 — Greenhouse API (COMPLEMENTARY)

For companies with a public API or structured feed, use the JSON/XML response as a quick Level 1 supplement. It's faster than Playwright and reduces visual scraping errors.

**Current support (variables in `{}`):**
- **Greenhouse**: `GET https://boards-api.greenhouse.io/v1/boards/{company}/jobs`
- **Ashby**: `POST https://jobs.ashbyhq.com/api/non-user-graphql?op=ApiJobBoardWithTeams` — requires JSON body with query and `organizationHostedJobsPageName` as a GraphQL variable. Must send as POST with `Content-Type: application/json`, not GET.
- **BambooHR**: list `GET https://{company}.bamboohr.com/careers/list`; single posting detail `GET https://{company}.bamboohr.com/careers/{id}/detail`. Note: some companies disable the public careers API — a 404 on `/careers/list` doesn't mean BambooHR isn't in use.
- **Lever**: `GET https://api.lever.co/v0/postings/{company}?mode=json`
- **Teamtailor**: `GET https://{company}.teamtailor.com/jobs.rss` — some companies use a custom domain instead of the `{company}.teamtailor.com` subdomain.
- **Workday**: `POST https://{company}.{shard}.myworkdayjobs.com/wday/cxs/{company}/{site}/jobs` — the `{shard}` (e.g., `wd1`, `wd5`) varies per tenant and isn't always predictable. Requires a JSON request body with search filters and pagination, e.g., `{"limit": 20, "offset": 0, "searchText": ""}`.

**Parsing convention by provider:**
- `greenhouse`: `jobs[]` → `title`, `absolute_url`, `location.name`, `updated_at`
- `ashby`: GraphQL `ApiJobBoardWithTeams` with `organizationHostedJobsPageName={company}` → `jobBoard.jobPostings[]` (`title`, `id`; construct public URL if not included in payload)
- `bamboohr`: list `result[]` → `jobOpeningName`, `id`; construct detail URL `https://{company}.bamboohr.com/careers/{id}/detail`; to read the full JD, GET the detail endpoint and use `result.jobOpening` (`jobOpeningName`, `description`, `datePosted`, `minimumExperience`, `compensation`, `jobOpeningShareUrl`)
- `lever`: root array `[]` → `text`, `hostedUrl` (fallback: `applyUrl`)
- `teamtailor`: RSS items → `title`, `link`
- `workday`: `jobPostings[]`/`jobPostings` (varies by tenant) → `title`, `externalPath` or URL constructed from the host

### Level 3 — WebSearch queries (BROAD DISCOVERY)

The `search_queries` with `site:` filters cover portals broadly (all Ashby, all Greenhouse, etc.). Useful for discovering NEW companies not yet in `tracked_companies`, but results may be stale.

**Execution priority:**
1. Level 1: Playwright → all `tracked_companies` with `careers_url`
2. Level 2: API → all `tracked_companies` with `api:`
3. Level 3: WebSearch → all `search_queries` with `enabled: true`

Levels are additive — all execute, results merge and deduplicate.

## Workflow

1. **Read configuration**: `portals.yml`
2. **Read history**: `data/scan-history.tsv` → URLs already seen
3. **Read dedup sources**: `data/applications.md` + `data/pipeline.md`

4. **Level 1 — Playwright scan** (parallel in batches of 3-5):
   For each company in `tracked_companies` with `enabled: true` and `careers_url` defined:
   a. `browser_navigate` to the `careers_url`
   b. `browser_snapshot` to read all job listings
   c. If page has filters/departments, navigate relevant sections
   d. For each job listing extract: `{title, url, company}`
   e. If page paginates, navigate additional pages
   f. Accumulate in candidate list
   g. If `careers_url` fails (404, redirect), try `scan_query` as fallback and note for URL update

5. **Level 2 — ATS APIs / feeds** (parallel):
   For each company in `tracked_companies` with `api:` defined and `enabled: true`:
   a. WebFetch the API/feed URL
   b. If `api_provider` is defined, use its parser; if not, infer by domain (`boards-api.greenhouse.io`, `jobs.ashbyhq.com`, `api.lever.co`, `*.bamboohr.com`, `*.teamtailor.com`, `*.myworkdayjobs.com`)
   c. For **Ashby**, send a POST with `Content-Type: application/json` containing:
      - `operationName: ApiJobBoardWithTeams`
      - `variables.organizationHostedJobsPageName: {company}`
      - GraphQL query for `jobBoardWithTeams` + `jobPostings { id title locationName employmentType compensationTierSummary }`
   d. For **BambooHR**, the list endpoint only returns basic metadata. For each relevant item, read its `id`, then GET `https://{company}.bamboohr.com/careers/{id}/detail` to extract the full JD from `result.jobOpening`. Use `jobOpeningShareUrl` as the public URL if present; otherwise fall back to the detail URL. Note: a 404 on `/careers/list` doesn't mean BambooHR isn't in use — some companies disable the public API.
   e. For **Workday**, send a POST with `Content-Type: application/json` to the CXS jobs endpoint with at least `{"appliedFacets":{},"limit":20,"offset":0,"searchText":""}` and paginate by `offset` until results are exhausted. The `{shard}` in the URL (e.g., `wd1`, `wd5`) varies per tenant and may need to be discovered from the company's careers page redirect.
   f. For each job, extract and normalize: `{title, url, company}`
   g. Accumulate into candidate list (dedup against Level 1)

6. **Level 3 — WebSearch queries** (parallel if possible):
   For each query in `search_queries` with `enabled: true`:
   a. Execute WebSearch with the defined `query`
   b. From each result extract: `{title, url, company}`
      - **title**: from result title (before " @ " or " | ")
      - **url**: result URL
      - **company**: after " @ " in title, or extract from domain/path
   c. Accumulate in candidate list (dedup with Level 1+2)

6. **Filter by title** using `title_filter` from `portals.yml`:
   - At least 1 keyword from `positive` must appear in title (case-insensitive)
   - 0 keywords from `negative` must appear
   - `seniority_boost` keywords give priority but aren't required

7. **Deduplicate** against 3 sources:
   - `scan-history.tsv` → exact URL already seen
   - `applications.md` → normalized company + role already evaluated
   - `pipeline.md` → exact URL already in pending or processed
7.5. **Verify liveness of WebSearch results (Level 3)** — BEFORE adding to pipeline:

   WebSearch results can be stale (Google caches results for weeks or months). To avoid evaluating expired postings, verify each new URL from Level 3 with Playwright. Levels 1 and 2 are inherently real-time and do not require this check.

   For each new Level 3 URL (sequential — NEVER run Playwright in parallel):
   a. `browser_navigate` to the URL
   b. `browser_snapshot` to read the content
   c. Classify:
      - **Active**: job title visible + role description present + an Apply/Submit control visible within the main content area. Do not count generic header/navbar/footer text.
      - **Expired** (any of these signals):
        - Final URL contains `?error=true` (Greenhouse redirects this way when a posting is closed)
        - Page contains: "job no longer available" / "no longer open" / "position has been filled" / "this job has expired" / "page not found"
        - Only navbar and footer visible with no JD content (content < ~300 chars)
   d. If expired: log to `scan-history.tsv` with status `skipped_expired` and discard
   e. If active: continue to step 8

   **Do not abort the entire scan if a single URL fails.** If `browser_navigate` errors out (timeout, 403, etc.), mark as `skipped_expired` and continue to the next URL.

8. **For each verified new posting that passes filters**:
   a. Add to `pipeline.md` under the "Pending" section: `- [ ] {url} | {company} | {title}`
   b. Log to `scan-history.tsv`: `{url}\t{date}\t{query_name}\t{title}\t{company}\tadded`

9. **Postings filtered by title**: log to `scan-history.tsv` with status `skipped_title`
10. **Duplicate postings**: log with status `skipped_dup`
11. **Expired postings (Level 3)**: log with status `skipped_expired`

## Title and Company Extraction from WebSearch Results

WebSearch results come in format: `"Job Title @ Company"` or `"Job Title | Company"` or `"Job Title — Company"`.

Extraction patterns by portal:
- **Ashby**: `"Senior AI PM (Remote) @ EverAI"` → title: `Senior AI PM`, company: `EverAI`
- **Greenhouse**: `"AI Engineer at Anthropic"` → title: `AI Engineer`, company: `Anthropic`
- **Lever**: `"Product Manager - AI @ Temporal"` → title: `Product Manager - AI`, company: `Temporal`

Generic regex: `(.+?)(?:\s*[@|—–-]\s*|\s+at\s+)(.+?)$`

## Private URLs

If a non-publicly-accessible URL is found:
1. Save JD to `jds/{company}-{role-slug}.md`
2. Add to pipeline.md as: `- [ ] local:jds/{company}-{role-slug}.md | {company} | {title}`

## Scan History

`data/scan-history.tsv` tracks ALL URLs seen:

```
url	first_seen	portal	title	company	status
https://...	2026-02-10	Ashby — AI PM	PM AI	Acme	added
https://...	2026-02-10	Greenhouse — SA	Junior Dev	BigCo	skipped_title
https://...	2026-02-10	Ashby — AI PM	SA AI	OldCo	skipped_dup
https://...	2026-02-10	WebSearch — AI PM	PM AI	ClosedCo	skipped_expired
```

## Output Summary

```
Portal Scan — {YYYY-MM-DD}
━━━━━━━━━━━━━━━━━━━━━━━━━━
Queries executed: N
Postings found: N total
Filtered by title: N relevant
Duplicates: N (already evaluated or in pipeline)
New additions to pipeline.md: N

  + {company} | {title} | {query_name}
  ...

→ Run /career-ops pipeline to evaluate new offers.
```

## careers_url Management

Each company in `tracked_companies` must have `careers_url` — the direct URL to their job listings page. This avoids searching each time.

**Known patterns by platform:**
- **Ashby:** `https://jobs.ashbyhq.com/{slug}`
- **Greenhouse:** `https://job-boards.greenhouse.io/{slug}` or `https://job-boards.eu.greenhouse.io/{slug}`
- **Lever:** `https://jobs.lever.co/{slug}`
- **BambooHR:** list `https://{company}.bamboohr.com/careers/list`; detail `https://{company}.bamboohr.com/careers/{id}/detail`
- **Teamtailor:** `https://{company}.teamtailor.com/jobs`
- **Workday:** `https://{company}.{shard}.myworkdayjobs.com/{site}`
- **Custom:** The company's own URL (e.g., `https://openai.com/careers`)

**API/feed patterns by platform:**
- **Ashby API:** `POST https://jobs.ashbyhq.com/api/non-user-graphql?op=ApiJobBoardWithTeams` — requires JSON body with `Content-Type: application/json`, not GET.
- **BambooHR API:** list `GET https://{company}.bamboohr.com/careers/list`; detail `GET https://{company}.bamboohr.com/careers/{id}/detail` (`result.jobOpening`). Some companies disable this — a 404 doesn't mean BambooHR isn't in use.
- **Lever API:** `GET https://api.lever.co/v0/postings/{company}?mode=json`
- **Teamtailor RSS:** `GET https://{company}.teamtailor.com/jobs.rss` — some companies use a custom domain instead of the subdomain.
- **Workday API:** `POST https://{company}.{shard}.myworkdayjobs.com/wday/cxs/{company}/{site}/jobs` — requires JSON body (e.g., `{"appliedFacets":{},"limit":20,"offset":0,"searchText":""}`). The `{shard}` (e.g., `wd1`, `wd5`) varies per tenant.

**If `careers_url` doesn't exist** for a company:
1. Try their known platform pattern
2. If that fails, quick WebSearch: `"{company}" careers jobs`
3. Navigate with Playwright to confirm it works
4. **Save the found URL to portals.yml** for future scans

**If `careers_url` returns 404 or redirect:**
1. Note in output summary
2. Try scan_query as fallback
3. Mark for manual update

## portals.yml Maintenance

- **ALWAYS save `careers_url`** when adding a new company
- Add new queries as interesting portals or roles are discovered
- Disable queries with `enabled: false` if they generate too much noise
- Adjust filter keywords as target roles evolve
- Add companies to `tracked_companies` when wanting to follow them closely
- Periodically verify `careers_url` — companies change ATS platforms