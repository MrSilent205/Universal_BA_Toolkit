# BA-Kit Open — 56 AI Skills for IT Business Analysts & Product Owners

[![English](https://img.shields.io/badge/Language-English-blue.svg)](README.md)
[![Tiếng Việt](https://img.shields.io/badge/Ng%C3%B4n%20ng%E1%BB%AF-Ti%E1%BA%BFng%20Vi%E1%BB%87t-red.svg)](README_VI.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Agent Skills Compatible](https://img.shields.io/badge/Standard-Agent%20Skills-orange.svg)](https://skills.sh)

> 🇻🇳 **Đọc bản tiếng Việt tại [README_VI.md](README_VI.md)**

**BA-Kit Open** is an open-source suite of **56 specialized Agent Skills**, **19 strict requirements engineering rules**, and **47 production-ready templates**. It transforms any AI Coding Agent (**Claude Code, Antigravity, OpenAI Codex, Hermes Agent, Cursor, Windsurf**) into an elite Senior IT Business Analyst and Technical Product Owner.

Automate the entire software specification lifecycle: from vague brainstorms and discovery interviews to IEEE 830 technical specifications, editorial-grade architecture diagrams, interactive single-file HTML wireframes, INVEST-compliant backlogs, Gherkin acceptance criteria, traceable test suites, and seamless Change Request impact analysis.

---

## ⚡ The Problem: Why Coding Agents Need BA Skills

AI coding agents excel at writing implementation code—but they fail when requirements are vague, inconsistent, or undocumented.

```
Vague Prompt ──> Hallucinated Assumptions ──> Bugs & Rework ──> Failed Sprint
                                   VS
Raw Idea ──[ BA-Kit Open ]──> Verified Specs + Visual Diagrams ──> Flawless Code
```

1. **No More Ambiguity:** 19 rules automatically detect and eliminate qualitative words (*"fast"*, *"secure"*, *"user-friendly"*, *"real-time"*), replacing them with quantifiable metrics and codified identifiers (`FR-`, `BR-`, `ERR-`, `UC-`, `US-`).
2. **Beyond Plain Text Diagrams:** Plain Mermaid blocks in markdown are tedious for non-technical stakeholders to render. BA-Kit integrates **Diagram Design (v2.6)** to compile Mermaid into **standalone, editorial HTML + vector SVG diagrams** right out of the box with zero runtime dependencies.
3. **End-to-End Traceability:** 100% alignment across deliverables: `Idea` $\rightarrow$ `PRD` $\rightarrow$ `SRS` $\rightarrow$ `Flows` $\rightarrow$ `User Stories` $\rightarrow$ `AC` $\rightarrow$ `Test Cases`.
4. **One-Click Stakeholder Handoff (`/preview`):** Generate single-page interactive documentation portals that clients and engineers can browse, review, and sign off in seconds.

---

## 📁 Repository Structure

```
ba-kit-open/
├── skills/                     # 56 AI Skills conforming to the Agent Skills standard
│   ├── brainstorm/             # Socratic interviewing for vague requirements
│   ├── srs/                    # IEEE 830 / ISO 29148 technical specification generator
│   ├── sequence/               # Interaction & message sequence modeling
│   ├── render-diagrams/        # Compile Mermaid into editorial HTML & vector SVG
│   ├── diagram-design/         # Complete 45-type editorial diagram design system
│   ├── erd/                    # Entity relationship modeling
│   ├── wireframe-html/         # Standalone interactive HTML wireframes
│   ├── userstory/              # INVEST backlog splitting
│   ├── ac/                     # Gherkin Acceptance Criteria (Given/When/Then)
│   ├── test-cases/             # Traceable test suites matching Error Matrix & AC
│   ├── preview/                # Unified HTML documentation viewer with live diagrams
│   ├── cr/                     # Change request & blast-radius impact analysis
│   └── ... (56 total skills)
├── rules/                      # 19 Non-negotiable BA & Specification Rules
│   ├── 01-fr-naming-convention.md          # Functional Requirement identifier convention
│   ├── 02-br-naming-convention.md          # Business Rule structure (WHEN/THEN/UNLESS)
│   ├── 03-err-naming-convention.md         # System error codes (HTTP 4xx/5xx mapping)
│   ├── 04-nfr-standards.md                 # ISO/IEC 25010 Non-Functional Requirements
│   ├── 05-srs-ieee-830.md                  # IEEE 830 4-part SRS master outline
│   ├── 06-cockburn-use-case.md             # Alistair Cockburn use case standard
│   ├── 07-invest-user-story.md             # INVEST criteria & Connextra format
│   ├── 08-gherkin-acceptance-criteria.md   # Gherkin BDD scenarios (3 required paths)
│   ├── 09-data-dictionary-standard.md      # Data dictionary schema specifications
│   ├── 10-api-contract-standards.md        # RESTful API design & standard response envelope
│   ├── 11-error-matrix-convention.md       # 7-column consolidated error matrix
│   ├── 12-state-transition-rules.md        # Finite State Machine rules & guard logic
│   ├── 13-wireframe-html-guidelines.md     # Single-file HTML wireframe (Zero CDN)
│   ├── 14-test-case-traceability.md        # Requirement Traceability Matrix (RTM)
│   ├── 15-change-request-impact-matrix.md  # 4-dimension CR impact analysis
│   ├── 16-ambiguity-detection-rules.md     # Ambiguity filter & banned subjective terms
│   ├── 17-actor-role-definition.md         # Actor classification & RBAC matrix
│   ├── 18-knowledge-graph-metadata.md      # YAML frontmatter schema for Knowledge Graph
│   └── 19-document-versioning-rules.md     # Semantic Versioning & revision history
├── _templates/                 # 47 Production-ready standardized deliverables
│   ├── 01-prd.md                           # Product Requirements Document template
│   ├── 08-srs.md                           # SRS Master template
│   ├── 15-sequence-diagram.md              # Sequence diagram template
│   ├── 20-erd-mermaid.md                   # Entity relationship diagram template
│   ├── 26-usecase-cockburn.md              # Cockburn use case template
│   ├── 27-userstory.md                     # User Story backlog template
│   ├── 28-acceptance-criteria.md           # Gherkin acceptance criteria template
│   ├── 31-wireframe-html.html              # Standalone low-fi HTML wireframe template
│   ├── 43-test-cases.md                    # Test case suite template
│   ├── 47-change-request.md                # Change Request evaluation template
│   └── ... (47 templates intact)
└── scripts/
    └── render_diagrams.py      # Automated CLI tool to scan & render Markdown Mermaid
```

---

## 🚀 The 56 Skills Across 9 SDLC Phases

| Phase | Count | `/slash` Command | Core Purpose & Deliverable |
| :--- | :---: | :--- | :--- |
| **1. Product Planning** | **3** | `/prd`<br>`/roadmap`<br>`/discover` | Draft overarching Product Requirements Document, milestone roadmap schedules, and Socratic discovery interviews. |
| **2. Requirements & Elicitation** | **7** | `/brainstorm`<br>`/urd`<br>`/brd`<br>`/prd-epic`<br>`/srs`<br>`/reverse-doc`<br>`/code-to-srs` | Elicit vague requirements, draft URD/BRD, decompose epics, generate IEEE 830 SRS specs, and reverse-engineer legacy source code into formal documentation. |
| **3. Business & Data Diagrams** | **12** | `/sequence`<br>`/render-diagrams`<br>`/diagram-design`<br>`/activity`<br>`/activity-swimlane`<br>`/bpmn`<br>`/state`<br>`/erd`<br>`/d2-erd`<br>`/d2-activity`<br>`/dbdiagram`<br>`/usecase-diagram` | Interaction sequences, automated editorial HTML/SVG rendering, process activity flows, swimlane matrices, BPMN 2.0 XML, FSM state machines, ERD models, and DBML schemas. |
| **4. Use Cases & User Stories** | **3** | `/usecase`<br>`/userstory`<br>`/ac` | Cockburn-style structured use cases, INVEST-compliant story backlog slicing, and Gherkin BDD acceptance criteria. |
| **5. UI Prototyping & Flows** | **6** | `/user-flow`<br>`/wireframe-ascii`<br>`/wireframe-html`<br>`/prototype-html`<br>`/prototype-next`<br>`/figma` | Navigation journey flows, fast ASCII terminal wireframes, standalone offline HTML wireframes, interactive prototypes, Next.js component blueprints, and Figma tokens. |
| **6. API Integration** | **7** | `/api-assess`<br>`/api-doc`<br>`/api-design`<br>`/api-map`<br>`/api-checklist`<br>`/api-test`<br>`/api-readiness` | Third-party API feasibility audits, RESTful documentation, endpoint/webhook contract design, data dictionary mapping, Bruno test suites, and production readiness checks. |
| **7. Quality Assurance (QA/QC)** | **3** | `/test-checklist`<br>`/test-cases`<br>`/playwright-gen` | QA testing conditions checklists, end-to-end test case matrices mapped to Error Matrix & AC, and automated Playwright test scripts. |
| **8. Governance & Change Control** | **6** | `/gap`<br>`/doc-drift`<br>`/ask`<br>`/cr`<br>`/dashboard`<br>`/kg` | Business logic gap analysis, specification vs code drift detection, project knowledge queries, Change Request impact matrices, project health dashboards, and Knowledge Graph nodes. |
| **9. Handoff & Operations** | **9** | `/jira`<br>`/confluence`<br>`/export`<br>`/preview`<br>`/reverse-preview`<br>`/userguide`<br>`/meet`<br>`/update-overview`<br>`/delegate` | Jira CSV backlog exports, Confluence wiki exports, multi-format deliverable packaging, single-page stakeholder review portals, SOP/user operation guides, and meeting minutes. |

---

## 📐 The 19 Non-Negotiable BA Rules

All generated documents must strictly adhere to the 19 rules in `rules/`:

1. **`01-fr-naming-convention.md`**: Hierarchical code `FR-[MODULE]-[FEATURE]-[SEQ]` with required priority (P0/P1/P2), input, processing logic, output.
2. **`02-br-naming-convention.md`**: Business rule code `BR-[DOMAIN]-[SEQ]` structured in `WHEN` $\rightarrow$ `THEN` $\rightarrow$ `UNLESS` formal logic.
3. **`03-err-naming-convention.md`**: Error code `ERR-[MODULE]-[HTTP_STATUS]-[SEQ]` mapping HTTP response status codes to end-user and dev log messages.
4. **`04-nfr-standards.md`**: ISO/IEC 25010 categorization (P95 response time, TLS 1.3 / Argon2id encryption, 99.9% uptime SLA, WCAG 2.1 AA accessibility).
5. **`05-srs-ieee-830.md`**: Standard 4-section Software Requirements Specification outline conforming to IEEE 830 / ISO 29148.
6. **`06-cockburn-use-case.md`**: Structured Cockburn format (Goal Level, Primary Actor, Pre/Post-conditions, Main Success Scenario, Extensions).
7. **`07-invest-user-story.md`**: Connextra format (`As a... I want... So that...`) evaluated against 6 INVEST criteria.
8. **`08-gherkin-acceptance-criteria.md`**: Gherkin BDD syntax (`Given... When... Then...`) with mandatory Happy, Negative, and Boundary scenarios.
9. **`09-data-dictionary-standard.md`**: Data dictionary schema table (Data Type, Length, Nullable, Constraints, Description).
10. **`10-api-contract-standards.md`**: RESTful plural resources, HTTP verb idempotency, standard JSON response envelope (`success`, `data`, `error`, `meta`, `timestamp`).
11. **`11-error-matrix-convention.md`**: 7-column consolidated error matrix connecting error codes, trigger conditions, i18n keys, and next actions.
12. **`12-state-transition-rules.md`**: Finite State Machine architecture (Initial, Terminal, Trigger, Guard) with Mermaid `stateDiagram-v2` and transition table.
13. **`13-wireframe-html-guidelines.md`**: Self-contained single-file HTML wireframes with zero external CDN dependencies and grayscale contrast palette.
14. **`14-test-case-traceability.md`**: Requirement Traceability Matrix (RTM) guaranteeing 100% coverage from `FR` $\rightarrow$ `US` $\rightarrow$ `AC` $\rightarrow$ `TC`.
15. **`15-change-request-impact-matrix.md`**: 4-dimension impact analysis (Documentation, Architecture, QA, Schedule) with `CR-[MODULE]-[SEQ]`.
16. **`16-ambiguity-detection-rules.md`**: Ambiguity filter strictly banning subjective qualitative terms (*"fast"*, *"user-friendly"*, *"real-time"*, *"secure"*) in favor of verifiable technical metrics.
17. **`17-actor-role-definition.md`**: Actor classification (Primary, Secondary, System) and comprehensive RBAC permission matrix.
18. **`18-knowledge-graph-metadata.md`**: Mandatory YAML frontmatter schema for cross-referencing and graph visualization.
19. **`19-document-versioning-rules.md`**: Semantic Versioning (`MAJOR.MINOR.PATCH`) and standard revision history table.

---

## 📋 47 Production-Ready Templates

The template directory `_templates/` maintains its exact, standardized numbering and structure:

- **01–07: Planning & Discovery**: `01-prd.md`, `02-roadmap.md`, `03-discover.md`, `04-brainstorm.md`, `05-urd.md`, `06-brd.md`, `07-prd-epic.md`.
- **08–14: Specifications & Rules**: `08-srs.md`, `09-srs-fr.md`, `10-srs-nfr.md`, `11-business-rules.md`, `12-error-matrix.md`, `13-reverse-doc.md`, `14-code-to-srs.md`.
- **15–25: Modeling & Diagrams**: `15-sequence-diagram.md`, `16-activity-diagram.md`, `17-activity-swimlane.puml`, `18-bpmn-process.bpmn`, `19-state-diagram.md`, `20-erd-mermaid.md`, `21-erd-d2.d2`, `22-activity-d2.d2`, `24-dbdiagram.dbml`, `25-usecase-diagram.md`.
- **26–28: Use Cases & Stories**: `26-usecase-cockburn.md`, `27-userstory.md`, `28-acceptance-criteria.md`.
- **29–34: UI & Wireframes**: `29-user-flow.md`, `30-wireframe-ascii.md`, `31-wireframe-html.html`, `32-prototype-html.html`, `33-prototype-next.md`, `34-figma-spec.md`.
- **35–41: API Engineering**: `35-api-assess.md`, `36-api-doc.md`, `37-api-design.md`, `38-api-map.md`, `39-api-checklist.md`, `40-api-test-bruno.bru`, `41-api-readiness.md`.
- **42–44: Quality Assurance**: `42-test-checklist.md`, `43-test-cases.md`, `44-playwright-gen.spec.ts`.
- **45–48: Governance & Handover**: `45-gap-analysis.md`, `46-doc-drift.md`, `47-change-request.md`, `48-meeting-minutes.md`.

---

## 🎨 Automated Visual Diagrams with Diagram Design

BA-Kit includes the automated rendering script `scripts/render_diagrams.py` powered by the `diagram-design` (v2.6) design system:
- **Automatic AST Extraction:** Parses Mermaid blocks (`sequenceDiagram`, `stateDiagram-v2`, `flowchart`, `erDiagram`) directly from markdown files.
- **Multi-Format Output:**
  - **Standalone `.html` files**: Fully responsive, double-clickable in any browser without Node.js or browser extensions.
  - **Pure `.svg` vector files**: Cleanly scoped for Figma, presentation decks, or printed documents.
  - **Centralized `diagrams/index.html` Gallery**: Instant visual overview for engineering teams and stakeholders.

```bash
# Scan and render a single markdown file:
python scripts/render_diagrams.py docs/{feature}/srs/flows.md

# Scan and render all documentation in a feature folder:
python scripts/render_diagrams.py docs/{feature}/
```

---

## 💡 A Day in the Life of an AI Business Analyst

Here is how you build a verified, production-grade feature specification in 1 day:

```
09:00  /brainstorm      Elicit requirements and define project boundaries
09:40  /srs             Draft IEEE 830 specification (FR, BR, ERR, NFR)
10:30  /sequence + /erd Model interaction sequences and entity relationships
10:45  /render-diagrams Compile diagrams into editorial HTML & vector SVGs
11:00  /wireframe-html  Generate clickable, standalone HTML prototypes
14:00  /userstory + /ac Slice INVEST user stories with Gherkin scenarios
16:00  /test-cases      Generate comprehensive test suites mapped to Error Matrix
16:45  /preview         Assemble the single-page stakeholder review bundle
Day+1  /cr              Process scope shift, assess blast radius, update docs
```

---

## 📦 Quickstart & Installation

BA-Kit Open is completely file-based and adheres to the **Agent Skills standard**.

### Option A: Install for Claude Code
```bash
mkdir -p ~/.claude/skills
ln -s /path/to/ba-kit-open/skills/* ~/.claude/skills/
```

### Option B: Install for Antigravity / Hermes Agent / Codex
```bash
mkdir -p ~/.hermes/skills
ln -s /path/to/ba-kit-open/skills/* ~/.hermes/skills/
```

### Option C: In-Workspace Usage (Cursor, Windsurf, Antigravity)
Simply clone or copy this repository into your workspace root (or subfolder). Your agent will automatically discover the `skills/` and `rules/` instructions whenever you prompt it or execute `/slash` commands.

---

## 🤝 Contributing & Community

Contributions are warmly welcome! Whether you are an experienced IT BA, a Technical Product Owner, or an AI agent engineer:
- Submit domain templates (Fintech, E-commerce, Healthcare, Logistics).
- Propose new quality verification rules and naming conventions.
- Report issues and refine agent prompts.

Licensed under the **[MIT License](LICENSE)**.
