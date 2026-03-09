# ZTech Incorporation — Operations Model

## Overview

ZTech's operating model is built entirely on Paperclip's control plane. Every operational process — from client intake to final delivery — is modeled as a series of Paperclip task flows with defined agent assignments, approval gates, escalation paths, and SLAs. There are no external project management tools, no spreadsheet trackers, no status meetings. Paperclip is the single source of truth for all operations.

---

## 1. Client Onboarding Workflow

### Stage 1: Intake

**Trigger:** Client inquiry arrives (via website form, referral, or direct outreach).

**Paperclip Flow:**
1. The **CEO agent** receives the client inquiry (via manual invoke or scheduled heartbeat)
2. CEO creates a new Issue: "Evaluate Client X — [Industry/Need Summary]" with priority `high`
3. CEO assigns an initial qualification sub-issue to the **COO**: "Qualify Client X — fit assessment"
4. COO's heartbeat wakes and performs qualification:
   - Business size and revenue range ($500K-$50M target)
   - Service line alignment (AI Automation, Blockchain, Digital Marketing)
   - Budget expectations vs. ZTech pricing tiers
   - Timeline feasibility
5. COO comments qualification summary on the task and marks `done` or `blocked` (if more info needed)

**Approval Gate:** None — intake is an operational step, not a governance decision.

**SLA:** Qualification completed within 24 hours of inquiry.

### Stage 2: Discovery

**Trigger:** Client passes qualification (COO marks qualification task as `done`).

**Paperclip Flow:**
1. CEO creates a new Project: "Client X — Discovery" with a 2-week target date
2. CEO delegates discovery tasks to department heads:
   - **CTO**: "Assess technical requirements for Client X" — technical feasibility, architecture constraints, integration landscape
   - **CMO**: "Assess marketing landscape for Client X" — current digital presence, competitive positioning, channel opportunities
   - **CFO**: "Preliminary cost model for Client X" — estimated agent budget, projected margins
   - **COO**: "Document Client X business processes" — current workflows, pain points, automation candidates
3. Each department head delegates sub-issues to their ICs as needed:
   - CTO assigns AI Engineer to evaluate data infrastructure
   - CTO assigns Blockchain Engineer to review smart contract requirements (if applicable)
   - CMO assigns Content Strategist to audit existing content
4. All agents comment findings on their respective tasks
5. COO aggregates findings into a discovery summary document

**Approval Gate:** None — discovery is an internal process.

**SLA:** Discovery report delivered within 10 business days.

### Stage 3: Proposal

**Trigger:** Discovery tasks are completed across all departments.

**Paperclip Flow:**
1. CEO creates Issue: "Build proposal for Client X" with sub-issues:
   - **CTO**: "Draft technical scope and architecture proposal"
   - **CFO**: "Build pricing model and payment schedule"
   - **CMO**: "Draft marketing strategy proposal" (if marketing service included)
   - **COO**: "Draft delivery timeline and milestones"
2. Each head completes their section and comments the deliverable
3. CEO synthesizes into a unified proposal document
4. CEO submits the proposal for **Board approval** via `approve_ceo_strategy` approval type

**Approval Gate:** Board reviews and approves the proposal before it is sent to the client. The Board can:
- **Approve** — proposal is sent to client
- **Reject** — CEO must revise scope or pricing
- **Request revision** — specific changes required before resubmission

**SLA:** Proposal delivered to client within 5 business days of discovery completion.

### Stage 4: Contract & Kickoff

**Trigger:** Client accepts the proposal.

**Paperclip Flow:**
1. CEO creates a new Paperclip Company instance for the engagement: "Client X — [Project Name]"
2. CEO defines the company goal aligned with the client's primary objective
3. COO creates the Project with start date, target date, and linked goals
4. COO sets up Workspaces (repositories, working directories) for the project
5. CFO configures per-agent budgets for the engagement based on the approved pricing model
6. CEO delegates initial work packages to department heads:
   - Sprint 1 tasks for CTO's engineering team
   - Campaign setup tasks for CMO's marketing team
   - Budget tracking tasks for CFO's finance team
   - Delivery monitoring tasks for COO's operations team
7. Client is granted Board operator access to the Paperclip dashboard for real-time visibility

**Approval Gate:** `hire_agent` approvals if the engagement requires additional agents beyond the existing team.

**SLA:** Kickoff completed and first sprint started within 3 business days of contract signing.

---

## 2. Project Delivery Pipeline

### Sprint Planning

**Cadence:** 2-week sprints for all service lines.

**Paperclip Flow:**
1. At sprint start, **COO** creates a sprint-level Issue: "Sprint N — Client X"
2. COO reviews the project backlog and identifies tasks for the sprint
3. COO assigns sprint planning sub-issues to department heads:
   - Each head selects tasks from their backlog and sets priorities
   - Each head breaks down tasks into sprint-sized sub-issues for their ICs
4. **Project Manager** (reports to COO) creates the sprint board — all tasks tagged to the sprint with `todo` status
5. COO reviews the sprint plan and comments approval

**Automation:**
- Agents pick up `todo` tasks via the heartbeat protocol — no manual assignment chasing
- Atomic checkout ensures no two agents work on the same task
- Priority ordering ensures the most critical work is addressed first

### Sprint Execution

**Paperclip Flow:**
1. Each agent's heartbeat fires on schedule or on assignment
2. Agent checks out the highest-priority `todo` task assigned to them
3. Agent does the work, comments progress, and marks `done` when complete
4. If blocked, agent marks `blocked`, comments the reason, and mentions their manager
5. Manager's heartbeat wakes, reviews the blocker, and either:
   - Resolves it directly
   - Reassigns the task
   - Escalates up the chain (to CEO if cross-departmental)

**Monitoring:**
- **COO** monitors sprint progress via Paperclip dashboard every 1-2 hours
- **Project Manager** tracks task velocity and flags slippage to COO
- Blocked tasks trigger automatic escalation via the mention system

### Sprint Review

**Cadence:** End of each 2-week sprint.

**Paperclip Flow:**
1. COO creates Issue: "Sprint N Review — Client X"
2. COO assigns review sub-issues to department heads:
   - **CTO**: "Technical review — Sprint N deliverables" — code quality, architecture alignment, test coverage
   - **CMO**: "Marketing review — Sprint N results" — campaign metrics, content performance
   - **CFO**: "Financial review — Sprint N spend" — budget utilization, cost-per-deliverable
3. Each head reviews their team's output and comments findings
4. COO aggregates into a sprint review report
5. CEO reviews the sprint summary and comments strategic direction for next sprint

**Approval Gate:** Board approval required for any scope changes or budget adjustments identified during review.

### Delivery & Handoff

**Paperclip Flow:**
1. When a project milestone or final deliverable is complete:
   - **QA/Delivery Specialist** (reports to COO) performs quality validation
   - QA creates sub-issues for any defects found, assigns back to the responsible engineer
   - Once QA signs off (task marked `done`), COO marks the milestone as delivered
2. COO creates a delivery Issue: "Deliver [milestone] to Client X"
3. CEO reviews the deliverable and submits for **Board approval** before client handoff
4. Upon Board approval, the deliverable is released to the client

**SLA:** QA validation completed within 48 hours of engineering completion. Client delivery within 24 hours of QA sign-off.

---

## 3. Quality Assurance Processes

### Code & Technical QA

**Owner:** QA/Delivery Specialist (reports to COO), with technical review by CTO.

**Checkpoints:**
1. **Per-task review** — Every engineering task includes a review sub-issue assigned to the CTO or a senior engineer
2. **Sprint-end review** — CTO conducts architecture review across all sprint deliverables
3. **Pre-delivery audit** — QA Specialist runs the final validation checklist:
   - Functional testing (does it work as specified?)
   - Integration testing (does it work with existing systems?)
   - Security review (OWASP top 10, smart contract vulnerabilities)
   - Performance testing (load, latency, gas optimization for blockchain)
   - Documentation completeness

### Marketing QA

**Owner:** CMO with support from Content Strategist.

**Checkpoints:**
1. **Content review** — All content passes through CMO review before publication
2. **Campaign audit** — Performance Marketer validates tracking, targeting, and budget allocation before launch
3. **Analytics validation** — SEO Specialist confirms tracking implementation and baseline metrics

### Financial QA

**Owner:** CFO with Budget Controller.

**Checkpoints:**
1. **Budget check** — Budget Controller validates agent spend against approved engagement budget at each sprint boundary
2. **Cost anomaly detection** — CFO reviews any agent approaching 80% budget utilization
3. **Margin validation** — Financial Analyst confirms actual costs against projected margins

### Escalation from QA

If QA identifies a critical issue:
1. QA Specialist creates a `critical` priority Issue describing the defect
2. Assigns to the responsible department head (CTO for technical, CMO for marketing)
3. Department head's heartbeat wakes immediately (assignment trigger)
4. Fix is developed, reviewed, and deployed within the current sprint if possible
5. If the fix requires scope change, COO escalates to CEO, who escalates to Board

---

## 4. SLAs per Service Tier

### AI Automation

| SLA Metric | Starter | Growth | Enterprise |
|---|---|---|---|
| Initial response time | 48 hours | 24 hours | 4 hours |
| Sprint cadence | 2-week | 2-week | 1-week |
| Bug fix turnaround | 5 business days | 2 business days | 24 hours |
| Uptime (deployed systems) | 99.0% | 99.5% | 99.9% |
| Progress reporting | Bi-weekly | Weekly | Daily dashboard + weekly call |
| Escalation response | 24 hours | 8 hours | 2 hours |
| Dedicated agent team | Shared | Shared with priority | Dedicated |

### Blockchain Development

| SLA Metric | Standard | Premium |
|---|---|---|
| Initial response time | 24 hours | 4 hours |
| Audit turnaround | 10 business days | 5 business days |
| Critical vulnerability fix | 48 hours | 12 hours |
| Testnet deployment | Within sprint | Within 48 hours of code complete |
| Progress reporting | Weekly | Daily dashboard |
| Post-launch support response | 24 hours | 4 hours |

### Digital Marketing

| SLA Metric | Starter | Growth | Enterprise |
|---|---|---|---|
| Campaign launch time | 2 weeks from kickoff | 1 week from kickoff | 3 business days from kickoff |
| Optimization cycles | Bi-weekly | Weekly | Twice-weekly |
| Reporting cadence | Monthly | Weekly | Daily dashboard + weekly review |
| Channel setup | 1 channel | 2-3 channels | Full-channel |
| A/B test velocity | 1 test/month | 2 tests/month | Continuous |
| Strategy pivot response | 5 business days | 2 business days | 24 hours |

### Cross-Service SLAs

| Metric | All Tiers |
|---|---|
| Paperclip dashboard access | Real-time, 24/7 |
| Activity audit trail retention | 12 months |
| Budget utilization reporting | Real-time via dashboard |
| Agent auto-pause on budget exceed | Immediate (automated) |
| Board approval turnaround | 24 hours (human operator) |

---

## 5. Escalation Paths & Issue Resolution

### Escalation Hierarchy

```
Individual Contributor (Engineer, Analyst, Marketer)
  --> Department Head (CTO, COO, CFO, CMO)
    --> CEO
      --> Board (Human Operator)
```

### Escalation Triggers

| Trigger | Action | Owner |
|---|---|---|
| Task blocked > 4 hours | Agent marks `blocked`, mentions manager | IC Agent |
| Sprint milestone at risk | COO flags risk to CEO | COO / Project Manager |
| Budget utilization > 80% | CFO alerts CEO with recommendation | CFO / Budget Controller |
| Critical QA defect | QA creates `critical` issue, assigns to dept head | QA Specialist |
| Cross-department dependency stalled | COO creates coordination task, assigns to both heads | COO |
| Client escalation | CEO takes ownership, creates resolution task | CEO |
| Agent error/failure | COO investigates, CTO resolves if technical | COO |

### Resolution Workflow

**Paperclip Task Flow:**

1. **Detection** — Agent or automated monitoring identifies an issue
2. **Logging** — A new Issue is created with:
   - Clear title: "[ESCALATION] Description of problem"
   - Priority: `critical` or `high`
   - Description: Root cause analysis, impact assessment, proposed resolution
   - Assigned to: The responsible party
3. **Triage** — Assigned agent's heartbeat wakes, reviews the escalation
4. **Resolution** — Agent works the fix, comments progress, marks `done`
5. **Verification** — QA Specialist or COO verifies the resolution
6. **Post-mortem** — For critical escalations, COO creates a post-mortem task to document lessons learned

### Board Override Powers

The Board (human operator) retains full control at all times:
- **Pause any agent** — immediately halt an agent's heartbeats
- **Terminate any agent** — permanently deactivate (irreversible)
- **Reassign any task** — move work between agents
- **Override budgets** — increase or decrease limits
- **Approve or reject** — all governance-gated decisions
- **Direct intervention** — create tasks, comment, and adjust priorities directly

---

## 6. Operational Metrics & Monitoring

### Dashboard KPIs (via Paperclip API)

| Metric | Source | Frequency |
|---|---|---|
| Agent utilization | Agent status (active/idle/running) | Real-time |
| Task throughput | Issues completed per sprint | Per sprint |
| Task cycle time | Time from `todo` to `done` | Per task |
| Blocked task count | Issues with `blocked` status | Real-time |
| Budget burn rate | Cost tracking per agent | Real-time |
| Sprint velocity | Story points or tasks completed per sprint | Per sprint |
| Escalation frequency | Escalation issues created | Weekly |
| Client satisfaction | Post-delivery review scores | Per milestone |

### Operational Cadence

| Activity | Frequency | Owner | Paperclip Primitive |
|---|---|---|---|
| Sprint planning | Every 2 weeks | COO + dept heads | Project + Issues |
| Sprint review | Every 2 weeks | COO + CEO | Review Issues + Comments |
| Daily operations check | Every 1-2 hours | COO | Dashboard + heartbeat |
| Budget review | Weekly | CFO | Cost API + dashboard |
| Strategy review | Monthly | CEO + Board | Approval gate |
| QA audit | Per milestone | QA Specialist | Review Issues |
| Client progress report | Per SLA tier | CEO agent (automated) | Comments + dashboard |
