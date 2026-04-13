# Mode: tracker — Applications Tracker

Read and display `data/applications.md`.

**Tracker format:**
```markdown
| # | Date | Company | Role | Score | Status | PDF | Report | Notes |
```

Possible statuses: `Evaluated` → `Applied` → `Responded` → `Contact` → `Interview` → `Offer` / `Rejected` / `Discarded` / `SKIP`

- `Evaluated` = report completed, pending decision
- `Applied` = candidate submitted application
- `Responded` = recruiter/company contacted and candidate responded (inbound)
- `Contact` = candidate proactively contacted someone at the company (outbound, e.g., LinkedIn power move)
- `Interview` = in interview process
- `Offer` = offer received
- `Rejected` = rejected by company
- `Discarded` = discarded by candidate or offer closed
- `SKIP` = doesn't fit, don't apply

If user asks to update a status, edit the corresponding row.

Also show statistics:
- Total applications
- By status
- Average score
- % with PDF generated
- % with report generated
