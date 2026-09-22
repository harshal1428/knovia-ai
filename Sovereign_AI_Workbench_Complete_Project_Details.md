# Sovereign On-Premise Agentic AI Workbench

## Complete Project Details

> **Project Type:** Sovereign, on-premise, agentic AI workbench for
> confidential industrial organizations\
> **Primary Demonstration Domain:** Oil & Gas / Refinery operations\
> **Demo Organization:** ApexPetro Energy Limited (APEL)\
> **Primary Demo Facility:** Jamnagar Refinery Complex\
> **Primary Demo Asset:** P-102 centrifugal process pump

------------------------------------------------------------------------

# 1. Problem Statement Chosen

Industrial organizations such as refineries, PSUs, heavy engineering
companies and government organizations handle large volumes of
confidential information:

-   SOPs and policies
-   inspection reports
-   maintenance records
-   engineering manuals
-   asset registers
-   spreadsheets
-   scanned documents
-   images and drawings
-   historical reports
-   operational records
-   project files
-   source code and technical documents

Conventional enterprise search systems mainly retrieve documents.
Generic cloud AI systems can provide strong reasoning but create
concerns around:

-   confidential data leaving the organization
-   dependence on external cloud AI services
-   lack of control over model and tool execution
-   weak integration with engineering workflows
-   poor handling of multimodal documents
-   limited traceability of AI-generated answers
-   difficulty performing multi-step engineering tasks
-   lack of human approval for sensitive actions
-   inability to connect knowledge retrieval, calculations, analysis and
    artifact generation in one workflow

### Core Problem

The project addresses the need for a **private, locally operated AI
workbench** that can understand organizational knowledge and execute
useful engineering and business tasks without sending confidential
information to external AI services.

The system must go beyond a simple chatbot.

It should be able to:

1.  Understand user intent.
2.  Determine query complexity.
3.  Retrieve authorized company knowledge.
4.  Process uploaded documents and images.
5.  Use OCR and multimodal understanding.
6.  Compare multiple documents.
7.  Perform deterministic calculations.
8.  Analyze structured data.
9.  Detect anomalies.
10. Use specialized agents and tools.
11. Generate documents and other artifacts.
12. Support coding workflows.
13. Verify evidence and results.
14. Request human approval where required.
15. Maintain auditability and security.
16. Keep data and inference inside the organization's infrastructure.

------------------------------------------------------------------------

# 2. Demo Video

The demonstration should tell one continuous story rather than showing
disconnected features.

## Recommended Demo Story

### Step 1 --- User enters the Sovereign AI Workbench

Show:

-   local/on-premise status
-   company context
-   security status
-   active projects
-   local models
-   knowledge base

### Step 2 --- Ask a simple question

Example:

> "What equipment is associated with P-102?"

The system should use the fast path and retrieve only the required
company knowledge.

### Step 3 --- Ask a company/SOP question

Example:

> "What does the pump inspection SOP require before maintenance?"

Show:

-   intent detection
-   permission-aware retrieval
-   relevant SOP
-   grounded answer
-   source reference

### Step 4 --- Upload a document/image

Upload:

-   inspection report
-   equipment photograph
-   spreadsheet

Show:

``` text
Upload
→ Classification
→ OCR / Vision
→ Extraction
→ Chunking
→ Chat-scoped indexing
```

The uploaded document should remain available in that conversation and
should not automatically become permanent company knowledge.

### Step 5 --- Ask a multi-document question

Example:

> "Compare the 2024 and 2025 P-102 inspection reports."

Show:

-   both documents being retrieved
-   document identity and metadata
-   comparison
-   changes
-   evidence

### Step 6 --- Ask a complex agentic question

Example:

> "Analyze the latest P-102 inspection package, compare current readings
> with the applicable SOP and historical reports, calculate deviations,
> review the equipment image, determine the risk level, and prepare an
> approval note."

Show the Execution Planner:

``` text
Understand request
→ Retrieve asset information
→ Retrieve inspection report
→ OCR document
→ Analyze image
→ Retrieve SOP
→ Retrieve historical reports
→ Compare values
→ Calculate deviations
→ Analyze anomalies
→ Verify evidence
→ Request approval
→ Generate report
```

### Step 7 --- Human approval

Show:

-   risk level
-   evidence
-   recommendation
-   approval request

### Step 8 --- Artifact generation

Generate:

-   Excel report
-   PDF/Word report
-   management summary

### Step 9 --- Security/audit

Show:

-   local inference
-   blocked external access
-   audit event
-   executed tools
-   source documents
-   approval history

------------------------------------------------------------------------

# 3. Implementation UI

The product is designed as a **Sovereign AI Workbench**, not simply a
chatbot.

## Main UI Areas

### Application Shell

-   Sidebar navigation
-   Company/workspace selector
-   Global search
-   Security status
-   User profile
-   Main workspace
-   Context/evidence panels

### Main Navigation

#### Overview

-   Dashboard
-   System health

#### Workbench

-   Chat
-   Projects
-   Tasks
-   Artifacts

#### Knowledge

-   Knowledge Base
-   Documents
-   Upload/Ingestion
-   Collections

#### Intelligence

-   Agents
-   Models
-   Model Router

#### Tools

-   Tool Registry
-   Secure Sandbox

#### Governance

-   Approvals
-   Security
-   Audit Trail

#### Administration

-   Company Settings
-   User/Workspace Settings

## Workbench Layout

A complex task can use:

``` text
┌──────────────┬─────────────────────────────┬───────────────────┐
│ Project      │ Chat + Execution Planner    │ Evidence          │
│ Files        │                             │ Sources           │
│ Context      │ Agent steps                 │ Model information │
│              │ Results                     │ Artifacts         │
└──────────────┴─────────────────────────────┴───────────────────┘
```

The UI should expose the system's reasoning workflow without exposing
hidden chain-of-thought. It should show **execution steps, tools used,
status, evidence and results**.

------------------------------------------------------------------------

# 4. Introduction

## Project Name

**Sovereign On-Premise Agentic AI Workbench**

## Vision

Build a secure local AI platform that becomes a common intelligence and
execution layer for an industrial organization.

Instead of requiring employees to search multiple systems, open many
documents, perform calculations manually and create reports separately,
the user can ask the workbench to perform the complete task.

### Example

Instead of:

``` text
Search SOP
→ Open inspection report
→ Open previous report
→ Open spreadsheet
→ Calculate deviation
→ Analyze findings
→ Create report
→ Send for approval
```

the user can ask:

> "Analyze the latest inspection package, compare it with the applicable
> SOP and previous history, calculate the deviations, identify important
> findings and prepare an approval report."

The orchestration engine decomposes the request and invokes the required
capabilities.

------------------------------------------------------------------------

# 5. Objectives

## Primary Objectives

### 5.1 Sovereign AI

Run models and data processing locally/on-premise.

### 5.2 Enterprise Knowledge Access

Allow users to query company-specific:

-   documents
-   SOPs
-   policies
-   manuals
-   asset records
-   historical reports

### 5.3 Multimodal Understanding

Process:

-   PDF
-   DOCX
-   XLSX
-   PPTX
-   CSV
-   images
-   scanned documents
-   supported engineering documents

using OCR, parsing and multimodal models.

### 5.4 Agentic Execution

Move from:

> Question → Answer

to:

> Question → Plan → Retrieve → Execute → Verify → Deliver

### 5.5 Evidence-Grounded Answers

Company-specific answers should be based on authorized source material.

### 5.6 Deterministic Computation

Use calculation tools for numerical operations instead of relying only
on LLM arithmetic.

### 5.7 Engineering Analysis

Support:

-   historical comparison
-   trend analysis
-   anomaly detection
-   maintenance analysis
-   inspection analysis
-   asset analysis

### 5.8 Artifact Generation

Generate:

-   PDF
-   DOCX
-   XLSX
-   PPTX
-   reports
-   analysis outputs

### 5.9 Human-in-the-Loop Governance

Require approval for defined sensitive/high-risk workflows.

### 5.10 Developer Productivity

Provide a dedicated coding-agent workflow for:

-   code generation
-   project inspection
-   bug fixing
-   project creation
-   testing
-   file editing

------------------------------------------------------------------------

# 6. Unique Selling Propositions (USPs)

## USP 1 --- Sovereign AI

The platform is designed for environments where sensitive information
must remain inside organizational infrastructure.

``` text
Company Data
    ↓
Local Processing
    ↓
Local Models
    ↓
Local Storage
    ↓
Local Output
```

No dependency on external cloud AI is required for the core workflow.

## USP 2 --- Agentic Workbench, Not Just Chat

The system can perform tasks rather than only answer questions.

``` text
Understand
→ Plan
→ Retrieve
→ Execute
→ Verify
→ Deliver
```

## USP 3 --- Permission-Aware Knowledge

Retrieval can respect:

-   company
-   project
-   user
-   document
-   classification
-   department
-   access permissions

## USP 4 --- Multimodal Industrial Knowledge

The system can work with text, structured documents, scanned documents
and images.

## USP 5 --- Specialized Local AI

Different tasks can use different local capabilities:

-   fast local LLM
-   reasoning model
-   coding model
-   vision/OCR
-   embeddings
-   anomaly analysis
-   deterministic calculations

## USP 6 --- Evidence + Verification

The platform is designed to show where important answers came from and
verify results before delivery.

## USP 7 --- End-to-End Workflow

A single request can produce:

``` text
Knowledge
+
Analysis
+
Calculation
+
Visualization
+
Approval
+
Artifact
```

## USP 8 --- Human-Controlled Automation

The AI can recommend and execute controlled operations while keeping
humans in the approval loop for sensitive tasks.

## USP 9 --- Chat-Scoped Uploaded Knowledge

User-uploaded documents can be kept scoped to the relevant conversation
rather than automatically entering the permanent company knowledge base.

## USP 10 --- Coding Agent

A dedicated software-engineering agent can inspect, edit, run and verify
local project files.

------------------------------------------------------------------------

# 7. Impact

## Operational Impact

The platform can reduce the amount of manual effort required to:

-   search technical documents
-   understand reports
-   compare historical records
-   prepare summaries
-   perform repetitive calculations
-   generate reports
-   investigate anomalies

## Knowledge Impact

It makes organizational knowledge easier to access without requiring
users to know the exact filename or location of a document.

## Security Impact

Sensitive information can remain within the organization's
infrastructure.

## Engineering Impact

Engineers can move from manual document-by-document investigation to
integrated evidence-based analysis.

## Management Impact

Managers can receive:

-   concise summaries
-   trend information
-   risk indicators
-   supporting evidence
-   generated reports

without manually reviewing every source document.

## Developer Impact

The coding agent provides:

-   code generation
-   debugging
-   testing
-   project creation
-   controlled file editing

inside the same broader workbench ecosystem.

------------------------------------------------------------------------

# 8. Market Analysis

The project sits at the intersection of several existing technology
categories.

## Traditional Enterprise Search

Strength:

-   document retrieval

Limitation:

-   generally limited execution and reasoning

## Generic Cloud AI Assistants

Strength:

-   strong general reasoning
-   broad capabilities

Limitations for confidential industrial environments:

-   external data-processing concerns
-   limited organizational control
-   cloud dependency

## Enterprise RAG Platforms

Strength:

-   organization-specific retrieval

Limitations:

-   often focused primarily on retrieval/Q&A
-   limited agentic execution
-   limited multimodal engineering workflows

## Industrial Analytics Platforms

Strength:

-   specialized analytics

Limitation:

-   usually do not provide a general conversational agentic interface
    across organizational knowledge and tools

## Proposed Position

The proposed system combines:

``` text
Sovereign AI
+
Enterprise RAG
+
Multimodal Processing
+
Agentic Orchestration
+
Engineering Analytics
+
Deterministic Computation
+
Artifact Generation
+
Human Approval
+
Auditability
```

This creates a broader **industrial AI workbench** rather than a
standalone chatbot or search system.

------------------------------------------------------------------------

# 9. Methodology Details

The methodology follows a controlled pipeline.

``` text
USER
 ↓
Authentication / Authorization
 ↓
Query Understanding
 ↓
Intent + Complexity Detection
 ↓
Fast Path OR Planner
 ↓
Knowledge / Tools / Agents
 ↓
Execution
 ↓
Verification
 ↓
Response Synthesis
 ↓
Artifact Generation if required
 ↓
Human Approval if required
 ↓
Final Delivery
```

## Query Categories

### General

Examples:

-   "What is preventive maintenance?"
-   "Explain centrifugal pumps."
-   "How are you?"

Route:

``` text
Direct local LLM
```

### Company Knowledge

Examples:

-   "What does the maintenance department do?"
-   "Which policy applies to maintenance?"

Route:

``` text
Permission-aware RAG
```

### Document

Examples:

-   "Summarize the P-102 report."
-   "What does this SOP require?"

Route:

``` text
Document retrieval → LLM
```

### Comparison

Examples:

-   "Compare 2024 and 2025 inspection reports."

Route:

``` text
Multi-document retrieval → extraction → comparison → synthesis
```

### Calculation

Examples:

-   "Calculate percentage deviation."

Route:

``` text
Deterministic calculation engine
```

### Anomaly

Examples:

-   "Identify abnormal measurements."

Route:

``` text
Anomaly inspection → evidence/context → LLM explanation
```

### Complex Agentic

Examples:

-   "Analyze the inspection package and create an approval report."

Route:

``` text
Planner → multiple tools/agents → verification → artifact
```

------------------------------------------------------------------------

# 10. Architecture

## High-Level Architecture

``` text
┌─────────────────────────────────────────────────────────────┐
│                        USERS                                │
│ Engineers • Managers • Developers • Admins                 │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    USER WORKBENCH                           │
│ Chat • Projects • Files • Tasks • Artifacts • Approvals    │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                 SECURITY & ACCESS CONTROL                   │
│ SSO/MFA • RBAC • DLP • Permissions • Audit • Policies      │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│               LLM ORCHESTRATION ENGINE                     │
│ Intent • Complexity • Planner • Router • Memory • Control  │
└─────────────┬──────────────┬───────────────┬────────────────┘
              │              │               │
              ▼              ▼               ▼
       LOCAL AI/RAG       AGENTS          TOOLS
              │              │               │
              ▼              ▼               ▼
      Qwen / OCR /       Coding /        Python /
      Vision / BGE-M3    Analysis        Calculations
              │
              ▼
       SOVEREIGN DATA
 PostgreSQL • Qdrant • Local Storage
              │
              ▼
       VERIFICATION / GOVERNANCE
              │
              ▼
        HUMAN APPROVAL
              │
              ▼
       VERIFIED DELIVERABLE
```

------------------------------------------------------------------------

# 11. User Flow

## Simple Question

``` text
User
 ↓
Authentication
 ↓
Intent Detection
 ↓
Simple Query
 ↓
Fast Local Model
 ↓
Answer
```

Example:

> "What is preventive maintenance?"

No unnecessary planner or RAG call.

## Company Question

``` text
User
 ↓
Intent
 ↓
Permission Check
 ↓
BGE-M3
 ↓
Qdrant
 ↓
Relevant Documents
 ↓
Local LLM
 ↓
Grounded Answer
```

## Uploaded Document

``` text
Upload
 ↓
Classification
 ↓
OCR / Parser / Vision
 ↓
Extraction
 ↓
Chunking
 ↓
BGE-M3
 ↓
Chat-Scoped Storage
 ↓
Follow-up Questions
```

The uploaded document remains associated with the relevant conversation
rather than automatically becoming permanent company knowledge.

## Complex Question

``` text
User
 ↓
Intent
 ↓
Complexity Detection
 ↓
Planner
 ↓
Task Graph
 ├── Retrieve company information
 ├── Retrieve documents
 ├── OCR / Vision
 ├── Analyze data
 ├── Calculate
 ├── Compare
 ├── Verify
 └── Generate artifact
 ↓
Verification
 ↓
Human Approval if required
 ↓
Final Answer + Artifact
```

------------------------------------------------------------------------

# 12. Understanding the Flow

The orchestration engine is the central control plane.

## 12.1 Request Manager

Tracks:

-   request ID
-   conversation ID
-   user
-   project
-   task state
-   execution status

## 12.2 Intent Detection

Determines what the user wants.

Examples:

``` text
CONVERSATIONAL
COMPANY_KNOWLEDGE
DOCUMENT_QA
SUMMARIZATION
COMPARISON
CALCULATION
ANOMALY_ANALYSIS
CODING
ARTIFACT_GENERATION
COMPLEX_AGENTIC
```

## 12.3 Complexity Detection

Determines whether the request can use a fast path or requires planning.

## 12.4 Planner

Breaks complex tasks into executable steps.

## 12.5 Model Router

Selects the appropriate local model/capability.

Example:

``` text
Simple → Fast Model
Reasoning → Reasoning Model
Coding → Coding Model
Images → Vision Model
Embeddings → BGE-M3
```

## 12.6 Tool Router

Selects tools such as:

-   knowledge search
-   Python
-   file tools
-   Excel analysis
-   document generation
-   anomaly analysis
-   coding agent

## 12.7 Context Builder

Combines:

-   user request
-   relevant conversation context
-   retrieved evidence
-   tool results
-   calculations
-   agent outputs

## 12.8 Verification

Checks:

-   relevance
-   evidence
-   calculations
-   source references
-   output validity
-   policy requirements

## 12.9 Response Synthesis

Converts verified results into the appropriate response:

-   text
-   table
-   chart
-   code
-   document
-   report

------------------------------------------------------------------------

# 13. Design Considerations

## Security by Design

Security should be applied before data reaches models.

``` text
User
 ↓
Authentication
 ↓
Authorization
 ↓
Data filtering
 ↓
AI processing
```

## Least Privilege

Agents and tools should receive only the permissions required for the
task.

## No Unnecessary Tool Execution

A simple question should not invoke:

-   planner
-   anomaly engine
-   calculation engine
-   document generator

unless required.

## Evidence Over Volume

Retrieval should prioritize relevant information rather than simply
returning many chunks.

## Deterministic Computation

Numerical operations should use deterministic tools where possible.

## Human Approval

High-impact workflows should require human review.

## Isolation

Sandboxed execution should be isolated from external networks and
unnecessary system resources.

## Auditability

Important actions should be recorded.

## Failure Handling

The system should fail safely rather than invent missing information.

## Chat-Scoped Temporary Knowledge

Uploaded content should remain isolated to its intended
conversation/session.

------------------------------------------------------------------------

# 14. Tech Stack

## Frontend

-   React
-   TypeScript
-   Vite
-   Tailwind CSS
-   Component-based UI

## Backend

-   Python
-   API-based backend architecture
-   asynchronous task/execution handling where required

## Local AI

### Fast / Lightweight Model

Qwen-class small local model for simple and fast tasks.

### Reasoning Model

Qwen-class 7B model for complex reasoning and synthesis.

### Coding Model

Qwen Coder 7B for software-engineering workflows.

### Embedding Model

**BGE-M3**

Used to convert documents and queries into semantic vectors.

### Vision / OCR

Local OCR and multimodal processing pipeline for scanned documents,
images and supported visual content.

## LLM Runtime

**Ollama / local inference runtime**

Used to serve local models inside the organization's environment.

## Vector Database

**Qdrant**

Used for semantic/vector retrieval.

## Relational Database

**PostgreSQL**

Used for:

-   users
-   projects
-   conversations
-   tasks
-   execution state
-   audit metadata
-   workflow information

## Storage

Encrypted local storage for:

-   documents
-   project files
-   generated artifacts
-   workspace data

## Agent Framework

Specialized agent execution, including the coding-agent workflow based
on OpenHands where applicable.

## Execution

Isolated sandbox/container environment for controlled code and
calculation execution.

------------------------------------------------------------------------

# 15. Security Aspects

Security is a cross-cutting layer rather than a single feature.

## Authentication

### SSO

Single Sign-On integrates enterprise identity.

### MFA

Multi-Factor Authentication provides an additional identity verification
layer.

## RBAC

Role-Based Access Control determines what a user can access.

Example:

``` text
Admin
Manager
Engineer
Developer
Viewer
```

## Project / Document Permissions

Users can be restricted by:

-   project
-   department
-   document
-   workspace
-   classification

## DLP

Data Loss Prevention controls sensitive information movement and
handling.

## Data Classification

Example:

``` text
PUBLIC
INTERNAL
CONFIDENTIAL
RESTRICTED
```

## Encryption

Use strong encryption for stored sensitive data. The intended design
uses AES-256-class encryption for encrypted storage where implemented.

## TLS

Internal service communication should use TLS.

## Network Isolation

The platform is designed for:

-   no unnecessary Internet access
-   blocked external AI services
-   isolated execution
-   internal-only communication

## Model Allowlisting

Only approved local models should be available to the platform.

## Tool Allowlisting

Agents should only access explicitly approved tools.

## Sandbox Isolation

Code execution runs in an isolated environment with:

-   restricted filesystem
-   network disabled where appropriate
-   CPU/memory limits
-   execution timeout

## Audit Logging

Record important events:

``` text
Who
What
When
Which resource
Which agent/tool
Result
```

## Human Approval

Sensitive operations can require:

``` text
AI Recommendation
 ↓
Human Review
 ↓
Approve / Reject / Revise
```

------------------------------------------------------------------------

# 16. Scalability

The architecture should support scaling without changing the core user
experience.

## Horizontal Scaling

Independent services can be scaled separately:

``` text
Frontend
Backend API
Orchestrator
Inference
RAG
Document Processing
Agent Workers
Artifact Workers
```

## Model Scaling

Different hardware profiles can host different models.

## Queue-Based Execution

Long-running tasks can be moved to workers.

Example:

``` text
User
 ↓
API
 ↓
Task Queue
 ↓
Worker
 ↓
Agent Execution
 ↓
Result
```

## Parallel Execution

Independent planner steps can execute concurrently.

Example:

``` text
Retrieve SOP ─────┐
Retrieve history ─┼→ Comparison
Retrieve asset ───┘
```

## Caching

Safe caching can reduce repeated:

-   embeddings
-   document processing
-   metadata lookups
-   model initialization

## Vector Scaling

Qdrant can scale with the organization's document and embedding volume.

## Database Scaling

PostgreSQL can use:

-   indexing
-   connection pooling
-   partitioning where required
-   read replicas in larger deployments

## Storage Scaling

Document and artifact storage can scale independently from transactional
data.

## Multi-Company Architecture

Each organization can maintain logically isolated:

``` text
Users
Projects
Documents
Knowledge
Policies
Assets
Artifacts
Permissions
```

------------------------------------------------------------------------

# 17. Example End-to-End Scenario

## User Request

> "Analyze the latest P-102 inspection package, compare it with the
> applicable SOP and previous inspection history, review the equipment
> image, calculate deviations from operating limits, identify anomalies,
> determine the risk level and create an approval report."

## Orchestrator

### Step 1 --- Understand

Detect:

``` text
Complex engineering analysis
+
Document retrieval
+
Image analysis
+
Comparison
+
Calculation
+
Anomaly analysis
+
Artifact generation
+
Approval
```

### Step 2 --- Security

Validate:

-   user identity
-   project access
-   document permissions
-   classification

### Step 3 --- Plan

``` text
1. Identify P-102
2. Retrieve current inspection
3. OCR current report
4. Analyze equipment image
5. Retrieve applicable SOP
6. Retrieve 2024/2025 history
7. Extract measurements
8. Calculate deviations
9. Run anomaly analysis
10. Compare historical trend
11. Verify evidence
12. Determine risk
13. Generate approval report
14. Request human approval
```

### Step 4 --- Execute

Relevant tools/models run.

### Step 5 --- Verify

Check:

-   source evidence
-   calculations
-   consistency
-   document identity
-   output completeness

### Step 6 --- Deliver

Return:

-   structured answer
-   tables
-   relevant graph
-   evidence
-   generated report
-   approval request
-   audit entry

------------------------------------------------------------------------

# 18. Closing Remarks

The Sovereign AI Workbench is designed to transform organizational AI
from a simple question-answering interface into a controlled **AI
execution platform**.

Its central principle is:

``` text
UNDERSTAND
    ↓
RETRIEVE
    ↓
REASON
    ↓
EXECUTE
    ↓
VERIFY
    ↓
APPROVE
    ↓
DELIVER
```

The system combines:

-   sovereign local AI
-   enterprise knowledge
-   multimodal document understanding
-   permission-aware RAG
-   agentic orchestration
-   deterministic calculations
-   anomaly analysis
-   coding assistance
-   visualization
-   artifact generation
-   human approval
-   security
-   auditability

The platform is therefore intended to support the complete lifecycle of
an AI-assisted industrial task rather than only provide a conversational
answer.

## Final Value Proposition

> **A private, evidence-grounded, agentic AI workbench that converts
> confidential organizational knowledge into actionable, verified and
> auditable work---entirely within the organization's controlled
> environment.**

------------------------------------------------------------------------

# Appendix A --- Major System Components

  Component            Primary Role
  -------------------- ------------------------------------
  User Workbench       User interaction
  Authentication       Identity
  SSO/MFA              Secure login
  RBAC                 Access control
  DLP                  Data protection
  Orchestrator         Central decision/control layer
  Intent Classifier    Understand request type
  Planner              Decompose complex tasks
  Model Router         Select appropriate local model
  Tool Router          Select execution tools
  Qwen Models          Local language/reasoning
  Qwen Coder           Coding tasks
  Vision/OCR           Visual/document extraction
  BGE-M3               Embeddings
  Qdrant               Vector retrieval
  PostgreSQL           Structured application data
  Local Storage        Documents/artifacts
  Calculation Engine   Deterministic numerical operations
  Anomaly Engine       Detect abnormal patterns
  Coding Agent         Software engineering
  Sandbox              Isolated execution
  Verification         Validate results
  Approval Workflow    Human control
  Artifact Generator   Reports/documents
  Audit Trail          Traceability

------------------------------------------------------------------------

# Appendix B --- Query Capability Matrix

  -------------------------------------------------------------------------------
  Query                       RAG         Planner      Tool/Agent Output
  --------------- --------------- --------------- --------------- ---------------
  "Hi"                         No              No              No Text

  "What is             Usually No              No              No Text
  preventive                                                      
  maintenance?"                                                   

  "What does our              Yes      Usually No              No Text + Sources
  SOP say?"                                                       

  "Summarize                  Yes        No/Light              No Summary
  P-102 report"                                                   

  "Compare 2024               Yes             Yes        Analysis Comparison
  and 2025"                                                       

  "Calculate                Maybe              No     Calculation Number +
  deviation"                                                      explanation

  "Detect                   Maybe             Yes  Anomaly engine Analysis
  anomalies"                                                      

  "Plot trend"                Yes             Yes   Data analysis Chart +
                                                                  explanation

  "Create Excel               Yes             Yes   Artifact tool Chat + XLSX
  report"                                                         

  "Analyze image"  No/Chat scoped          No/Yes          Vision Analysis

  "Fix my code"                No             Yes    Coding agent Code + changes

  "Build a                     No             Yes    Coding agent Project files
  project"                                                        

  "Investigate                Yes             Yes  Multiple tools Investigation
  asset failure"                                                  

  "Create                     Yes             Yes        Document Chat +
  approval                                              generator artifact +
  report"                                                         approval
  -------------------------------------------------------------------------------

------------------------------------------------------------------------

# Appendix C --- Core Architecture Principle

The most important design principle is:

> **Do not send every query through every component.**

Instead:

``` text
Simple Query
→ Fast Path

Knowledge Query
→ Permission-aware RAG

Document Query
→ Document-scoped Retrieval

Analytical Query
→ Data/Calculation Tools

Anomaly Query
→ Anomaly Engine

Coding Query
→ Coding Agent

Complex Query
→ Planner → Multiple Capabilities → Verification

High-Risk Output
→ Human Approval
```

This keeps the system faster, more reliable, more secure and easier to
scale.
