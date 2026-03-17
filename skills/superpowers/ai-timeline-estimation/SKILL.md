---
name: ai-timeline-estimation
description: Use BEFORE creating any timeline estimates for AI agent work. Provides validated heuristics for estimating AI execution times based on industry benchmarks from Claude Code, Devin, Cursor, and other autonomous AI coding agents. All agents MUST use realistic AI estimates, not human estimates or optimistic placeholders. Estimates are GUIDELINES - if you can do it faster, DO IT FASTER.
version: 1.1.0
skill_schema_version: 1
deprecated: false
replaced_by: null
minimum_openclaw_version: "1.0.0"
supported_models:
  - general
preferred_model_traits:
  - strong reasoning
  - numerical accuracy
required_tools: []
optional_tools:
  - exec
  - read
  - write
risk_level: low
---

# AI Timeline Estimation

Validated heuristics for estimating realistic AI agent execution times based on industry benchmarks and research.

## Purpose

This skill provides validated heuristics for estimating AI agent execution times based on industry benchmarks from Claude Code, Devin, Cursor, and other autonomous AI coding agents. It ensures all agents use realistic timeline estimates rather than human estimates or optimistic placeholders.

The core principle is:
```
ESTIMATES ARE GUIDELINES, NOT CONSTRAINTS. FASTER IS BETTER.
```

**If your estimate is 30 minutes and you finish in 15, report the actual time.**

## Core Principle

```
ESTIMATES ARE GUIDELINES, NOT CONSTRAINTS. FASTER IS BETTER.
```

**If your estimate is 30 minutes and you finish in 15, report the actual time.**

These estimates represent:
- **Upper bounds** - actual time is often less
- **Typical execution** - based on industry benchmarks
- **Planning guidelines** - not rules to follow blindly

**Do NOT:**
- Pad estimates unnecessarily
- Treat estimates as hard limits
- Slow down to match estimates
- Use estimates as excuses for inefficiency

**DO:**
- Work as efficiently as possible
- Report actual time when done
- Use estimates for planning, not execution
- Optimize continuously - find faster ways

## The Iron Law

```
ALL TIMELINE ESTIMATES MUST USE AI EXECUTION HOURS, NOT HUMAN WEEKS
```

**Human timelines are for comparison purposes only and must be explicitly labeled.**

## Why This Matters

Research shows:
- AI agents can be 10-20x faster for well-scoped tasks
- But overhead exists: context loading, debugging, integration
- AI code has 1.7x more issues than human code (requires verification cycles)
- Simple tasks: dramatic speedup; complex tasks: more variable

**Optimistic estimates without evidence = planning failure.**

## Benchmarks from Industry Data

### Autonomous AI Agent Execution Times (2024-2025)

| Task Type | AI Time | Human Time | Speedup |
|-----------|---------|------------|---------|
| Security vulnerability fix | 1.5 min | 30 min | 20x |
| Well-scoped bug fix | 15-30 min | 2-4 hours | 8x |
| Configuration/setup | 5-15 min | 1-2 hours | 8x |
| Unit test generation | 10-20 min | 1-2 hours | 6x |
| Code migration (per file) | 3-4 hours total | 30-40 hours | 10x |
| Feature implementation | 2-12 hours | 1-2 days | 4-6x |
| Complex refactoring | 25-36 hours | 2-4 weeks | 10x |
| New service from scratch | 2-5 days | 4-8 weeks | 8x |

**Sources:** Devin benchmarks (Cognition AI), Cursor long-running agents, Claude Code autonomy research, METR study, SWE-Bench evaluations.

### Overhead Factors

AI agents have overhead that must be included:

| Overhead Category | Time Estimate |
|-------------------|---------------|
| Context loading (reading files) | 1-2 min per file, 5-10 min per project |
| Prompt engineering cycles | 5-15 min per complex task |
| Code review/verification | 10-30 min per component |
| Debugging failed tests | 5 min - 2 hours (varies widely) |
| Integration/merge conflicts | 15-60 min |
| Documentation | 10-30 min |

## Estimation Formula

```
AI_TOTAL_TIME = BASE_COMPLEXITY_TIME + OVERHEAD + VERIFICATION_CYCLES + BUFFER
```

### Base Complexity Estimates

| Complexity Level | AI Base Time | Example Tasks |
|------------------|--------------|---------------|
| Trivial | 15-30 min | Config change, typo fix, simple log statement |
| Small | 30 min - 2 hours | Single function, simple endpoint, unit tests |
| Medium | 2-6 hours | Feature with 3-5 components, API with CRUD |
| Large | 6-12 hours | Multi-service feature, complex business logic |
| Major | 1-3 days | New service, significant refactor, complex integration |
| Epic | 3-10 days | Platform migration, complete system redesign |

### Verification Cycle Multipliers

| Task Type | Verification Multiplier |
|-----------|------------------------|
| New feature | 1.5x base time |
| Bug fix | 1.3x base time |
| Refactoring | 1.4x base time |
| Security change | 1.6x base time |
| Infrastructure | 1.5x base time |
| Test generation | 1.2x base time |

**Why multipliers?** AI-generated code has ~1.7x more issues than human code (industry research). Verification cycles are essential.

### Buffer Recommendations

| Confidence Level | Buffer |
|------------------|--------|
| High confidence (similar task done before) | +10% |
| Medium confidence (familiar patterns) | +25% |
| Low confidence (novel/complex) | +50% |
| Unknown (research needed) | +100% |

## Task Type Heuristics

### Configuration & Setup
```
Config file change: 15-30 min
Docker/Kubernetes manifest: 30 min - 1 hour
CI/CD pipeline: 1-2 hours
Infrastructure as Code (Terraform/Pulumi): 2-4 hours
```

### Code Implementation
```
Single function/method: 15-45 min
CRUD endpoint: 30 min - 1 hour
Complex business logic: 1-3 hours
Service with 5+ endpoints: 3-6 hours
Full microservice: 6-12 hours
```

### Testing
```
Unit tests for one function: 10-20 min
Integration tests for endpoint: 20-45 min
Test suite for feature: 30 min - 1 hour
E2E test scenario: 1-2 hours
Load/performance test: 2-4 hours
```

### Security & Compliance
```
Security scan interpretation: 15-30 min
Vulnerability fix: 30 min - 2 hours
Security requirement analysis: 1-2 hours
Compliance audit: 2-4 hours
```

### Infrastructure & DevOps
```
Container build optimization: 30 min - 1 hour
Kubernetes deployment: 1-2 hours
Auto-scaling configuration: 1-2 hours
Monitoring/alerting setup: 2-4 hours
Multi-environment deployment: 4-8 hours
```

### Documentation
```
README update: 15-30 min
API documentation (one endpoint): 15-30 min
Architecture decision record: 30 min - 1 hour
Full service documentation: 2-4 hours
```

## Phase-Based Estimation

For project phases, use these baselines:

| Phase | AI Time Range | Human Time Range |
|-------|---------------|------------------|
| Requirements/Spec | 1-3 hours | 4-8 hours |
| Design/Architecture | 2-4 hours | 1-2 days |
| Core Implementation | 4-12 hours | 1-2 weeks |
| Testing | 2-6 hours | 2-5 days |
| Security Hardening | 2-6 hours | 2-5 days |
| Documentation | 1-3 hours | 4-8 hours |
| Deployment Setup | 2-6 hours | 1-3 days |
| Verification/Review | 1-4 hours | 4-8 hours |

## Example Calculations

### Example 1: New API Endpoint
```
Base (CRUD endpoint): 45 min
Validation logic: 30 min
Auth middleware: 30 min
Unit tests: 30 min
Integration tests: 45 min
Documentation: 15 min

Subtotal: 3 hours 15 min
Verification multiplier (new feature): 1.5x
Total: 4.9 hours (~5 hours)
```

### Example 2: Notification Service (from our test)
```
Phase 1 - Core Infrastructure: 6-8 hours
Phase 2 - Core Service Logic: 8-10 hours
Phase 3 - API Layer: 6-8 hours
Phase 4 - Channel Workers: 8-10 hours
Phase 5 - Security & Compliance: 6-8 hours
Phase 6 - Observability: 4-6 hours
Phase 7 - Deployment & Infra: 6-8 hours
Phase 8 - Testing: 6-8 hours (with AI test generation)
Phase 9 - Documentation: 2-3 hours

Subtotal: 52-69 hours
Buffer (high confidence): +10%
Total: 57-76 hours (~2.5-3 days)
```

### Example 3: Simple Bug Fix
```
Investigation: 15 min
Fix implementation: 15 min
Test reproduction: 10 min
Test for fix: 10 min
Verification: 10 min

Subtotal: 1 hour
Verification multiplier (bug fix): 1.3x
Total: 1.3 hours (~1.5 hours with buffer)
```

## Common Mistakes

| Mistake | Correct Approach |
|---------|------------------|
| "This is simple, 30 minutes" | Add verification cycles, buffer |
| "Same as human estimate divided by 10" | Use base + overhead formula |
| "No verification needed" | AI code has 1.7x more issues, always verify |
| "Skip the buffer" | Unknowns always exist, add buffer |
| "Copy from similar project" | Adjust for context, complexity |

## Red Flags

If you catch yourself thinking:
- "This should be quick" → It won't be. Add 50% buffer.
- "AI is faster than human" → Not always. Complex tasks vary.
- "I've done this before" → Different context adds overhead.
- "Just need to..." → Famous last words. Add contingency.

## Quick Reference Card

```
TRIVIAL tasks: 15-30 min + 10 min verification (upper bound)
SMALL tasks:   30min-2hrs + 30min verification (upper bound)
MEDIUM tasks:  2-6 hours + 1 hour verification (upper bound)
LARGE tasks:   6-12 hours + 2 hours verification (upper bound)
MAJOR tasks:   1-3 days + 4 hours verification (upper bound)
EPIC tasks:    3-10 days + 1 day verification (upper bound)

Always add: context loading (5-10 min/project)
Always add: debugging contingency (varies)
Always add: integration time (15-60 min/component)

REMEMBER: These are upper bounds. Work efficiently. Report actual time.
FASTER IS BETTER. Do not slow down to match estimates.
```

## Speedup Multipliers by Task Type

| Task Type | AI Speedup Factor | Why |
|-----------|------------------|-----|
| Boilerplate/scaffolding | 15-25x | AI excels at pattern repetition |
| Test generation | 10-15x | AI generates tests faster than humans write them |
| API implementation | 8-12x | Standard patterns, quick iteration |
| Security hardening | 6-10x | AI knows compliance patterns |
| Debugging own code | 5-8x | AI traces own logic efficiently |
| Complex business logic | 4-6x | Requires iteration, edge cases |
| Novel integrations | 3-5x | API learning curve affects AI too |
| Architecture decisions | 2-4x | AI assists but human judgment key |

**Use these to convert human estimates to AI estimates, or validate AI estimates make sense.**

## Spec Acceleration Factor

**Complete specifications reduce AI execution time by 65-105%** (less rework):

| Benefit | Time Savings | Reason |
|---------|--------------|--------|
| No ambiguity spiral | 20-30% | Specs eliminate "what did you mean?" cycles |
| Pre-identified gaps | 15-25% | Analysis phase catches issues early |
| Clear acceptance criteria | 10-15% | TDD targets are explicit |
| Security requirements known | 10-20% | No retroactive security fixes |
| Infrastructure defined | 10-15% | Skip infrastructure decisions |

**When specs exist, use optimistic estimates. When specs don't exist, use conservative estimates.**

## Estimation Output Format

Always present estimates with AI vs Human comparison:

```markdown
## Timeline Estimate

| Metric | Optimistic | Conservative | w/ Buffer |
|--------|------------|--------------|-----------|
| AI Execution Time | X-Y hours | X-Y hours | X-Y hours |
| Continuous Clock Time | X-Y days | X-Y days | X-Y days |
| Human Equivalent | X-Y days | X-Y days | X-Y days |
| Speedup Factor | 15-25x | 8-15x | 7-12x |
| Confidence | Medium | High | High |

### Optimistic Assumptions
- Complete specs exist
- No major blockers
- Standard patterns apply

### Conservative Assumptions
- Debugging cycles included
- Integration overhead included
- Standard verification time

### Human Equivalent Assumptions
- Senior engineer (5+ years)
- Familiar with tech stack
- Standard workday (8 hours)
- Includes code review, meetings, context switching
```

## Must Do Before Estimating

1. **Check this skill** - Read relevant task type heuristics
2. **Identify complexity** - Trivial/Small/Medium/Large/Major/Epic
3. **List components** - Break down into subtasks
4. **Add overhead** - Context, verification, integration
5. **Add buffer** - Based on confidence level
6. **Present as range** - Min/Max estimates, not single point

## Output Format

Always present estimates as:

```markdown
### AI Execution Timeline (Primary)

| Task | AI Estimate | Confidence | Notes |
|------|-------------|------------|-------|
| Phase 1 | 4-6 hours | High | Similar to previous work |
| Phase 2 | 6-10 hours | Medium | New integration pattern |
...

**Total AI Estimate:** X-Y hours (Z days)
**Buffer:** N% (reason)
**Confidence:** Level

### Human Timeline (Comparison Only)
> **NOTE:** This is for comparison purposes only and should NOT be used for planning.
Human estimate: X-Y weeks
```

---

## Trigger Contract

### Use this skill when
- The user asks for a timeline estimate for AI agent work
- The user needs to estimate how long an AI task will take
- The user is planning work that will be executed by an AI agent
- The user is converting human timeline estimates to AI estimates
- The user says "how long will this take", "estimate the timeline", "how long for AI to..."
- The user is creating a project plan involving AI execution

### Do NOT use this skill when
- The user is asking for human-only work estimates (use domain expertise)
- The user only wants comparison timelines (this is supplementary)
- The task is to estimate infrastructure provisioning time (use infrastructure skill)
- The task is purely conceptual/research with no execution timeline

### Inspect First
- Task complexity level based on descriptions provided
- Whether specs or requirements exist (affects estimate)
- Historical data from similar tasks (if available)

### Handoff To
- Any domain-specific skill when the task type is known (e.g., test-driven-development for testing tasks)
- systematic-debugging if estimate is for debugging work
- writing-plans if estimate is part of a larger planning exercise

### Stop Conditions
- If no task description is provided (need task to estimate)
- If the task is purely conceptual with no actionable scope

---

## When Not to Use

### Common Misactivation Scenarios

**Don't use for:**
- Pure human work estimation
- Infrastructure-only timelines (without AI execution)
- One-off questions about general AI capabilities (not estimation)
- Research queries about AI benchmarks (not task-specific)

### Alternative Skills

| Request | Use Instead |
|---------|-------------|
| "How long will this take?" (with AI task) | ai-timeline-estimation |
| "How long will a human take?" | Domain expertise or writing-plans |
| "What can AI do?" | No skill needed - explain directly |
| "Debug this issue" | systematic-debugging |
| "Write a test" | test-driven-development |

---

## Inputs

### Required Inputs
- Task description (what the AI will do)
- Task complexity assessment (or data to determine it)

### Optional Inputs
- Existing specifications or requirements
- Similar past tasks for reference
- Confidence level information
- Task type identification (configuration, implementation, testing, etc.)

### Input Formats
- Natural language descriptions
- Task breakdown lists
- Project phase information
- Any available specifications

---

## Output Contract

### Output Mode
- Text-based estimate presentation
- Markdown table format with ranges
- AI vs Human comparison (where applicable)

### Required Fields
- AI execution time estimate (as range)
- Confidence level (High/Medium/Low)
- Breakdown by components/phases if applicable
- Buffer recommendation with percentage

### Output Guarantees
| Guarantee | Required Artifact |
|-----------|-------------------|
| Time estimates use AI hours | All estimates in AI time units |
| Ranges provided | Not single-point estimates |
| Verification cycles included | Multiplier applied to base time |
| Buffer recommendations | Based on confidence level |
| Human comparison labeled | Clearly marked as "Comparison Only" |

### Validation Rules
- Estimates must be in AI execution hours
- Must include verification multipliers
- Must include buffer based on confidence
- Ranges must have min/max values
- Human timelines must be explicitly labeled

### Failure Output
- If no task description: "Please provide a task description for timeline estimation"
- If ambiguous scope: "The task scope appears ambiguous. Please provide more details about what the AI will accomplish."

---

## Risk and Safety Boundaries

### Risk Level
**low** — This skill provides estimation guidance; it does not execute actions or create files

### Trust Boundaries

| Boundary | Trust Level | Notes |
|----------|-------------|-------|
| User input | Untrusted | Validate task descriptions before estimating |
| Historical data | Trusted | Use for confidence adjustments |
| Benchmark sources | Trusted | Industry benchmarks from known research |

### Primary Risks

| Risk | Mitigation |
|------|------------|
| Overly optimistic estimates | Always require verification multiplier |
| Missing overhead factors | Require overhead calculation in formula |
| No buffer for unknowns | Require buffer based on confidence |

### Basic Safety Rules
1. Always apply verification multipliers (can't skip)
2. Always require buffer for unknowns
3. Always include context loading time
4. Always label human estimates as "comparison only"

---

## Failure Taxonomy

### Standard Failure Classes

| Class | Description | Resolution |
|-------|-------------|------------|
| missing_input | No task description provided | Request task description |
| ambiguous_scope | Task description too vague to estimate | Ask for more specific details |
| unsupported_task | Task type not covered by heuristics | Provide best-effort estimate based on complexity |

### Expected Failure Behavior

Every estimation should:
1. Identify task complexity level
2. Apply verification multiplier
3. Add buffer based on confidence
4. Present as range, not single point

### Minimum Failure Handling
- **missing_input**: Request task description with example format
- **ambiguous_scope**: Ask clarifying question about task scope
- **unsupported_task**: Provide best estimate based on general complexity, note limitation

---

## Minimal Context Rules

### Core Required Context

Before using this skill, the following must be known:

| Information | Source | Required |
|-------------|--------|----------|
| Task description | User input | Yes |
| Task complexity level | Derived from description | Yes |
| Task type | User input or derived | Yes |
| Whether specs exist | User input | Yes |

### Context Principle

Keep core context minimal: task description and complexity level are sufficient for basic estimation. Everything else (benchmarks, formulas, examples) can be loaded on demand.

### Always Load
- Name and description (frontmatter)
- Core estimation formula
- Verification multipliers table
- Buffer recommendations

### Load On Demand
- Detailed benchmarks
- Task type heuristics
- Example calculations
- Phase-based estimation tables

---

## Minimum Observability

### Required Logging

| Event | Description |
|-------|-------------|
| **Trigger** | When estimation skill is invoked |
| **Estimation** | When a timeline estimate is provided |
| **Failure** | When estimation cannot be completed |

### Logging Format

Optional. Skills may use simple text logs or framework-native logging.

---

## Version Metadata

| Field | Value | Purpose |
|-------|-------|---------|
| version | 1.1.0 | Semantic version |
| deprecated | false | Current version is active |
| replaced_by | null | No replacement skill |
| skill_schema_version | 1 | Schema version identifier |

### Versioning Rules
- Use semantic versioning
- Increment PATCH for safe internal fixes
- Increment MINOR for backward-compatible enhancements
- Increment MAJOR for breaking structural changes

---

*Based on industry benchmarks from: Devin (Cognition AI), Cursor long-running agents, Claude Code autonomy research, METR study, SWE-Bench evaluations, GitHub Copilot studies, DORA reports 2024-2025.*