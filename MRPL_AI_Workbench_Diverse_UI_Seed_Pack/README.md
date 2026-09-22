# MANGALORE REFINERY AND PETROCHEMICALS LIMITED — Sovereign AI Workbench UI Seed Pack

Final diverse hands-on chatbot seed pack.

## Live graphs
All graph responses are represented as structured JSON chart objects with `render_mode: "live"`.
The UI should render these with its chart component. No PNG graph artifacts are supplied.

Supported examples include:
- CDU-4 monthly production bar chart
- Open P2 work-order bar chart
- P-102 pressure trend
- P-102 condition trend

## Seed files
- `seed_questions_and_answers.json` — primary UI fixture.
- `seed_questions.jsonl` — one record per line.
- `artifacts/` — requested DOCX, PDF, XLSX, CSV, PPTX and SVG artifacts.
- `README.md` — integration notes.

## UI mapping
- `id` → task/run ID
- `title` → task title
- `execution_size` → Small / Medium / Large
- `complexity` → route label
- `question` → user message
- `answer.summary` → primary response
- `answer.details` → detailed response
- `execution_steps` → execution timeline
- `graph` / `graph_2` → live chart specification
- `sources` → evidence chips
- `artifacts` → artifact cards

## Artifact rule
Only create the artifact explicitly requested or necessary for the user request. Do not create a DOCX/PDF/PPTX bundle when the user asked for one output.

## Coverage
The ten seeded questions cover refinery knowledge, security/classification, production analytics, maintenance work orders, SOP/RAG, HSE permit/isolation, procurement, MOC, engineering relationships, multimodal/complex analysis and management reporting.

## Provenance and limitations
Do not invent facts, limits, supplier scores, approvals, dimensions or missing values. If a source does not specify something, state that it is not specified. Engineering relationship drawings are illustrative and not fabrication/CAD documentation. High-risk engineering decisions require authorized human review. Prototype security telemetry must not be presented as a real security guarantee.
