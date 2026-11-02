# Universal BA Toolkit — All skills for IT Business Analysts & Product Owners.

[![Language: English](https://img.shields.io/badge/Language-English-blue.svg)](README.md)
[![Language: Vietnamese](https://img.shields.io/badge/Language-Vietnamese-red.svg)](README_VI.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Standard: Agent Skills](https://img.shields.io/badge/Standard-Agent%20Skills-orange.svg)](https://skills.sh)

> **Vietnamese Version:** [README_VI.md](README_VI.md)

**Universal BA Toolkit ** is an open-source, production-ready specification framework composed of **56 specialized Agent Skills**, **19 strict requirements engineering rules**, and **47 standardized deliverables templates**. It equips coding agents (Claude Code, Antigravity, Codex, Cursor, Windsurf) and human analysts with end-to-end capabilities across the entire software specification lifecycle.

Transform raw ideas and ambiguous business concepts into IEEE 830 technical specifications, editorial-grade architecture diagrams, interactive grayscale wireframes, INVEST-compliant user backlogs, Gherkin BDD test scenarios, traceable test matrices, and rigorous Change Request impact analyses.

---

## The Problem: Bridging the Gap Between Requirements and Code

Modern coding agents excel at writing implementation code but frequently fail when business requirements are incomplete, ambiguous, or poorly structured.

```
Vague Prompts ──> Hallucinated Assumptions ──> Code Defects & Rework ──> Failed Sprint
                                       VS
Raw Concepts  ──[ Universal BA Toolkit ]──> Verified Specs & Architecture Models ──> Deterministic Code
```

1. **Deterministic Requirements Engineering:** 19 codified rules systematically identify and eliminate subjective terminology (*"fast"*, *"secure"*, *"user-friendly"*, *"real-time"*), replacing them with quantifiable SLA/SLO metrics and standardized identifiers (`FR-`, `BR-`, `ERR-`, `UC-`, `US-`).
2. **Editorial-Grade Visual Modeling:** Integrates **Diagram Design (v2.6)** to compile Mermaid definitions into standalone, interactive HTML vector diagrams without requiring external rendering engines or cloud dependencies.
3. **End-to-End Traceability:** Enforces strict bi-directional traceability across all project stages: `Vision / PRD` $\rightarrow$ `SRS` $\rightarrow$ `Business Rules` $\rightarrow$ `User Stories` $\rightarrow$ `Acceptance Criteria` $\rightarrow$ `Traceable Test Cases`.
4. **Single-Page Stakeholder Handoff (`/preview`):** Generates unified, standalone documentation portals that developers, QA engineers, and business stakeholders can review and approve without specialized tooling.

---

## Repository Structure

```
Universal_BA_Toolkit/
├── skills/                     # 56 Skills conforming to the Agent Skills open standard
│   ├── brainstorm/             # Socratic elicitation for unstructured business ideas
│   ├── srs/                    # IEEE 830 / ISO 29148 software requirements specifications
│   ├── sequence/               # Distributed interaction & message sequence modeling
│   ├── render-diagrams/        # Automated compilation of Mermaid to standalone HTML/SVG
│   ├── diagram-design/         # 45-type editorial diagram design engine
│   ├── erd/                    # Relational data modeling & entity relationships
│   ├── wireframe-html/         # Standalone, zero-CDN grayscale HTML wireframes
│   ├── userstory/              # INVEST backlog slicing & Connextra story formulation
│   ├── ac/                     # Gherkin BDD scenarios (Happy, Exception, Boundary)
│   ├── test-cases/             # 8-column test suites mapped to Error Matrix & RTM
│   ├── preview/                # Single-page documentation review portal
│   ├── cr/                     # 4-dimension Change Request impact analysis
│   └── ... (56 total skills)
├── rules/                      # 19 Non-negotiable requirements engineering rules
│   ├── 01-fr-naming-convention.md          # Functional Requirement identifier schema
│   ├── 02-br-naming-convention.md          # Business Rule logic (WHEN / THEN / UNLESS)
│   ├── 03-err-naming-convention.md         # RFC 7807 Error code schema & HTTP status mapping
│   ├── 04-nfr-standards.md                 # ISO/IEC 25010 quantifiable quality benchmarks
│   ├── 05-srs-ieee-830.md                  # IEEE 830 5-section master SRS outline
│   ├── 06-cockburn-use-case.md             # Alistair Cockburn 12-section use case standard
│   ├── 07-invest-user-story.md             # INVEST criteria & SPIDR story splitting
│   ├── 08-gherkin-acceptance-criteria.md   # Gherkin BDD scenario structure & Scenario Outlines
│   ├── 09-data-dictionary-standard.md      # 10-column data dictionary & PII classification
│   ├── 10-api-contract-standards.md        # RESTful API guidelines & standard JSON envelope
│   ├── 11-error-matrix-convention.md       # 7-column consolidated system error matrix
│   ├── 12-state-transition-rules.md        # Finite State Machine rules & guard logic
│   ├── 13-wireframe-html-guidelines.md     # Grayscale, single-file, zero-CDN wireframe standards
│   ├── 14-test-case-traceability.md        # Bi-directional Requirements Traceability Matrix (RTM)
│   ├── 15-change-request-impact-matrix.md  # 4-dimension blast-radius impact framework
│   ├── 16-ambiguity-detection-rules.md     # Subjective phrase blacklist & deterministic rewrite rules
│   ├── 17-actor-role-definition.md         # 4-tier actor taxonomy & RBAC permission matrix
│   ├── 18-knowledge-graph-metadata.md      # YAML frontmatter schema for Graph AI indexing
│   └── 19-document-versioning-rules.md     # Documentation Semantic Versioning (SemVer)
├── _templates/                 # 47 Production-ready standardized deliverables
│   ├── 01-prd.md                           # Product Requirements Document template
│   ├── 08-srs.md                           # Master SRS template (IEEE 830)
│   ├── 15-sequence-diagram.md              # Interaction sequence diagram template
│   ├── 17-activity-swimlane.puml           # PlantUML swimlane activity diagram
│   ├── 18-bpmn-process.bpmn                # BPMN 2.0 valid XML process template
│   ├── 20-erd-mermaid.md                   # Entity Relationship Diagram template
│   ├── 21-erd-d2.d2                        # D2 declarative architecture model
│   ├── 24-dbdiagram.dbml                   # Database Markup Language schema
│   ├── 26-usecase-cockburn.md              # Cockburn structured use case template
│   ├── 27-userstory.md                     # INVEST user story backlog template
│   ├── 28-acceptance-criteria.md           # Gherkin BDD acceptance criteria template
│   ├── 31-wireframe-html.html              # Standalone interactive grayscale wireframe
│   ├── 40-api-test-bruno.bru               # Bruno API test collection template
│   ├── 43-test-cases.md                    # 8-column test case suite template
│   ├── 44-playwright-gen.spec.ts           # Playwright TypeScript E2E test suite
│   ├── 45-gap-analysis.md                  # 6-dimension business logic gap analysis report
│   ├── 46-doc-drift.md                     # Specification vs codebase drift analysis report
│   ├── 47-change-request.md                # 4-dimension Change Request evaluation report
│   ├── 48-meeting-minutes.md               # Meeting minutes & Decision log template
│   └── ... (47 templates intact)
└── scripts/
    └── render_diagrams.py      # Automated CLI tool to extract and render diagrams
```

---

## The 56 Skills Across 9 SDLC Phases

| Phase | Count | `/slash` Command | Primary Deliverable & Scope |
| :--- | :---: | :--- | :--- |
| **1. Product Planning** | **3** | `/prd`<br>`/roadmap`<br>`/discover` | Overarching Product Requirements Document, milestone roadmap schedules, and Socratic discovery interviews. |
| **2. Requirements & Elicitation** | **7** | `/brainstorm`<br>`/urd`<br>`/brd`<br>`/prd-epic`<br>`/srs`<br>`/reverse-doc`<br>`/code-to-srs` | Unstructured idea elicitation, URD/BRD drafting, epic decomposition, IEEE 830 technical specifications, and reverse-engineering legacy codebases into documentation. |
| **3. Business & Data Modeling** | **12** | `/sequence`<br>`/render-diagrams`<br>`/diagram-design`<br>`/activity`<br>`/activity-swimlane`<br>`/bpmn`<br>`/state`<br>`/erd`<br>`/d2-erd`<br>`/d2-activity`<br>`/dbdiagram`<br>`/usecase-diagram` | Interaction sequence models, automated vector HTML/SVG rendering, process activity flows, swimlane matrices, BPMN 2.0 XML, FSM state machines, ERD models, and DBML schemas. |
| **4. Use Cases & User Stories** | **3** | `/usecase`<br>`/userstory`<br>`/ac` | Cockburn structured use cases, INVEST-compliant story backlog slicing, and Gherkin BDD acceptance criteria. |
| **5. UI Prototyping & Flows** | **6** | `/user-flow`<br>`/wireframe-ascii`<br>`/wireframe-html`<br>`/prototype-html`<br>`/prototype-next`<br>`/figma` | Navigation journey flows, fast ASCII terminal wireframes, standalone offline HTML wireframes, interactive prototypes, Next.js component blueprints, and Figma tokens. |
| **6. API Integration** | **7** | `/api-assess`<br>`/api-doc`<br>`/api-design`<br>`/api-map`<br>`/api-checklist`<br>`/api-test`<br>`/api-readiness` | Third-party API feasibility audits, RESTful documentation, endpoint/webhook contract design, data dictionary mapping, Bruno test suites, and production readiness checks. |
| **7. Quality Assurance (QA/QC)** | **3** | `/test-checklist`<br>`/test-cases`<br>`/playwright-gen` | QA testing conditions checklists, end-to-end test case matrices mapped to Error Matrix & AC, and automated Playwright test scripts. |
| **8. Governance & Change Control** | **6** | `/gap`<br>`/doc-drift`<br>`/ask`<br>`/cr`<br>`/dashboard`<br>`/kg` | Business logic gap analysis, specification vs code drift detection, project knowledge queries, Change Request impact matrices, project health dashboards, and Knowledge Graph nodes. |
| **9. Handoff & Operations** | **9** | `/jira`<br>`/confluence`<br>`/export`<br>`/preview`<br>`/reverse-preview`<br>`/userguide`<br>`/meet`<br>`/update-overview`<br>`/delegate` | Jira CSV backlog exports, Confluence wiki exports, multi-format deliverable packaging, single-page stakeholder review portals, SOP/user operation guides, and meeting minutes. |

---

## The 19 Non-Negotiable BA Rules

All generated specifications must strictly adhere to the 19 rules defined in `rules/`:

1. **`01-fr-naming-convention.md`**: Hierarchical code `FR-[MODULE]-[FEATURE]-[SEQ]` with required priority (P0/P1/P2), input parameters, processing logic, and output schemas.
2. **`02-br-naming-convention.md`**: Business rule code `BR-[DOMAIN]-[SEQ]` structured in `WHEN` $\rightarrow$ `THEN` $\rightarrow$ `UNLESS` formal logic.
3. **`03-err-naming-convention.md`**: RFC 7807 Problem Details error code `ERR-[MODULE]-[HTTP_STATUS]-[SEQ]` with end-user messaging, technical dev details, and correlation IDs.
4. **`04-nfr-standards.md`**: ISO/IEC 25010 categorization with quantifiable SLA/SLO thresholds (P95 response time, TLS 1.3 / Argon2id encryption, 99.9% uptime, WCAG 2.1 AA accessibility).
5. **`05-srs-ieee-830.md`**: Standard 5-section Software Requirements Specification outline conforming to IEEE 830 and ISO/IEC/IEEE 29148.
6. **`06-cockburn-use-case.md`**: Structured Cockburn format with 3 goal levels (Summary, User-Goal, Subfunction), Pre/Post-conditions, Main Success Scenario, and Extensions.
7. **`07-invest-user-story.md`**: Connextra format (`As a... I want... So that...`) validated against all 6 INVEST criteria and decomposed via the SPIDR method.
8. **`08-gherkin-acceptance-criteria.md`**: Gherkin BDD syntax (`Given... When... Then...`) requiring Happy Path, Negative, and Boundary Scenarios.
9. **`09-data-dictionary-standard.md`**: 10-column data dictionary schema table with cross-platform type mapping (PostgreSQL, MySQL, TypeScript, JSON Schema) and PII masking rules.
10. **`10-api-contract-standards.md`**: RESTful plural resources, idempotency keys, and standard JSON response envelope (`success`, `data`, `error`, `meta`, `timestamp`).
11. **`11-error-matrix-convention.md`**: 7-column consolidated error matrix connecting error codes, triggers, client UX responses, recovery actions, and 4-tier severity.
12. **`12-state-transition-rules.md`**: Finite State Machine architecture (Initial, Terminal, Trigger, Guard) with transition tables and Mermaid `stateDiagram-v2`.
13. **`13-wireframe-html-guidelines.md`**: Self-contained single-file HTML wireframes with zero external CDN dependencies, grayscale styling, and 4 UI state representations.
14. **`14-test-case-traceability.md`**: Bi-directional Requirements Traceability Matrix (RTM) guaranteeing coverage from `BRD` $\rightarrow$ `FR` $\rightarrow$ `US` $\rightarrow$ `TC`.
15. **`15-change-request-impact-matrix.md`**: 4-dimension impact analysis (Scope, Architecture/Data, UI/UX, Testing/Effort) with CCB approval matrices.
16. **`16-ambiguity-detection-rules.md`**: Ambiguity filter strictly banning subjective qualitative terms (*"fast"*, *"user-friendly"*, *"real-time"*, *"secure"*) in favor of verifiable technical metrics.
17. **`17-actor-role-definition.md`**: 4-tier actor taxonomy (Primary, Secondary, Daemon, Off-stage) and comprehensive RBAC permission matrix.
18. **`18-knowledge-graph-metadata.md`**: Mandatory YAML frontmatter schema for cross-referencing and graph visualization.
19. **`19-document-versioning-rules.md`**: Semantic Versioning (`MAJOR.MINOR.PATCH`) and standard revision history table.

---

## 47 Production-Ready Templates

The template directory `_templates/` maintains its exact, standardized numbering and structure:

- **01–07: Planning & Strategy**: `01-prd.md`, `02-roadmap.md`, `03-discover.md`, `04-brainstorm.md`, `05-urd.md`, `06-brd.md`, `07-prd-epic.md`.
- **08–14: Specifications & Logic**: `08-srs.md`, `09-srs-fr.md`, `10-srs-nfr.md`, `11-business-rules.md`, `12-error-matrix.md`, `13-reverse-doc.md`, `14-code-to-srs.md`.
- **15–25: Modeling & Diagrams**: `15-sequence-diagram.md`, `16-activity-diagram.md`, `17-activity-swimlane.puml`, `18-bpmn-process.bpmn`, `19-state-diagram.md`, `20-erd-mermaid.md`, `21-erd-d2.d2`, `22-activity-d2.d2`, `24-dbdiagram.dbml`, `25-usecase-diagram.md`.
- **26–28: Use Cases & Agile Backlog**: `26-usecase-cockburn.md`, `27-userstory.md`, `28-acceptance-criteria.md`.
- **29–34: UI & Wireframes**: `29-user-flow.md`, `30-wireframe-ascii.md`, `31-wireframe-html.html`, `32-prototype-html.html`, `33-prototype-next.md`, `34-figma-spec.md`.
- **35–41: API Engineering**: `35-api-assess.md`, `36-api-doc.md`, `37-api-design.md`, `38-api-map.md`, `39-api-checklist.md`, `40-api-test-bruno.bru`, `41-api-readiness.md`.
- **42–44: Quality Assurance**: `42-test-checklist.md`, `43-test-cases.md`, `44-playwright-gen.spec.ts`.
- **45–48: Governance & Handover**: `45-gap-analysis.md`, `46-doc-drift.md`, `47-change-request.md`, `48-meeting-minutes.md`.

---

## Automated Visual Diagrams with Diagram Design

The toolkit includes the automated rendering script `scripts/render_diagrams.py` powered by the `diagram-design` (v2.6) design system:
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

## A Day in the Life of a Technical Business Analyst

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

## Quickstart & Installation

Universal BA Toolkit is completely file-based and adheres to the **Agent Skills standard**.

### Option A: Install for Claude Code
```bash
mkdir -p ~/.claude/skills
ln -s /path/to/universal-ba-toolkit/skills/* ~/.claude/skills/
```

### Option B: Install for Hermes Agent / Antigravity / Codex
```bash
mkdir -p ~/.hermes/skills
ln -s /path/to/universal-ba-toolkit/skills/* ~/.hermes/skills/
```

### Option C: In-Workspace Usage (Cursor, Windsurf, Antigravity)
Simply clone or copy this repository into your workspace root (or subfolder). Your agent will automatically discover the `skills/` and `rules/` instructions whenever you prompt it or execute `/slash` commands.

---

## Contributing & Community

Contributions are warmly welcome:
- Submit domain templates (Fintech, E-commerce, Healthcare, Logistics, ERP).
- Propose new quality verification rules and naming conventions.
- Report issues and refine agent prompts.

Licensed under the **[MIT License](LICENSE)**.
