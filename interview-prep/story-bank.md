# Story Bank — Master STAR+R Stories

This file accumulates your best interview stories over time. Each evaluation (Block F) adds new stories here. Instead of memorizing 100 answers, maintain 5-10 deep stories that you can bend to answer almost any behavioral question.

## How it works

1. Every time `/career-ops oferta` generates Block F (Interview Plan), new STAR+R stories get appended here
2. Before your next interview, review this file — your stories are already organized by theme
3. The "Big Three" questions can be answered with stories from this bank:
   - "Tell me about yourself" → combine 2-3 stories into a narrative
   - "Tell me about your most impactful project" → pick your highest-impact story
   - "Tell me about a conflict you resolved" → find a story with a Reflection

---

## Stories

### [Research/Technical] LLM Cultural Bias Research
**Source:** Syracuse University — Graduate Research Project
**S (Situation):** Investigating how Western vs Eastern LLMs produce culturally biased outputs — a critical problem for global AI deployment that hadn't been systematically studied.
**T (Task):** Benchmark 3 LLMs across 3 prompting strategies on 56,797 texts with 34-annotator gold standard to quantify cultural bias in sentiment analysis.
**A (Action):** Architected a config-driven pipeline with vLLM caching, scaled experiments to 7.1M API calls on a 12-node HPC cluster. Designed annotation methodology with inter-annotator agreement metrics.
**R (Result):** Identified systematic East-West divergence (F1: 0.285), established a label hierarchy that explains cultural perception gaps. Research positioned for publication.
**Reflection:** Learned that bias manifests differently across prompting strategies — zero-shot vs Chain-of-Thought produce different cultural framings. This insight changes how we should evaluate LLMs for cross-cultural applications.
**Best for questions about:** Technical depth, research methodology, working with ambiguity, large-scale systems, attention to detail, handling complexity

---

### [Optimization/Impact] TutorBot Cost Optimization
**Source:** Course Project — AI Systems Design
**S (Situation):** Needed to evaluate writing quality across thousands of ChatGPT tutoring messages without burning the research budget on API costs.
**T (Task):** Build an automated evaluation pipeline that minimizes API costs while maintaining classification accuracy.
**A (Action):** Designed a 4-stage pipeline: heuristic filtering → LLM confirmation → quality scoring → pattern analysis. Created rule-based filters to eliminate obvious cases before invoking expensive API calls.
**R (Result):** 90% reduction in API costs while maintaining classification accuracy. Pipeline processed the full dataset within budget constraints.
**Reflection:** Hybrid rule-based + neural approaches outperform pure LLM solutions when you can decompose the problem. Not everything needs a foundation model — sometimes regex and heuristics are the right tool.
**Best for questions about:** Cost optimization, system design, pragmatic engineering, problem decomposition, resource constraints

---

### [Leadership/Delivery] $3.25M Project Delivery
**Source:** Shah Enterprise Group — Operations Manager
**S (Situation):** First general contractor project for a small construction company — no playbook existed, high stakes, multiple stakeholders.
**T (Task):** Deliver the project profitably while establishing repeatable processes for future projects.
**A (Action):** Led cross-functional coordination across subcontractors, suppliers, and clients. Implemented tracking systems for milestones and costs. Piloted AI (facial recognition) for payroll validation in field operations.
**R (Result):** 70% profitability on the project. 60% reduction in payroll validation time from the facial recognition pilot. Established SOPs used for subsequent projects.
**Reflection:** Operational leadership transfers directly to research project management — scoping, milestones, stakeholder communication, and handling ambiguity. The skills are the same, just different domains.
**Best for questions about:** Leadership, project management, working with stakeholders, handling pressure, operational excellence, innovation

---

### [Innovation/Speed] ClearPath Hackathon Win
**Source:** CuseHacks 2025 — 24-hour hackathon
**S (Situation):** CuseHacks 2025 hackathon focused on social impact. Had 24 hours to build something meaningful in healthcare AI.
**T (Task):** Build a functional prototype that solves a real healthcare problem and can be demoed to judges.
**A (Action):** Built an ophthalmology screening platform for rural Kenya in React Native + TypeScript + Supabase. Designed mobile-first UX for low-connectivity environments. Integrated image capture and analysis workflow.
**R (Result):** Won 1st place out of 50+ teams. Judges highlighted the technical execution and social impact alignment.
**Reflection:** Constraints force creativity — limited time meant ruthless prioritization of core user flow. The best hackathon projects aren't feature-complete; they nail one thing perfectly.
**Best for questions about:** Working under pressure, rapid prototyping, prioritization, teamwork, social impact, technical execution

---

## Story Matrix (which story for which question type)

| Question Type | Primary Story | Backup Story |
|---------------|---------------|--------------|
| Technical challenge | LLM Cultural Bias | TutorBot Optimization |
| Leadership/teamwork | $3.25M Project | ClearPath Hackathon |
| Working under pressure | ClearPath Hackathon | $3.25M Project |
| Problem solving | TutorBot Optimization | LLM Cultural Bias |
| Innovation/creativity | ClearPath Hackathon | TutorBot Optimization |
| Handling failure/learning | LLM Cultural Bias (reflections) | $3.25M Project |
| Impact/results | $3.25M Project | LLM Cultural Bias |
| Cross-functional collaboration | $3.25M Project | ClearPath Hackathon |
