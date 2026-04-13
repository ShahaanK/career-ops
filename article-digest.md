# Article Digest — Proof Points & Project Details

## Shahaan Khan | AI Researcher & Engineer

---

## LLM Cultural Bias Research (Active — Prof. Joshua Introne, Syracuse)

**What:** Benchmarking Western (GPT, Claude) vs. Eastern (Qwen, DeepSeek) LLMs for cultural bias using the CAMEL corpus. Testing Zero-Shot, Few-Shot, and Chain-of-Thought prompting strategies across 25 binary classification tasks.

**Scale:** 56,797 CAMEL corpus texts. 34-annotator gold standard. 7.1M API calls per model. 12-node HPC cluster via HTCondor.

**Technical depth:**
- Config-driven annotation pipeline with checkpoint/resume for fault tolerance
- vLLM prefix caching achieving 4.4-5.6x throughput gains
- Identified systematic East-West divergence in model annotation behavior (best F1: 0.285)
- Established label annotation hierarchy across full corpus

**Why it matters:** Demonstrates that LLM outputs carry measurable cultural framing effects that can influence human belief formation. Directly relevant to AI safety, responsible AI, and LLM evaluation roles.

---

## InferredMe: Data-Driven Self-Reflection on AI (Prof. Bei Yu, Syracuse + Prof. Mohammad Atari, UMass Amherst)

**What:** Human-AI interaction research exploring how people use AI tools — whether they delegate thinking or use AI to enhance critical reasoning. Co-presented at Syracuse Spring 2026 Career Conference as "Decode Your AI Habits: Are You Thinking or Prompting?"

**Technical stack:** Python, LLMs analyzing real ChatGPT conversation data, qualitative analysis pipelines.

**Contribution:** Guided 10 undergraduate researchers through AI interaction data extraction pipelines. Taught data ingestion and parsing of ChatGPT conversation logs.

---

## TutorBot — NLP Pipeline for Automated Writing Evaluation

**What:** 4-stage NLP pipeline that analyzes ChatGPT conversation logs to identify writing issues and generates personalized practice sessions using Claude's API.

**Pipeline stages:**
1. Heuristic filtering (keyword-based, length thresholds)
2. LLM confirmation (batch processing with rate limiting)
3. Detailed evaluation (multi-label scoring: grammar, punctuation, tone)
4. Pattern analysis (frequency grouping, severity classification)

**Key result:** 90% reduction in API costs through hybrid rule-based and neural approaches. Batch inference with queue management and rate limiting.

**Stack:** React, TypeScript, Anthropic Claude API, Tailwind CSS.

---

## ClearPath — AI Mobile Health Platform (1st Place, CuseHacks 2025)

**What:** AI-powered ophthalmology screening platform designed for rural Kenya. Mobile-first design for healthcare workers with limited connectivity.

**Stack:** React Native, TypeScript, Supabase, Expo.

**Result:** Won first place at Syracuse University's CuseHacks 2025 hackathon.

---

## Stalwart Development Group — Operational AI & Automation

**Project Management ($3.25M):**
- Led first general contractor project, delivering 70% profitability
- Cross-functional coordination across subcontractors, compliance, and client stakeholders

**Facial Recognition Pilot:**
- Implemented onsite facial recognition for crew time tracking
- Reduced payroll validation time by 60% at test site before company-wide rollout
- End-to-end: concept → evaluation → pilot → rollout

**Python Automation:**
- Built submittal package automation reducing turnaround by 70%
- OCR-based invoice processing with Tesseract and template-based regex

---

## Deloitte — Technical Analysis (AI/ML & IoT)

- Authored technical reports documenting AI/ML and IoT developments for SR&ED tax incentive claims
- Fortune 100 clients in Technology, Media, and Telecommunications
- Developed analytical frameworks for evaluating R&D activities against government criteria

---

## Speaking & Teaching

- "Decode Your AI Habits: Are You Thinking or Prompting?" — Career Conference 2026, co-presented with Prof. Bei Yu
- "Anthropic & Claude: LLMs, Model Issues & How Constitutional AI Fixes Them" — Spring 2026 class presentation
- AI Office Hours at Blackstone Launchpad — advising student founders on ML tools, agentic AI, and business development
- Graduate TA for SOURCE Explore — teaching LLM fundamentals to students with no prior coding experience
