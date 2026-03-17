---
name: executing-plans
description: Use when you have a written implementation plan to execute in a separate session with review checkpoints. Track actual time vs estimated time for future accuracy.
version: 1.1.0
skill_schema_version: 1
deprecated: false
replaced_by: null
minimum_openclaw_version: "1.0.0"
supported_models:
  - general
preferred_model_traits:
  - strong planning
  - task execution
required_tools: []
optional_tools:
  - exec
  - read
  - write
risk_level: low
---

## Purpose

Executes pre-written implementation plans with timeline tracking and review checkpoints. Designed for implementing plans created by writing-plans skill in isolated git worktree environments. Tracks actual vs estimated time to improve future estimation accuracy.

## Trigger Contract

### Use this skill when
- User has a written implementation plan to execute
- Plan contains discrete tasks with estimated durations
- User requests plan execution with timeline tracking
- User mentions following plan steps or roadmap
- Task involves executing a previously created plan

### Do NOT use this skill when
- User is asking to create a new plan (use writing-plans)
- User wants to view or discuss an existing plan
- Task is to write code without a plan
- User wants to estimate timeline (use ai-timeline-estimation)
- Plan execution is complete and needs finishing (use finishing-a-development-branch)

### Inspect First
- Check if plan file exists and is readable
- Verify using-git-worktrees skill is available
- Confirm subagent support availability (prefer subagent-driven-development if available)

### Handoff To
- **superpowers:subagent-driven-development** - If subagent support is available
- **superpowers:writing-plans** - If plan needs creation
- **superpowers:finishing-a-development-branch** - When all tasks complete
- **superpowers:using-git-worktrees** - For isolated workspace setup

### Stop Conditions
- Plan file cannot be found or read
- Critical gaps in plan prevent execution
- Blocker encountered that requires human input
- Verification failures that cannot be resolved
- User explicitly stops execution

## When Not to Use

### Common Misactivation Scenarios

**Don't use for:**
- Creating new plans (use writing-plans)
- Viewing/discussing plans without execution
- Debugging or fixing issues (use systematic-debugging)
- Writing tests (use test-driven-development)
- Requesting code reviews (use requesting-code-review)

### Alternative Skills

| Request | Use Instead |
|---------|-------------|
| "Write a plan" | writing-plans |
| "Create implementation steps" | writing-plans |
| "Show me the plan" | (no skill needed - just respond) |
| "Estimate how long this will take" | ai-timeline-estimation |
| "Help me debug this" | systematic-debugging |
| "Write tests for this" | test-driven-development |
| "Get code review" | requesting-code-review |

## Inputs

### Required Inputs
- Plan file or plan content (path or text)
- List of tasks with estimated durations

### Optional Inputs
- Preferred workspace location (defaults to git worktree)
- Task priority or ordering preferences
- Specific verification methods to use

### Input Formats
- File path to markdown/JSON/YAML plan
- Copy-pasted plan text
- Plan stored in clipboard or passed as argument

## Output Contract

### Output Mode
- Sequential task execution with progress updates
- Timeline tracking table showing estimated vs actual time
- Completion report for each task
- Handoff to finishing-a-development-branch skill

### Required Fields
- Skill announcement at start ("I'm using the executing-plans skill")
- Plan review findings before execution
- Todo/tickler tracking for all tasks
- Timeline tracking table (Est. Time, Start, End, Actual, Notes)
- Task completion messages
- Handoff to finishing-a-development-branch at end

### Output Guarantees
| Guarantee | Required Artifact |
|-----------|-------------------|
| Timeline Tracking | Table with estimated vs actual time per task |
| Completion Reporting | Report after each task with status |
| Safe Handoff | Calls finishing-a-development-branch at end |
| Git Worktree Usage | References using-git-worktrees for isolation |

### Validation Rules
- Must announce skill usage at start
- Must review plan before execution
- Must create task tracking (TodoWrite)
- Must report actual time per task
- Must stop on blockers
- Must invoke finishing skill at completion

### Failure Output
Return concise blocked status with:
- reason (specific blocker)
- location (which task/step)
- safe next step (how to proceed)

## Risk and Safety Boundaries

### Risk Level
**low** - Executes pre-approved plans, no destructive operations

### Trust Boundaries

| Boundary | Trust Level | Notes |
|----------|-------------|-------|
| Plan content | Untrusted | Review critically before execution |
| User input | Untrusted | Validate all task instructions |
| Workspace files | Trusted | Only modify files in designated workspace |
| External references | Untrusted | Verify all external links/dependencies |

### Primary Risks

| Risk | Mitigation |
|------|------------|
| Plan has errors | Review critically, raise concerns before starting |
| Execution on wrong branch | Verify branch setup, warn about main/master |
| Skipping verifications | Mandate verification steps per task |
| Missing dependencies | Check before starting each task |
| Timeline misestimation | Track actual time for future improvement |

### Basic Safety Rules
1. Always review plan critically before starting
2. Never execute on main/master without explicit user consent
3. Stop and ask when encountering blockers
4. Run all verification steps as specified
5. Track and report timeline discrepancies

## Failure Taxonomy

### Standard Failure Classes

| Class | Description | Resolution |
|-------|-------------|------------|
| missing_input | Plan file or content not provided | Request plan location or content |
| plan_unreadable | Plan file cannot be parsed | Request correct plan format |
| ambiguous_trigger | Task instructions unclear | Ask for clarification |
| execution_blocked | Blocker prevents progress | Stop and request human input |
| verification_failed | Task verification fails | Attempt fix or escalate |
| tool_unavailable | Required tool missing | Use available alternative |

### Expected Failure Behavior

Every plan execution should:
1. Classify failures using standard taxonomy
2. Explain the specific blocker in user-friendly terms
3. Return safe next step
4. Never proceed past blockers without resolution

### Minimum Failure Handling
- **missing_input**: Request plan location with example format
- **plan_unreadable**: Ask for reformatting or clarification
- **ambiguous_trigger**: Ask clarifying question
- **execution_blocked**: Stop immediately, describe blocker, request input
- **verification_failed**: Attempt fix once, then escalate if unresolved

## Minimal Context Rules

### Core Required Context

| Information | Source | Required |
|-------------|--------|----------|
| Skill name and description | Frontmatter | Yes |
| When to use / not use | Trigger Contract section | Yes |
| Safety constraints | Risk Level + Risk/Safety Boundaries | Yes |
| Expected outputs | Output Contract section | Yes |
| Plan content | User input or file | Yes |

### Context Principle

Keep core context minimal (under 500 words). Execution details, timeline tracking methods, and edge case handling belong in:
- Reference files (for detailed procedures)
- The plan itself being executed

### Always Load
- Name and description (frontmatter)
- Trigger rules (Use/Don't Use sections)
- Safety constraints
- Output contract

### Load On Demand
- Git worktree setup details (from using-git-worktrees)
- Finishing workflow (from finishing-a-development-branch)
- Plan-specific verification methods

## Minimum Observability

### Required Logging

| Event | Description |
|-------|-------------|
| **Initialization** | Skill triggered, announcing usage |
| **Plan Review** | Plan loaded, key findings or concerns |
| **Task Start** | Starting execution of specific task |
| **Task Complete** | Task finished with actual time |
| **Blocker** | Encountered blocker requiring input |
| **Completion** | All tasks done, handing off to finishing |
| **Failure** | Any error or failure condition |

### Logging Format

Logging format is **optional**. Skills may use:
- Simple text logs
- Structured JSON format
- Framework-native logging

Example log entry:
```
[executing-plans] Task 3 started at 14:30
[executing-plans] Task 3 complete at 14:55 (Est: 30min, Actual: 25min)
```

## Version Metadata

| Field | Value | Purpose |
|-------|-------|---------|
| version | 1.1.0 | Current semantic version |
| deprecated | false | Whether skill is deprecated |
| replaced_by | null | Replacement skill if deprecated |
| skill_schema_version | 1 | Schema version |
| minimum_openclaw_version | 1.0.0 | Minimum required version |

---

# Existing Content (Preserved)

## Overview

Load plan, review critically, execute all tasks, report when complete.

**Announce at start:** "I'm using the executing-plans skill to implement this plan."

**Note:** Tell your human partner that Superpowers works much better with access to subagents. The quality of its work will be significantly higher if run on a platform with subagent support (such as Claude Code or Codex). If subagents are available, use superpowers:subagent-driven-development instead of this skill.

## The Process

### Step 1: Load and Review Plan
1. Read plan file
2. Review critically - identify any questions or concerns about the plan
3. If concerns: Raise them with your human partner before starting
4. If no concerns: Create TodoWrite and proceed

### Step 2: Execute Tasks

For each task:
1. Mark as in_progress
2. Follow each step exactly (plan has bite-sized steps)
3. Run verifications as specified
4. Mark as completed

### Step 3: Complete Development

After all tasks complete and verified:
- Announce: "I'm using the finishing-a-development-branch skill to complete this work."
- **REQUIRED SUB-SKILL:** Use superpowers:finishing-a-development-branch
- Follow that skill to verify tests, present options, execute choice

## When to Stop and Ask for Help

**STOP executing immediately when:**
- Hit a blocker (missing dependency, test fails, instruction unclear)
- Plan has critical gaps preventing starting
- You don't understand an instruction
- Verification fails repeatedly

**Ask for clarification rather than guessing.**

## When to Revisit Earlier Steps

**Return to Review (Step 1) when:**
- Partner updates the plan based on your feedback
- Fundamental approach needs rethinking

**Don't force through blockers** - stop and ask.

## Timeline Tracking During Execution

Track actual time vs estimated time to improve future estimates:

| Task | Est. Time | Start | End | Actual | Notes |
|------|-----------|-------|-----|--------|-------|
| Task 1 | 30 min | HH:MM | HH:MM | XX min | What happened |
| Task 2 | 45 min | HH:MM | HH:MM | XX min | ... |

**Report after each task:**
> "Task X complete. Estimated 30 min, actual 25 min. [Brief status]"

**If actual significantly exceeds estimate, note why:**
- Unexpected complexity
- Missing dependencies
- Debugging required
- Context switching overhead

**This data improves `ai-timeline-estimation` accuracy over time.**

## Remember
- Review plan critically first
- Follow plan steps exactly
- Don't skip verifications
- Reference skills when plan says to
- Stop when blocked, don't guess
- Never start implementation on main/master branch without explicit user consent

## Integration

**Required workflow skills:**
- **superpowers:using-git-worktrees** - REQUIRED: Set up isolated workspace before starting
- **superpowers:writing-plans** - Creates the plan this skill executes
- **superpowers:finishing-a-development-branch** - Complete development after all tasks