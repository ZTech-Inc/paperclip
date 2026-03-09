# ZTech Incorporation — Organizational Structure

## Overview

ZTech's organizational structure is modeled as a Paperclip company — a hierarchy of AI agents with defined roles, reporting lines, budgets, and task flows. Every role in a traditional company maps directly to a Paperclip agent, and every business process maps to Paperclip's task and heartbeat system.

This is not a metaphor. ZTech literally runs as a Paperclip company instance, with each executive and team member operating as an autonomous AI agent within the platform.

---

## Org Chart

```
Board (Human Operator)
│
│   ┌─────────────────────────────────────┐
│   │  Consultant (External Advisor)      │
│   │  Provides strategic guidance to CEO │
│   └─────────────────────────────────────┘
│
└── CEO (Chief Executive Officer)
    │
    ├── CTO (Chief Technology Officer)
    │   ├── AI Engineer
    │   ├── Blockchain Engineer
    │   └── Full-Stack Engineer
    │
    ├── COO (Chief Operating Officer)
    │   ├── Project Manager
    │   └── QA / Delivery Specialist
    │
    ├── CFO (Chief Financial Officer)
    │   ├── Financial Analyst
    │   └── Budget Controller
    │
    └── CMO (Chief Marketing Officer)
        ├── Content Strategist
        ├── Performance Marketer
        └── SEO Specialist
```

---

## Role Definitions & Paperclip Agent Mapping

### Consultant (External Advisor)

**Paperclip Role:** `consultant`
**Reports To:** None (external to the org hierarchy)
**Adapter Type:** `claude_local` or `http`

**Responsibilities:**
- Provides strategic guidance and industry expertise to the CEO
- Reviews high-level strategy documents and offers recommendations
- Advises on market positioning, pricing, and competitive dynamics
- Does not have direct reports or task delegation authority within the org

**Paperclip Mapping:**
- Operates outside the standard chain of command
- Communicates with the CEO via task comments and mentions
- Does not own tasks in the standard workflow — instead, the CEO creates advisory tasks and assigns them to the Consultant for input
- Budget is minimal (advisory role, limited heartbeats)

**Interaction Pattern:**
1. CEO creates task: "Review Q2 pricing strategy"
2. Assigns to Consultant
3. Consultant's heartbeat wakes, reviews context, posts analysis as comment
4. CEO reads Consultant's input on next heartbeat and incorporates into strategy

---

### CEO (Chief Executive Officer)

**Paperclip Role:** `ceo`
**Reports To:** Board (Human Operator)
**Adapter Type:** `claude_local`
**Budget:** Highest tier ($10K-$25K/month)

**Responsibilities:**
- Sets company strategy aligned with the company goal
- Translates client engagements into strategic plans
- Delegates work to CTO, COO, CFO, and CMO
- Reviews cross-departmental progress and resolves conflicts
- Submits strategic plans for Board approval via Paperclip's approval gates
- Escalates blockers and budget requests to the Board

**Paperclip Mapping:**
- Maps to the **team lead agent** — the root of the org tree with no `reportsTo`
- Creates top-level tasks and delegates via sub-issues to C-suite reports
- Uses Paperclip's approval system (`approve_ceo_strategy`) to get Board sign-off
- Reviews dashboard metrics to assess company health
- Requests new agent hires via `hire_agent` approvals when capacity is needed

**Heartbeat Protocol:**
1. Wake on schedule (every 2-4 hours) or on approval resolution
2. Check pending approvals — handle approved/rejected strategies
3. Review all C-suite reports' task status
4. Identify blockers, reassign or escalate as needed
5. Create new strategic tasks based on client pipeline
6. Comment on progress across departments

**Task Flow:**
```
Client Brief arrives
  → CEO creates Project: "Client X — AI Automation Suite"
    → CEO creates Issue: "Define technical architecture" → assigns to CTO
    → CEO creates Issue: "Build go-to-market plan" → assigns to CMO
    → CEO creates Issue: "Model project economics" → assigns to CFO
    → CEO creates Issue: "Set up delivery timeline" → assigns to COO
```

---

### CTO (Chief Technology Officer)

**Paperclip Role:** `cto`
**Reports To:** CEO
**Adapter Type:** `claude_local`
**Budget:** $5K-$15K/month

**Responsibilities:**
- Oversees all technical delivery across AI Automation and Blockchain Development
- Defines technical architecture and engineering standards
- Manages the engineering team (AI Engineer, Blockchain Engineer, Full-Stack Engineer)
- Reviews and approves technical deliverables before client handoff
- Escalates resource constraints and technical blockers to CEO

**Paperclip Mapping:**
- Agent with `reportsTo: CEO`
- Receives tasks from CEO and delegates to engineering reports via sub-issues
- Uses atomic checkout to claim technical review tasks
- Can request new engineer hires via `hire_agent` approval
- Cross-team coordination: receives tasks from COO (delivery requirements) and CMO (marketing tech needs)

**Heartbeat Protocol:**
1. Wake on schedule, assignment, or mention
2. Check assigned tasks — prioritize `in_progress`, then `todo`
3. For architecture tasks: produce technical specs, post as comments
4. For delegation: break down into sub-issues for engineers
5. For review tasks: review engineer output, approve or request changes via comments
6. Escalate budget or resource issues to CEO

**Task Flow:**
```
CEO assigns: "Build client payment automation"
  → CTO creates sub-issue: "Design API schema" → assigns to Full-Stack Engineer
  → CTO creates sub-issue: "Implement smart contract escrow" → assigns to Blockchain Engineer
  → CTO creates sub-issue: "Build ML fraud detection model" → assigns to AI Engineer
  → CTO reviews completed sub-issues, integrates, marks parent done
```

---

### COO (Chief Operating Officer)

**Paperclip Role:** `coo`
**Reports To:** CEO
**Adapter Type:** `claude_local`
**Budget:** $3K-$8K/month

**Responsibilities:**
- Manages operational delivery and project timelines
- Ensures projects stay on schedule and within scope
- Coordinates cross-departmental dependencies
- Manages the Project Manager and QA/Delivery Specialist
- Tracks delivery metrics and reports to CEO
- Handles client communication workflows and status reporting

**Paperclip Mapping:**
- Agent with `reportsTo: CEO`
- Owns project-level tasks related to delivery milestones and operational cadence
- Creates and manages Paperclip Projects with start/target dates
- Monitors task status across departments to identify bottlenecks
- Uses Paperclip's activity audit trail to generate delivery reports

**Heartbeat Protocol:**
1. Wake on schedule (every 1-2 hours during active projects)
2. Review all active Projects — check for overdue tasks
3. Identify blocked tasks across departments, comment to unblock or escalate
4. Update project status and timeline estimates
5. Delegate operational tasks to Project Manager and QA Specialist
6. Report delivery status to CEO via task comments

**Task Flow:**
```
CEO assigns: "Ensure Q1 delivery milestones are met"
  → COO creates sub-issue: "Track sprint progress for Client X" → assigns to Project Manager
  → COO creates sub-issue: "Run QA on AI automation deliverable" → assigns to QA Specialist
  → COO reviews delivery reports, flags risks to CEO
```

---

### CFO (Chief Financial Officer)

**Paperclip Role:** `cfo`
**Reports To:** CEO
**Adapter Type:** `claude_local`
**Budget:** $2K-$5K/month

**Responsibilities:**
- Manages financial planning, projections, and budget allocation
- Tracks revenue, costs, and profitability per engagement
- Models pricing strategies and unit economics
- Manages the Financial Analyst and Budget Controller
- Reports financial health to CEO and Board
- Monitors agent spend against budgets using Paperclip's cost tracking

**Paperclip Mapping:**
- Agent with `reportsTo: CEO`
- Leverages Paperclip's built-in budget and cost management system
- Uses dashboard metrics (agent spend, burn rate, budget utilization) as primary data source
- Creates financial model tasks and delegates analysis to reports
- Provides input to CEO on hiring decisions (cost impact of new agents)

**Heartbeat Protocol:**
1. Wake on schedule (daily or twice-daily)
2. Pull dashboard metrics — agent costs, budget utilization, burn rate
3. Identify agents approaching budget limits, recommend adjustments
4. Update financial projections based on current spend
5. Delegate detailed analysis tasks to Financial Analyst
6. Report financial summary to CEO

**Task Flow:**
```
CEO assigns: "Model profitability for Client Y engagement"
  → CFO creates sub-issue: "Compile agent cost data for Client Y" → assigns to Financial Analyst
  → CFO creates sub-issue: "Validate budget allocations" → assigns to Budget Controller
  → CFO synthesizes inputs, delivers profitability model to CEO
```

---

### CMO (Chief Marketing Officer)

**Paperclip Role:** `cmo`
**Reports To:** CEO
**Adapter Type:** `claude_local`
**Budget:** $5K-$12K/month

**Responsibilities:**
- Owns go-to-market strategy and marketing execution
- Manages brand positioning, content strategy, and demand generation
- Oversees paid acquisition, SEO, and conversion optimization
- Manages Content Strategist, Performance Marketer, and SEO Specialist
- Reports marketing metrics (CAC, pipeline, conversion rates) to CEO
- Coordinates with CTO on marketing technology requirements

**Paperclip Mapping:**
- Agent with `reportsTo: CEO`
- Receives strategic marketing tasks from CEO, delegates execution to reports
- Creates cross-team tasks to CTO when marketing requires technical implementation
- Uses Paperclip's goal hierarchy to align campaigns with company-level objectives

**Heartbeat Protocol:**
1. Wake on schedule or assignment
2. Review marketing task pipeline — prioritize active campaigns
3. Analyze campaign performance data (pulled from external tools via Process adapter)
4. Delegate content, ad management, and SEO tasks to reports
5. Coordinate with CTO on landing pages, tracking pixels, API integrations
6. Report marketing metrics to CEO

**Task Flow:**
```
CEO assigns: "Launch demand gen campaign for AI Automation service"
  → CMO creates sub-issue: "Write campaign landing page copy" → assigns to Content Strategist
  → CMO creates sub-issue: "Set up and optimize paid ad campaigns" → assigns to Performance Marketer
  → CMO creates sub-issue: "Optimize landing page for search" → assigns to SEO Specialist
  → CMO creates cross-team issue: "Build landing page" → assigns to CTO
  → CMO monitors campaign metrics, adjusts strategy
```

---

## Chain of Command & Escalation

### Escalation Path

Every agent follows a strict escalation path when blocked:

```
Individual Contributor (Engineer, Analyst, etc.)
  → Department Head (CTO, COO, CFO, CMO)
    → CEO
      → Board (Human Operator)
```

**Escalation Rules (enforced by Paperclip):**
- An agent marks a task as `blocked` and comments the reason
- The agent mentions their manager: "@CTO blocked on DB access"
- Manager's heartbeat wakes, reviews the blocker, and either resolves or escalates further
- Cross-team tasks cannot be cancelled by the receiving team — they must be reassigned back up the chain

### Cross-Department Coordination

Paperclip enables cross-team work without breaking the org hierarchy:

| Scenario | Flow |
|---|---|
| CMO needs a landing page built | CMO creates task, assigns to CTO. CTO delegates to Full-Stack Engineer. |
| CTO needs budget approval for new tool | CTO comments on task, mentions CFO. CFO reviews and advises CEO. |
| COO identifies delivery risk | COO creates blocker task, assigns to relevant department head. |
| CFO needs usage data for projections | CFO creates task, assigns to CTO for agent cost report extraction. |

---

## Task Flow Between Agents

### End-to-End Client Engagement

```
1. Client Brief → CEO
   CEO creates Project with goal linked to company objective

2. CEO → Strategic Breakdown
   CEO creates issues for each department head:
   - Technical scope → CTO
   - Delivery plan → COO
   - Financial model → CFO
   - Marketing plan → CMO

3. Department Heads → Delegation
   Each head breaks their issue into sub-issues for ICs:
   - CTO → Engineers build components
   - COO → PM tracks milestones, QA validates
   - CFO → Analyst models costs, Controller tracks budget
   - CMO → Content, ads, and SEO execute campaigns

4. ICs → Execution
   Engineers, marketers, and analysts execute tasks:
   - Checkout task (atomic, single-assignee)
   - Do the work
   - Comment progress
   - Mark done or escalate if blocked

5. Department Heads → Review & Integration
   Heads review completed sub-issues, integrate deliverables

6. CEO → Client Delivery
   CEO reviews cross-departmental output, delivers to client

7. Board → Governance
   Board approves major decisions, monitors spend, intervenes if needed
```

### Paperclip Primitives in Action

| Business Activity | Paperclip Primitive |
|---|---|
| Hiring a new team member | `hire_agent` approval → Board approves → Agent activated |
| Setting company strategy | CEO creates issues → `approve_ceo_strategy` → Board sign-off |
| Assigning work | Issue created with `assigneeAgentId` → Agent heartbeat wakes |
| Checking progress | Dashboard metrics + activity audit trail |
| Coordinating across teams | Cross-team issue assignment + @-mention comments |
| Enforcing budgets | `budgetMonthlyCents` per agent, auto-pause at 100% |
| Maintaining accountability | Single-assignee tasks + atomic checkout + immutable comments |
| Tracking deliverables | Projects with start/target dates + linked issues + goal hierarchy |

---

## Agent Configuration Summary

| Role | Paperclip Role | Reports To | Adapter | Monthly Budget | Heartbeat Frequency |
|---|---|---|---|---|---|
| Consultant | `consultant` | None (external) | `claude_local` / `http` | $500-$1K | On-demand |
| CEO | `ceo` | Board | `claude_local` | $10K-$25K | Every 2-4 hours |
| CTO | `cto` | CEO | `claude_local` | $5K-$15K | Every 1-2 hours |
| COO | `coo` | CEO | `claude_local` | $3K-$8K | Every 1-2 hours |
| CFO | `cfo` | CEO | `claude_local` | $2K-$5K | Daily / twice-daily |
| CMO | `cmo` | CEO | `claude_local` | $5K-$12K | Every 1-2 hours |
| AI Engineer | `engineer` | CTO | `claude_local` | $3K-$8K | On assignment |
| Blockchain Engineer | `engineer` | CTO | `claude_local` | $3K-$8K | On assignment |
| Full-Stack Engineer | `engineer` | CTO | `claude_local` | $3K-$8K | On assignment |
| Project Manager | `manager` | COO | `claude_local` | $1K-$3K | Every 2 hours |
| QA Specialist | `engineer` | COO | `claude_local` | $1K-$3K | On assignment |
| Financial Analyst | `analyst` | CFO | `claude_local` | $1K-$2K | Daily |
| Budget Controller | `analyst` | CFO | `claude_local` | $1K-$2K | Daily |
| Content Strategist | `engineer` | CMO | `claude_local` | $2K-$5K | On assignment |
| Performance Marketer | `engineer` | CMO | `claude_local` | $2K-$5K | On assignment |
| SEO Specialist | `engineer` | CMO | `claude_local` | $1K-$3K | On assignment |

**Total estimated monthly agent budget: $40K-$120K** — equivalent to 1-2 senior hires, delivering the output of a 15-person team.
