# Shahaan Khan — Master Resume

(315) 278-3717 | szkhan@syr.edu | [LinkedIn/shahaan-k](https://linkedin.com/in/shahaan-k) | [GitHub/ShahaanK](https://github.com/ShahaanK) | [Portfolio/shahaank.github.io](https://shahaank.github.io)

---

## Education

**Syracuse University, School of Information Studies** — Syracuse, New York — December 2026
Master of Science in Applied Human-Centered Artificial Intelligence | GPA: 4.0
Relevant Coursework:
- IST 707: Applied Machine Learning — scikit-learn, TensorFlow, Keras, PyTorch, clustering, classification, ensemble learning, deep learning, hyperparameter tuning, ML pipelines, stakeholder analysis (Spring 2026)
- IST 664: Natural Language Processing — spaCy, NLTK, Python, N-grams, POS tagging, NER, information extraction/retrieval, sentiment analysis, speech recognition (Spring 2026)
- IST 675: Dynamics of Human-AI Interaction — HAI theory, AI ethics, trust, explainability, affordances, anthropomorphism, agency (Spring 2026)
- IST 686: Quantitative Reasoning for Data Science — Bayesian/frequentist inference, ANOVA, logistic regression, Pearson correlation, R, hypothesis testing, reproducible analysis (Spring 2026)
- IST 659: Data Administration & Database Management — SQL (DDL/DML), PostgreSQL, database design, ER/conceptual/logical modeling, stored procedures, triggers, indexing, normalization, transactions, ETL (Fall 2025)
- IST 687: Introduction to Data Science — R, ggplot2, linear modeling, SVM, decision trees, association rules, Shiny apps, text mining, sentiment analysis, data wrangling (Fall 2025)
- IST 736: Text Mining — tokenization, text vectorization, rule-based/lexicon methods, linear text classifiers, transformer architecture (BERT), sentence embeddings, text clustering, zero/few-shot learning with LLMs, RAG, topic modeling, training label quality evaluation (Fall 2025)

**York University, Lassonde School of Engineering** — Toronto, Ontario, Canada — October 2023
Bachelor of Science in Computer Science

---

## Research Experience

**Graduate Research Assistant** — Syracuse University, School of Information Studies — November 2025 – Present
Advisor: Professor Joshua Introne

- Investigating cultural bias (Eastern vs. Western) and framing effects in LLM outputs and their impact on human belief formation, using prompt-based evaluation workflows to compare model behavior across cultural contexts
- Benchmarked 3 LLMs (GPT, Claude, Qwen/DeepSeek) across 3 prompting strategies (Zero-Shot, Few-Shot, Chain-of-Thought) against a 34-annotator gold standard on 25 binary classification tasks, identifying systematic East-West divergence in model annotation behavior (best F1: 0.285) and establishing a label annotation hierarchy across 56,797 CAMEL corpus texts
- Architected a config-driven annotation pipeline with checkpoint/resume and vLLM prefix caching, achieving 4.4–5.6x throughput gains and scaling to 7.1M API calls per model on a 12-node HPC cluster via HTCondor
- Currently conducting literature review and formulating research questions for forthcoming manuscript (in preparation)

**Graduate Teaching Assistant, SOURCE Explore** — Syracuse University, School of Information Studies — January 2026 – March 2026
Advisor: Professor Bei Yu

- Introduced 10 undergraduate researchers with no prior coding experience to LLM fundamentals including tokenization, API usage, and effective prompting with Claude and ChatGPT, enabling independent research data collection
- Supported the InferredMe: Data-Driven Self-Reflection on AI project by guiding students through AI interaction data extraction pipelines, teaching them to ingest and parse ChatGPT conversation logs for qualitative analysis

---

## Professional Experience

**Business Operations & AI Advisor** — Syracuse University Blackstone Launchpad — Syracuse, New York — January 2026 – Present

- Led weekly AI Office Hours advising ~10 early-stage student founders on integrating Claude, ChatGPT, OpenClaw, and Claude Co-Work into their workflows, teaching agentic AI tools, prompt engineering, and project-specific AI strategy
- Optimized workflows for preparing and disseminating weekly newsletters and outreach to over 3,000 alumni and subscribers

**Sponsor Chair** — Innovate Orange (Hackathon + Datathon) — Syracuse University — Fall 2025 – Present

- Secured sponsorships from Monster Energy and Celsius through cold outreach for a hackathon and datathon event with 100+ attendees

**Project Manager** — Stalwart Development Group — Syracuse, New York — April 2024 – August 2025

- Led the first general contractor project for the company ($2.25M base + $1M in change orders = $3.25M total), delivering 70% profitability
- Managed a $5M+ subcontractor portfolio across multiple concurrent job site development projects
- Implemented and piloted onsite facial recognition system for crew time tracking, reducing payroll validation time by 60% at test site before company-wide rollout
- Developed KPI tracking and reporting frameworks using Jibble and Excel to monitor project progress and drive accountability across all portfolio projects

**Computer Systems Analyst** — Stalwart Development Group — Syracuse, New York — November 2023 – August 2025

- Configured and deployed a FortiNet network firewall with VPN hardening, and implemented Apple ABM device management with documented protocols for a 10-person back office
- Built an internal Python application decreasing turnaround time by 70% by automating state-sponsored submittal package assembly, managing document selection, employee certification retrieval, SDS compilation, and PDF merging
- Developed an OCR-based invoice processing pipeline with Tesseract and template-based regex, eliminating manual data entry

**Technical Consultant (Part-Time/Freelance)** — Engineva Research Solutions Inc. — Toronto, Ontario, Canada — August 2023 – August 2024

- Authored ~10 technical reports documenting technological advancements for SR&ED tax incentive claims and government grants across the Technology, Media, and Telecommunications sector
- Engaged with clients to identify qualifying R&D activities and foster connections with external stakeholders to enhance SR&ED claim outcomes

**Programming Instructor** — Real Programming 4 Kids — Mississauga, Ontario, Canada — November 2021 – November 2024

- Taught computer programming to small classes of up to 4 students (ages 7–18) through building complete video games across beginner through advanced levels
- Guided students through full game development projects in Java (Processing, IntelliJ), Python (Processing, PyCharm), and Java Advanced (Minecraft Mod Course), covering OOP, trigonometry, vectors, and game physics
- Courses taught: Serpent Temple (Python), Pizza Bandit (Java), Sheep Herder (Java), UpStream (Python), Polar Peril (Java), Galacticat (Python), Java Asteroids, Python Avalanche, Minecraft Mod Course (Java Advanced)

**Technical Analyst** — Deloitte — Toronto, Ontario, Canada — January 2022 – August 2022

- Authored 50+ technical reports documenting AI/ML, IoT, 5G, banking/payments, and telecommunications developments for SR&ED tax incentive claims across Fortune 100 clients in the Technology, Media, and Telecommunications sector
- Supported clients in the TMT sector in procuring government incentives for scientific research and experimental development activities, strategic initiatives, and technical projects

---

## Technical Projects

**TutorBot — NLP Pipeline for Automated Writing Evaluation Tutor** | [GitHub](https://github.com/ShahaanK/writing-improvement-ui)

- Engineered a 4-stage NLP pipeline for automated writing evaluation, processing ChatGPT conversation logs through heuristic filtering, LLM-based confirmation, and multi-label scoring for grammar, punctuation, and tone
- Built a batch inference system with rate limiting and queue management using Claude's API, reducing LLM API costs by 90% while maintaining classification accuracy through hybrid rule-based and neural approaches

**ClearPath — AI-Powered Mobile Health Platform** | [Devpost](https://devpost.com/software/clear-path-xao3gp) | 1st Place, CuseHacks 2025

- Built an AI-powered mobile health platform in a 3-person team during a 24-hour hackathon for ophthalmology screening in rural Kenya
- Developed the frontend in React Native with TypeScript and integrated Supabase for real-time data management and user authentication

**Residential Energy Demand Forecasting — Interactive Shiny App** | [GitHub](https://github.com/ShahaanK/SU-MAHCAI-IST-687-Intro-Data-Science/tree/main/Final%20Project) | [Live App](https://0lbx1g-ben-e.shinyapps.io/687projectfinal/)

- Built linear regression models with interaction terms in R to predict hourly electricity consumption across 250 stratified households, processing 3.7M+ records from 5,050+ source files joined across static home attributes, hourly usage, and county-level weather data
- Designed feature engineering pipeline converting categorical insulation, HVAC, and window attributes into ordered numeric scales with interaction terms (temperature × insulation, temperature × humidity), comparing 7 model variants
- Simulated future demand scenarios projecting a 23.6% peak demand increase under a 5°C temperature rise, identifying targeted insulation upgrade programs for small/medium homes (69% of housing stock) as the highest-impact intervention

---

## Presentations & Media

**"Decode Your AI Habits: Building Critical AI Skills for Your Career"** — Syracuse University Career Conference, Track 3 — March 26, 2026

- Co-presented with Professor Bei Yu an interactive session combining self-reflection and vibe coding to help students understand their AI interaction habits (delegating vs. enhancing critical thinking)
- Featured in Syracuse University news coverage: [syracuse.edu/stories/career-conference](https://www.syracuse.edu/stories/career-conference/)
- Recording: [YouTube](https://youtube.com/watch?v=J9W2EeQlxoE)

**"Anthropic & Claude: LLMs, Model Issues & How Constitutional AI Fixes Them"** — In-Class Presentation

- Presented on LLM architecture, known model issues, and Anthropic's Constitutional AI approach
- Recording: [YouTube](https://youtube.com/watch?v=fWpEhvvo4w4)

---

## Technical Skills

**Programming & Infrastructure:** Java, Python, R, C, C++, React, React Native, TypeScript, Bash/Shell Scripting, Unix/Linux, Docker, AWS, Azure, GitHub, SQL/PostgreSQL, Jupyter Notebooks, Google Colab

**AI/ML Frameworks & Libraries:** TensorFlow, Keras, PyTorch, Scikit-learn, Hugging Face, LangChain, spaCy, NLTK, vLLM, ChromaDB, Claude Code, MCP (Model Context Protocol), ggplot2, Shiny, Pandas, NumPy, Matplotlib, Seaborn

**Database & Data Engineering:** SQL (DDL/DML), PostgreSQL, Database Design, Conceptual/Logical Data Modeling, ER Diagrams, Stored Procedures, Views, Triggers, Indexing/Query Optimization, Data Normalization (1NF/2NF/3NF), Transaction Management, Concurrency Control, ETL, JSON, Data Wrangling

**NLP & Text Processing:** Tokenization, Text Vectorization, POS Tagging, Named Entity Recognition (NER), N-grams, Regular Expressions, Information Extraction, Information Retrieval, Sentiment Analysis, Text Classification, TF-IDF, Topic Modeling, Rule-Based/Lexicon Methods, Linear Text Classifiers, Transformer Architecture (BERT), Sentence Embeddings, Zero-Shot/Few-Shot Learning, Retrieval-Augmented Generation (RAG), Training Label Quality Evaluation, Speech Recognition, Prompt Engineering, LLM Evaluation

**Machine Learning Methods:** Supervised Learning (Linear/Logistic Regression, SVM, Decision Trees, Ensemble Learning), Unsupervised Learning (Clustering, Dimensionality Reduction, Association Rules Mining), Deep Learning, Hyperparameter Tuning, Cross-Validation, Model Evaluation/Selection, Feature Engineering, ML Pipeline Management, Agentic Workflows

**Statistical Methods:** Bayesian Inference, Frequentist Inference, Statistical Inference, ANOVA, Pearson Correlation, Hypothesis Testing, Data Screening, Reproducible Analysis

**Human-Centered AI & Ethics:** Human-AI Interaction Theory, Explainable AI (XAI), AI Ethics, Trust in Automation, Responsible AI, Affordance Theory, Cultural Bias Evaluation

**Tools & Platforms:** Cursor, GitHub Copilot, Claude Code, Expo, Supabase, Tesseract OCR, FortiNet, Jibble, HPC/HTCondor, GitHub Codespaces, Anaconda

---

## Certifications

- Foundations of Project Management (Google)

---

## Volunteer & Community

**Masjid Isa Ibn Maryam** — Syracuse, New York — 2023 – Present

- Active community volunteer supporting Ramadan programming, event coordination, and general community service

---

## Work Authorization

Canadian citizen on F-1 student visa. Authorized to work via **Curricular Practical Training (CPT)** — entirely university-administered, requires only an offer letter. Zero employer cost, paperwork, or sponsorship filing.
