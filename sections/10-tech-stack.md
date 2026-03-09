# ZTech Incorporation — Recommended Tech Stack

## Overview

ZTech's technology stack is organized by service line, with Paperclip as the central coordination layer across all operations. Each service line uses specialized tools and frameworks suited to its domain, while internal operations run on a unified stack built around Paperclip's control plane.

---

## 1. AI Automation Stack

### Core AI/ML

| Category | Technology | Purpose |
|---|---|---|
| LLM Providers | OpenAI GPT-4o/o3, Anthropic Claude Opus/Sonnet | Conversational AI, content generation, code generation, reasoning |
| AI Orchestration | LangChain, LangGraph | Agent workflows, chain-of-thought pipelines, tool use |
| ML Frameworks | PyTorch, scikit-learn | Custom model training for predictive analytics |
| Vector Databases | Pinecone, Weaviate, ChromaDB | RAG (retrieval-augmented generation), semantic search, knowledge bases |
| Embeddings | OpenAI Embeddings, Cohere Embed | Document embedding for vector search and similarity |

### Automation & Integration

| Category | Technology | Purpose |
|---|---|---|
| Workflow Engine | n8n, Temporal | Business process automation, event-driven workflows |
| API Integration | Custom REST/GraphQL connectors | CRM, ERP, accounting system integration |
| Data Pipeline | Apache Airflow, dbt | Data ingestion, transformation, scheduling |
| Messaging | Redis Streams, RabbitMQ | Event queues, async processing |

### Development

| Category | Technology | Purpose |
|---|---|---|
| Language | Python 3.12+ | Primary language for AI/ML development |
| API Framework | FastAPI | High-performance REST APIs for AI services |
| Testing | pytest, Hypothesis | Unit testing, property-based testing |
| Containerization | Docker, Docker Compose | Local development and deployment |

### Monitoring & Observability

| Category | Technology | Purpose |
|---|---|---|
| LLM Observability | LangSmith, Helicone | Token usage tracking, prompt debugging, cost monitoring |
| Application Monitoring | Sentry | Error tracking, performance monitoring |
| Logging | Structured JSON logs | Centralized log aggregation |

---

## 2. Blockchain Development Stack

### Smart Contract Development

| Category | Technology | Purpose |
|---|---|---|
| Languages | Solidity (EVM), Rust (Solana) | Smart contract programming |
| Development Framework | Hardhat, Foundry | Compilation, testing, deployment, scripting |
| Testing | Hardhat/Foundry test suites, Echidna | Unit tests, fuzz testing, invariant testing |
| Static Analysis | Slither, Mythril | Automated vulnerability detection |
| Formal Verification | Certora, Halmos | Mathematical proof of contract correctness |

### Blockchain Infrastructure

| Category | Technology | Purpose |
|---|---|---|
| Node Providers | Alchemy, Infura, QuickNode | RPC endpoints for EVM chains |
| Client Libraries | Ethers.js v6, viem, web3.py | Blockchain interaction from applications |
| Indexing | The Graph, Ponder | On-chain data indexing and querying |
| Oracles | Chainlink, Pyth Network | External data feeds for smart contracts |
| Storage | IPFS (via Pinata), Arweave | Decentralized file and metadata storage |

### Frontend (dApp)

| Category | Technology | Purpose |
|---|---|---|
| Framework | Next.js, React | Web application framework |
| Wallet Integration | wagmi, RainbowKit, WalletConnect | Wallet connection and transaction signing |
| State Management | TanStack Query | Server state and caching |

### Security & Audit

| Category | Technology | Purpose |
|---|---|---|
| Audit Tools | Slither, Mythril, Echidna, Certora | Automated and formal security analysis |
| Gas Profiling | Hardhat Gas Reporter, Foundry gas snapshots | Gas optimization analysis |
| Multisig | Safe (Gnosis Safe) | Multi-signature wallet for contract admin |
| Monitoring | OpenZeppelin Defender, Forta | On-chain monitoring and alerting |

---

## 3. Digital Marketing Stack

### SEO

| Category | Technology | Purpose |
|---|---|---|
| Research | Ahrefs, SEMrush | Keyword research, backlink analysis, competitor tracking |
| Technical SEO | Screaming Frog, Google Search Console | Crawl analysis, indexing, site health |
| Content Optimization | Surfer SEO, Clearscope | Content scoring and optimization |

### Paid Advertising

| Category | Technology | Purpose |
|---|---|---|
| Platforms | Google Ads, Meta Ads Manager, LinkedIn Campaign Manager | Campaign management across channels |
| Bid Management | Platform-native automation, custom scripts | Bid optimization and budget pacing |
| Creative Tools | Figma, Canva | Ad creative design and iteration |
| Landing Pages | Webflow, Unbounce | Landing page creation and A/B testing |

### Analytics & Attribution

| Category | Technology | Purpose |
|---|---|---|
| Web Analytics | Google Analytics 4 (GA4), Mixpanel | User behavior tracking, conversion analysis |
| Dashboarding | Looker Studio, Metabase | Custom reporting dashboards |
| Attribution | Triple Whale, Northbeam | Multi-touch attribution modeling |
| Tag Management | Google Tag Manager | Tracking implementation and management |

### Content & Social

| Category | Technology | Purpose |
|---|---|---|
| CRM | HubSpot, Salesforce | Lead management, email automation, pipeline tracking |
| Email Marketing | HubSpot, Mailchimp, Loops | Drip campaigns, newsletters, transactional email |
| Social Scheduling | Buffer, Hootsuite | Content scheduling and social management |
| Content Generation | Claude/GPT + human editorial | AI-assisted content creation with quality control |

---

## 4. Internal Operations Stack

### Paperclip (Central Coordination)

Paperclip is the backbone of all ZTech operations. It serves as:

| Function | Paperclip Capability |
|---|---|
| Project management | Issues, Projects, Goals hierarchy |
| Task assignment | Single-assignee tasks with atomic checkout |
| Team coordination | Org chart, chain of command, @-mention comments |
| Budget management | Per-agent monthly budgets, cost tracking, auto-pause |
| Governance | Approval gates (hire_agent, approve_ceo_strategy) |
| Audit & compliance | Immutable activity audit trail |
| Agent orchestration | Heartbeat scheduling, adapter management, session persistence |
| Client visibility | Dashboard access, real-time progress, cost reports |

**Paperclip Tech Stack:**
- **Frontend:** React 19, Vite 6, Radix UI, Tailwind CSS 4, TanStack Query
- **Backend:** Node.js 20+, Express.js 5, TypeScript
- **Database:** PostgreSQL 17 (Drizzle ORM)
- **Auth:** Better Auth (sessions + API keys)
- **Adapters:** Claude Code CLI, Codex CLI, Process, HTTP

### CI/CD & DevOps

| Category | Technology | Purpose |
|---|---|---|
| Version Control | Git, GitHub | Source code management, pull requests, code review |
| CI/CD | GitHub Actions | Automated testing, linting, deployment pipelines |
| Containerization | Docker, Docker Compose | Consistent development and deployment environments |
| Infrastructure | Vercel (frontend), Railway/Fly.io (backend) | Application hosting and scaling |
| Secrets Management | Paperclip Secrets, GitHub Secrets | Secure credential storage and rotation |

### Communication & Collaboration

| Category | Technology | Purpose |
|---|---|---|
| Agent-to-Agent | Paperclip task comments + @-mentions | Primary communication channel for all agents |
| Client Communication | Paperclip dashboard + automated reports | Transparent progress visibility |
| Internal Docs | Markdown in repository | Technical documentation, runbooks, playbooks |
| Alerts | Paperclip heartbeat monitoring + Sentry | Agent health, error detection, budget alerts |

### Monitoring & Observability

| Category | Technology | Purpose |
|---|---|---|
| Agent Monitoring | Paperclip dashboard | Agent status, heartbeat health, run history |
| Cost Monitoring | Paperclip cost API | Per-agent, per-project spend tracking |
| Application Monitoring | Sentry | Error tracking across all services |
| Uptime Monitoring | UptimeRobot, Better Uptime | Client-facing system availability |

---

## 5. Stack Selection Principles

1. **Paperclip-first** — If Paperclip provides the capability (task management, budget tracking, communication, governance), use Paperclip. Do not introduce redundant tools.

2. **Best-of-breed per domain** — Each service line uses industry-standard tools optimized for that domain. No one-size-fits-all compromises.

3. **API-native** — Every tool in the stack must have a robust API. Agents interact with tools programmatically through Paperclip's Process and HTTP adapters.

4. **Cost-transparent** — All tool costs are tracked and attributed to specific engagements. No hidden overhead.

5. **Minimal human dependency** — Prefer tools that agents can operate autonomously. Human intervention is reserved for Board-level governance decisions.

---

## 6. Stack by Engagement Type

### AI Automation Engagement

```
Client Brief
  --> Paperclip (coordination)
  --> Python + FastAPI (backend services)
  --> LangChain + LLM APIs (AI logic)
  --> Vector DB (knowledge retrieval)
  --> n8n/Temporal (workflow automation)
  --> Docker (deployment)
  --> Sentry + LangSmith (monitoring)
```

### Blockchain Development Engagement

```
Client Brief
  --> Paperclip (coordination)
  --> Solidity + Hardhat/Foundry (contracts)
  --> Ethers.js/viem (client libraries)
  --> The Graph (indexing)
  --> IPFS/Arweave (storage)
  --> Next.js + wagmi (dApp frontend)
  --> Slither + Mythril (security)
  --> Safe (multisig admin)
```

### Digital Marketing Engagement

```
Client Brief
  --> Paperclip (coordination)
  --> Google Ads + Meta Ads (paid channels)
  --> Ahrefs + SEMrush (SEO)
  --> GA4 + GTM (analytics)
  --> HubSpot (CRM + email)
  --> Looker Studio (dashboards)
  --> Claude/GPT (content generation)
```

### Full-Service Engagement (All Three Lines)

```
Client Brief
  --> Paperclip (single coordination layer)
  --> AI Automation stack (process automation)
  --> Blockchain stack (Web3 components)
  --> Digital Marketing stack (go-to-market)
  --> Unified dashboard via Paperclip
  --> Single budget and audit trail
```
