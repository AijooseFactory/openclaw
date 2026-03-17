---
name: spec-driven-development
description: Use when starting new features, greenfield projects, or brownfield enhancements. ALWAYS invoke `ai-timeline-estimation` skill before creating any timeline estimates. Use when you find yourself making up requirements mid-implementation, discovering edge cases after code is written, or can't trace code back to requirements. Creates executable specifications that generate working implementations via GitHub's Spec-Kit. Complements superpowers:brainstorming (ideation) and superpowers:writing-plans (artifacts).
---

# Spec-Driven Development

Workflow that flips traditional development: specifications become executable, directly generating working implementations rather than just guiding them.

## When to Use This Skill

| Trigger | Use Spec-Driven Development |
|---------|---------------------------|
| "Start a new project" | ✅ Create constitution + specifications |
| "Build a new feature from scratch" | ✅ Full workflow: constitution → specify → plan → tasks → implement |
| "Add a major enhancement" | ✅ Extend existing specs, create new feature branch |
| "Modernize legacy code" | ✅ Brownfield: analyze existing, add specs incrementally |
| "Quick bug fix" | ❌ Use `superpowers:systematic-debugging` instead |
| "Small refactor" | ❌ Use `superpowers:test-driven-development` directly |
| "Minor config change" | ❌ No spec process needed |
| "Prototype/spike/experiment" | ❌ Use `superpowers:brainstorming` for exploration |
| "Single-developer project" | ⚠️ Optional - use for complex features, skip for simple |

### Scale Appropriateness

> **NOTE:** Project sizes below refer to complexity and scope, not human time estimates. AI execution timelines should be estimated in hours, not weeks.

| Project Size | Recommendation |
|--------------|----------------|
| Single feature (1-4 AI hours) | Use superpowers directly, skip spec artifacts |
| Multi-feature (4-12 AI hours) | Use spec-driven for planning, lighten artifacts |
| Major initiative (1+ AI days) | Use full spec-driven workflow |
| Team project (2+ agents) | Use full spec-driven workflow for coordination |

**AI vs Human Timeline:**
- AI estimates should always be in **hours** or **days**
- Human timelines, if mentioned, must be labeled "for comparison purposes only"
- AI agents execute continuously 24/7 without breaks

## Common Rationalizations (STOP and Read)

| What You Might Say | Why It's Wrong |
|-------------------|----------------|
| "I already know what to build" | You don't. Prompts are incomplete. Specs surface edge cases. |
| "This is simple enough" | Features grow. Without specs, scope creep is invisible. |
| "I'll clarify as I go" | Implementation clarification = rework. Clarify BEFORE planning. |
| "The user knows what they want" | They don't. Users provide prompts, not requirements. |
| "I'll just use brainstorming" | Brainstorming is ideation. Spec-kit creates persistent artifacts. |
| "Existing specs are fine" | Outdated specs = outdated implementation. Review and update. |
| "This is just a prototype" | Prototypes need clear scope too. Or explicitly skip spec process. |
| "I'm working alone" | Single developer still needs traceability. Adjust formality, not process. |

**Red Flags — STOP and Use Specification Process:**

- Found yourself making up requirements mid-implementation
- Discovered edge cases after code is written
- User asks "wait, does it do X?" about something you already built
- Realized you don't know what "done" looks like
- Can't trace code back to any requirement document

## Integration with Superpowers

This skill **complements** superpowers, not replaces:

| Spec-Kit Phase | Superpowers Equivalent | Integration Point |
|----------------|----------------------|-------------------|
| `/speckit.constitution` | `superpowers:brainstorming` | Use brainstorming to define principles, constitution formalizes them |
| `/speckit.specify` | `superpowers:brainstorming` | Brainstorming for ideation, specify for artifact creation |
| `/speckit.clarify` | `superpowers:brainstorming` | Clarification refines specs before planning |
| `/speckit.plan` | `superpowers:writing-plans` | Plan command creates implementation docs from specs |
| `/speckit.tasks` | `superpowers:writing-plans` | Tasks breaks plans into actionable items |
| `/speckit.implement` | `superpowers:test-driven-development` | Implementation follows TDD discipline |
| `/speckit.analyze` | `superpowers:verification-before-completion` | Analysis validates cross-artifact consistency |
| `/speckit.checklist` | `superpowers:verification-before-completion` | Checklist validates requirements completeness |

## Workflow Order:
1. **Brainstorm** → `superpowers:brainstorming` (ideation)
2. **Formalize** → `/speckit.constitution` and `/speckit.specify` (create artifacts)
3. **Refine** → `/speckit.clarify` (polish requirements)
4. **Plan** → `superpowers:writing-plans` informed by `/speckit.plan`
5. **Break Down** → `/speckit.tasks` (actionable items)
6. **Validate** → `/speckit.analyze` and `/speckit.checklist`
7. **Resolve Gaps** → Address critical gaps identified in analysis
8. **Approve** → Present final plan for approval gate
9. **Build** → `superpowers:test-driven-development` guided by `/speckit.implement`
10. **Release** → `superpowers:verification-before-completion`

## E2E Team Workflow Pattern

For multi-agent projects, use this coordination pattern:

```
Albert (TPM)           → Constitution + Specification
    ↓
[Parallel Dispatch using superpowers:dispatching-parallel-agents]
    ├── Babatunde (Security)  → Security Review
    └── Zeke (Infrastructure) → Infrastructure Review
    ↓
Einstein (Engineer)     → Planning (with AI timelines)
    ↓
Blackwell (QA)          → Analysis + Checklist
    ↓
Albert (TPM)            → Approval Gate (final plan for user)
    ↓
[After Approval]
Einstein (Engineer)     → Implementation (TDD)
    ↓
Blackwell (QA)          → Verification before completion
```

**Key Coordination Points:**
- Albert creates constitution and specification first
- Security and Infrastructure reviews run in parallel
- Einstein plans after all reviews complete
- Blackwell validates before user approval
- User approval gate before implementation begins

## Role Mapping

| Role | Phase Ownership | Primary Commands |
|------|----------------|------------------|
| **Albert (TPM)** | Constitution, specification, planning | `/speckit.constitution`, `/speckit.specify`, `/speckit.plan` |
| **Einstein (Engineer)** | Implementation, TDD | `/speckit.tasks`, `/speckit.implement` |
| **Blackwell (QA)** | Validation, consistency | `/speckit.analyze`, `/speckit.checklist` |
| **Babatunde (Security)** | Security requirements in constitution | Contributes to constitution security clauses |
| **Zeke (DevOps)** | Infrastructure specs, deployment | `/speckit.plan` for infrastructure, `/speckit.implement` for deploy |

## Prerequisites

Before starting, ensure installed:
- `uv` for package management
- Python 3.11+
- Git
- A supported AI coding agent

Check prerequisites:
```bash
specify check
```

## Pre-Flight Checklist

Before starting spec-driven development, verify:

| Check | Verified |
|-------|----------|
| Project scope defined | ☐ |
| Key stakeholders identified | ☐ |
| Business context available | ☐ |
| Timeline expectations clear | ☐ |
| Technical constraints known | ☐ |
| Security requirements gathered | ☐ |
| Infrastructure constraints understood | ☐ |

**If any items are missing:** Clarify with user before proceeding to Constitution phase.

## Workflow

### Phase 1: Initialize Project

```bash
# New project
specify init <PROJECT_NAME> --ai claude

# Existing project
specify init . --ai claude
# or
specify init --here --ai claude
```

### Phase 2: Constitution

Create governing principles that guide all subsequent development:

```
/speckit.constitution Create principles focused on code quality, testing standards, user experience consistency, and performance requirements.
```

**Produces:** `.specify/memory/constitution.md`

**Key Questions:**
- What are the non-negotiable quality standards?
- What testing requirements must be met?
- What performance constraints exist?
- What security requirements apply?

### Phase 3: Specify

Define what you're building (requirements, not tech stack):

```
/speckit.specify Build [FEATURE DESCRIPTION]. It should [BEHAVIOR]. The users are [AUDIENCE].
```

**Produces:** `specs/XXX-<feature-name>/spec.md`

**Writing Good Specs:**
- Be explicit about what and why
- Focus on behaviors and outcomes
- Describe users and their goals
- Don't specify tech stack yet

### Phase 4: Clarify

Reduce ambiguity before planning:

```
/speckit.clarify
```

**Produces:** Clarifications section in spec.md

**When to Clarify:**
- Always before `/speckit.plan`
- When specs feel incomplete
- When multiple interpretations exist

### Phase 5: Plan

Define technical implementation:

```
/speckit.plan The application uses [TECH STACK]. Architecture follows [PATTERN]. Data stored in [DATABASE].
```

**Produces:**
- `plan.md` - Implementation overview
- `data-model.md` - Data structures
- `contracts/` - API specs
- `research.md` - Tech decisions

### Phase 6: Tasks

Break plan into actionable items:

```
/speckit.tasks
```

**Produces:** `tasks.md` with:
- Ordered task list
- Dependency markers
- Parallel execution indicators `[P]`
- File path specifications
- Test-first structure

### Phase 7: Analyze (Optional)

Cross-artifact consistency check:

```
/speckit.analyze
```

Validates:
- Spec coverage completeness
- Plan-spec alignment
- Task-plan consistency

### Phase 8: Gap Resolution (If Required)

Address identified gaps before implementation:

**When Required:** When Analysis finds critical gaps (security, compliance, missing requirements)

**Process:**
1. Review gap list from `/speckit.analyze`
2. Categorize gaps: Critical / High / Medium / Low
3. For each Critical/High gap:
   - Identify responsible agent (security → Babatunde, infra → Zeke, general → Einstein)
   - Create resolution task
   - Update relevant spec/plan artifacts
4. Document resolution decisions in spec

**Output:** Updated artifacts with gap resolutions documented

**Timeframe:** AI estimates in hours, not days, for gap resolution

### Phase 9: Checklist (Optional)

Quality validation:

```
/speckit.checklist
```

**Validates:**
- Requirements completeness
- Clarity and consistency
- Acceptance criteria

### Phase 10: Approval Gate

Present final plan for approval:

**Deliverable:** Implementation Plan awaiting feedback and/or approval

**Required Artifacts:**
- Constitution (governing principles)
- Specification (requirements document)
- Security Requirements (if applicable)
- Infrastructure Requirements (if applicable)
- Plan (implementation plan with AI estimates)
- Analysis (coverage matrix, gap analysis)
- Checklist (pre-implementation verification)

**Output Format:**
```markdown
## Final Implementation Plan

### AI Execution Timeline (Primary)
| Milestone | AI Estimate | Deliverable | Owner |
|-----------|-------------|-------------|-------|
...

### Critical Gaps Identified
| Gap | Issue | Resolution |
|-----|-------|------------|
...

### Go/No-Go Recommendation
[CONDITIONAL GO | GO | NO-GO] — Reasoning and conditions.
```

**Timeline Format:**
- AI estimates as PRIMARY (hours/days)
- Human estimates, if included, must be labeled "for comparison purposes only"

### Phase 11: Implement

Execute tasks after approval:

```
/speckit.implement
```

**Execution:**
- Follows task order
- Respects dependencies
- Runs TDD cycle per task
- Reports progress

## Directory Structure

After initialization:

```
project/
├── .specify/
│   ├── memory/
│   │   └── constitution.md    # Project principles
│   ├── scripts/              # Automation scripts
│   ├── specs/
│   │   └── 001-feature/
│   │       ├── spec.md       # Requirements
│   │       ├── plan.md       # Technical plan
│   │       ├── tasks.md      # Action items
│   │       └── contracts/     # API contracts
│   └── templates/             # Spec templates
└── CLAUDE.md                  # Agent instructions
```

## Environment Variable

For non-Git repositories:

```bash
export SPECIFY_FEATURE=001-photo-albums
```

## Spec Maintenance

For projects with existing specs:

| Situation | Action |
|-----------|--------|
| Specs are current | Run `/speckit.analyze` to verify consistency before continuing |
| Specs are outdated | Update `/speckit.constitution` and `/speckit.specify` with current requirements |
| Specs are missing for new feature | Create new spec branch: `specify spec new-feature` |
| Architecture changed | Regenerate `/speckit.plan` and `/speckit.tasks` |

**When to refresh specs:**
- After major architectural changes
- When team composition changes
- When project scope expands significantly
- Before starting a new feature branch

## Common Patterns

### Greenfield Project

```
specify init my-app --ai claude
cd my-app
claude
> /speckit.constitution Create principles for [DOMAIN]...
> /speckit.specify Build [FEATURE]...
> /speckit.plan Use [STACK]...
> /speckit.tasks
> /speckit.implement
```

### Brownfield Enhancement

```
cd existing-project
specify init . --ai claude --force
claude
> /speckit.constitution Analyze existing codebase principles...
> /speckit.specify Add [FEATURE] to existing [SYSTEM]...
> /speckit.plan Integrate with [EXISTING ARCHITECTURE]...
> /speckit.tasks
> /speckit.implement
```

### Parallel Implementation

```
> /speckit.specify Build [FEATURE]...
> /speckit.plan [Plan details]...
> /speckit.tasks
# Tasks marked [P] can run in parallel
# Use superpowers:dispatching-parallel-agents for multi-agent execution
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `specify: command not found` | Install: `uv tool install specify-cli --from git+https://github.com/github/spec-kit.git` |
| Git authentication errors | Install Git Credential Manager or configure SSH keys |
| Agent not found | Use `--ignore-agent-tools` to skip tool checks |
| Merge conflicts on init | Use `--force` to overwrite existing files |
| Missing dependencies | Run `specify check` to verify prerequisites |

## References

For detailed methodology, see [references/spec-driven-methodology.md](references/spec-driven-methodology.md).