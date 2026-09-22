# KNOVIA AI: Sovereign On-Premise Agentic AI Workbench

![SIH 2026](https://img.shields.io/badge/Smart%20India%20Hackathon-2026-orange)
![Team](https://img.shields.io/badge/Team-Dhurandhar-blue)
![Problem Statement](https://img.shields.io/badge/PS%20ID-SIH26117-green)
![Theme](https://img.shields.io/badge/Theme-Smart%20Automation-purple)

**KNOVIA AI** is a sovereign, on-premise agentic AI platform that unifies enterprise data, engineering knowledge, and local AI models. It enables secure, intelligent engineering workflows through multimodal analysis, hybrid RAG, deterministic computation, and distributed AI execution.

---

## 🌟 Vision & Problem Statement
Industrial organizations handle highly confidential information (SOPs, inspection reports, scanned documents, code). Conventional cloud AI systems create concerns around data privacy and weak integration with engineering workflows.

Knovia AI addresses this by providing a **private, locally operated AI workbench** designed to understand organizational knowledge and execute engineering tasks without sending confidential information to external cloud APIs.

---

## 🌐 Live Demos & Previews
- 🖥️ **[UI Preview: Sovereign AI Workbench](https://sovereign-ai-eosin.vercel.app/)** - Explore how the user interface will look like.
- 🏗️ **[System Architecture — Sovereign Adaptive AI Workbench](https://demo-test-alpha-ecru.vercel.app/)** - Detailed interactive system architecture.

---

## 📖 Complete Project Documentation
Detailed project documents are available in the [`doc/`](./doc/) directory:

- 📄 **[Technical Documentation](./doc/TechnicalDoc.pdf)**: Comprehensive architecture, security aspects, scalability, and system components.
- 💼 **[Business Documentation](./doc/BusinessDoc.docx)**: Market analysis, operational impact, unique selling propositions (USPs), and objectives.
- 📊 **[Research Documentation](./doc/Research_Doc.xlsx)**: Research data, analytics, and evaluation matrix.

---

## 🚀 Innovative Features & USPs

1. **Distributed AI Compute**: Discovers available GPUs across the private network and schedules dependency-aware AI tasks for coordinated execution, reducing end-to-end latency.
2. **Multimodal Document Intelligence**: Combines **OCR, Docling, and SmolVLM (2B)** to understand text, document structure, tables, and visual content without crashing ordinary 16GB–24GB GPUs.
3. **Engineering Calculation Engine**: Performs deterministic engineering calculations (corrosion rate, remaining life, LMTD) alongside AI reasoning.
4. **Adaptive Model Routing**: Dynamically routes queries to **Qwen 3B/7B**, **Qwen Coder**, or **SmolVLM** to reduce unnecessary LLM calls and optimize latency.
5. **OpenTelemetry Tracking**: Captures planning, tool calls, execution, and completion in a fully traceable workflow.
6. **Session-Specific Document Uploads**: Uploaded documents remain available only within the active analysis session, preventing unintended reuse.
7. **Permission-Gated Execution**: Uses RBAC, Keycloak, and human-in-the-loop approvals to govern sensitive agent actions.
8. **Network Observability & Security**: Monitors and restricts unauthorized external connections using Cilium and Hubble, keeping data within the secured environment.
9. **Persistent Workflow Storage**: Maintains context across long-running operations using state checkpointing.
10. **Structured Refinery Cost Analysis**: Rule-based cost models evaluate CAPEX/OPEX, maintenance, and budget variance.

---

## 🏗️ High-Level Architecture & Tech Stack

![System Architecture](./image.png)

```text
┌─────────────────────────────────────────────────────────────┐
│                 SECURITY & ACCESS CONTROL                   │
│ Keycloak • IAM • RBAC • Data Encryption • Policy Enforcement│
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│               LLM ORCHESTRATION LAYER                       │
│ Query Understanding • Task Decomposition • Dependency Graph │
└─────────────┬──────────────┬───────────────┬────────────────┘
              │              │               │
              ▼              ▼               ▼
       LOCAL AI/RAG       AGENTS          TOOLS
              │              │               │
              ▼              ▼               ▼
       Qwen / OCR /     Data Analysis /   Python / Search /
    Docling / SmolVLM    Coding / Docs    Git / File System
```

### 🛠️ Tech Stack & Algorithms
- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Python, Docker, WebSockets
- **Databases**: PostgreSQL (Relational) & Qdrant (Vector)
- **Security**: AES-256-GCM, TLS 1.3, SHA-256, Argon2id/bcrypt
- **Algorithms**: BGE-M3, BM25, HNSW, cosine similarity, RRF, ReAct, DAG planning, state machines

---

## 📊 Feasibility, Impact & Benefits

**System Impact compared to Traditional Local AI:**
- **AI Processing (Tokens/Query):** 38% fewer (2.6K vs 4.2K)
- **Compute Cost/Query:** 37% lower (₹3.80 vs ₹6.00)
- **Answer Correctness:** +8 pp (96% vs 88%)
- **Evidence Supported Answers:** +9 pp (93% vs 84%)
- **GPU Utilization:** +27 pp (82% vs 55%)

**Key Operational Benefits:**
- **Accelerating Refinery Engineering Analysis:** Reduces time spent gathering information.
- **Improving Equipment Reliability:** Targeting up to 30% reduction in unplanned downtime.
- **Optimizing Maintenance Decisions:** Supporting around 10% lower maintenance outlays.
- **Reducing Engineering Response Time:** ~191 hours saved per 100 users annually.

**Target Audience:** Field Engineers, Plant Managers, Security Officers, Operations Teams, Quality Inspectors, Procurement Specialists, R&D Analysts, and Auditors.

---

## 💡 Example Scenario

**User Prompt:**
> *"Analyze the latest P-102 inspection package, compare it with the applicable SOP and previous inspection history, review the equipment image, calculate deviations, identify anomalies, determine the risk level, and create an approval report."*

**Workbench Execution Plan:**
1. Securely verify user permissions (Zero Trust & Zero Egress).
2. Retrieve P-102 equipment data, SOP, and history from Qdrant/PostgreSQL via Hybrid RAG.
3. Perform Docling OCR on the report and analyze the image using SmolVLM.
4. Use the Python Calculation Engine to find deviations deterministically.
5. Generate a final report via the Document Agent and pass it to the Verification Layer.
6. Await **Human Verification (Accept/Reject/Modify)** before finalizing the action.

---

For more details on styling and component structure, please refer to the project guidelines.
