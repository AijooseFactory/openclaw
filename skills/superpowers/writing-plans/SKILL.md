---
name: writing-plans
description: Use when you have a spec or requirements for a multi-step task, before touching code. ALWAYS invoke `ai-timeline-estimation` skill before creating any timeline estimates. Uses realistic AI execution hours, not human weeks.
version: 1.1.0
skill_schema_version: 1
deprecated: false
replaced_by: null
minimum_openclaw_version: "1.0.0"
supported_models:
  - general
preferred_model_traits:
  - strong planning
  - documentation
required_tools: []
optional_tools:
  - write
  - read
risk_level: low
---

# Writing Plans

## Purpose

Write comprehensive implementation plans assuming the engineer has zero context for our codebase and questionable taste. Document everything they need to know: which files to touch for each task, code, testing, docs they might need to check, how to test it. Give them the whole plan as bite-sized tasks. DRY. YAGNI. TDD. Frequent commits.

Assume they are a skilled developer, but know almost nothing about our toolset or problem domain. Assume they don't know good test design very well.

**Announce at start:** "I'm using the writing-plans skill to create the implementation plan."

**Context:** This should be run in a dedicated worktree (created by brainstorming skill).

**Save plans to:** `docs/superpowers/plans/YYYY-MM-DD-<feature-name>.md`
- (User preferences for plan location override this default)

## Trigger Contract

### Use this skill when
- You have a spec or requirements for a multi-step task
- You need to create an implementation plan before touching code
- The user provides a feature specification that needs to be decomposed into executable tasks

### Do NOT use this skill when
- The spec is too vague to create actionable tasks
- The task is a single simple operation that doesn't require a plan
- The user only wants code written immediately without planning
- There's no spec or requirements document available

### Inspect First
- The spec or requirements document
- Existing codebase structure and patterns
- Any relevant skills referenced in the plan (@ syntax)

### Handoff To
- `superpowers:subagent-driven-development` for execution (if subagents available)
- `superpowers:executing-plans` for execution (if no subagents available)
- `superpowers:brainstorming` for initial spec creation
- `ai-timeline-estimation` for timeline estimates (REQUIRED before creating estimates)

### Stop Conditions
- Missing or incomplete spec that prevents task decomposition
- Spec covers multiple independent subsystems that should be separate plans

## When Not to Use

### Common Misactivation Scenarios

**Don't use for:**
- Simple one-off tasks that don't need a detailed plan
- Bug fixes that only require a single change
- Tasks already broken down into sub-tasks by the user
- Writing documentation without implementation

### Alternative Skills

| Request | Use Instead |
|---------|-------------|
| "Create a spec" | brainstorming skill |
| "Just write the code" | executing-plans skill |
| "Debug this issue" | systematic debugging skill |
| "Review this plan" | plan-document-reviewer subagent |

## Inputs

### Required Inputs
- Spec or requirements document (file path or content)
- Feature/project name

### Optional Inputs
- Target file paths (if known)
- User preferences for plan location
- Reference to relevant skills (@ syntax for later reference)

### Input Formats
- Markdown specification document
- Text description of requirements
- Link to external specification

## Output Contract

### Output Mode
- File artifact: Implementation plan document (Markdown)
- Structure: Bite-sized tasks with step-by-step instructions

### Required Output Structure

**Plan Document Header:**
```markdown
# [Feature Name] Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** [One sentence describing what this builds]

**Architecture:** [2-3 sentences about approach]

**Tech Stack:** [Key technologies/libraries]

---
```

**Task Structure:**
```markdown
### Task N: [Component Name]

**Files:**
- Create: `exact/path/to/file.py`
- Modify: `exact/path/to/existing.py:123-145`
- Test: `tests/exact/path/to/test.py`

- [ ] **Step 1: Write the failing test**

```python
def test_specific_behavior():
    result = function(input)
    assert result == expected
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pytest tests/path/test.py::test_name -v`
Expected: FAIL with "function not defined"

- [ ] **Step 3: Write minimal implementation**

```python
def function(input):
    return expected
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pytest tests/path/test.py::test_name -v`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add tests/path/test.py src/path/file.py
git commit -m "feat: add specific feature"
```
```

### File Structure Section
- Map out files to be created or modified
- Design units with clear boundaries and well-defined interfaces
- Each file has one clear responsibility

### AI Execution Timelines
- Use hours not weeks (AI execution, not human)
- Small task: 1-2 hours
- Medium task: 3-6 hours
- Large task: 1-2 days
- Include milestone table with estimates

### Plan Review Loop
- Chunk plan into logical sections (≤1000 lines each)
- Use `## Chunk N: <name>` headings
- Review each chunk with plan-document-reviewer subagent
- Iterate until approved, max 5 iterations before human handoff

### Validation Rules
- All file paths must be exact
- All code examples must be complete
- All commands must include expected output
- Tasks must use TDD approach (test first)

### Failure Output
If plan cannot be created:
- Missing spec: Request the spec document first
- Incomplete requirements: Ask for clarification
- Scope too large: Suggest breaking into sub-project specs

## Risk and Safety Boundaries

**Risk Level:** low

This skill creates documentation files only. No destructive operations.

### Trust Boundaries

| Boundary | Trust Level | Notes |
|----------|-------------|-------|
| User-provided spec | Untrusted | Validate before planning |
| File paths in plan | Trusted | Use exact paths, validate format |
| External links | Untrusted | Don't auto-fetch URLs |
| Code examples | Trusted | Provide complete, safe code |

### Primary Risks

| Risk | Mitigation |
|------|------------|
| Incomplete specification | Request clarification before planning |
| Overly complex tasks | Suggest breaking into sub-plans |
| Invalid file paths | Use exact path format, warn if uncertain |

### Basic Safety Rules
1. Save plans to designated plans directory
2. Include validation that spec exists before starting
3. Warn if spec covers multiple subsystems

## Failure Taxonomy

### Standard Failure Classes

| Class | Description | Resolution |
|-------|-------------|------------|
| missing_input | Spec or requirements not provided | Request spec document |
| ambiguous_spec | Requirements unclear for task decomposition | Ask clarifying questions |
| scope_too_large | Spec covers multiple subsystems | Suggest separating into sub-plans |
| unsupported_request | Request not appropriate for planning | Handoff to appropriate skill |
| validation_failure | Output fails format requirements | Fix specific validation errors |

### Expected Failure Behavior
- Classify failure using standard taxonomy
- Explain blocker in user-friendly terms
- Return safe next step
- Never pretend to succeed if spec is missing

## Minimal Context Rules

### Core Required Context

| Information | Source | Required |
|-------------|--------|----------|
| Skill name and description | Frontmatter | Yes |
| When to use / not use | Trigger Contract section | Yes |
| Expected output format | Output Contract section | Yes |
| Spec or requirements | User input | Yes |

### Context Principle
Keep core context minimal. Before writing a plan:
1. Ensure spec is complete
2. Understand scope boundaries
3. Identify file structure

## Minimum Observability

### Required Logging

| Event | Description |
|-------|-------------|
| **Trigger** | When plan creation starts |
| **Action** | Plan saved to file |
| **Failure** | Any error creating the plan |

### Logging Format
Plain text format is acceptable for this skill.

## Additional Guidance

### Scope Check
If the spec covers multiple independent subsystems, it should have been broken into sub-project specs during brainstorming. If it wasn't, suggest breaking this into separate plans — one per subsystem. Each plan should produce working, testable software on its own.

### Bite-Sized Task Granularity

**Each step is one action (AI execution: 30 seconds - 2 minutes):**
- "Write the failing test" - step
- "Run it to make sure it fails" - step
- "Implement the minimal code to make the test pass" - step
- "Run the tests and make sure they pass" - step
- "Commit" - step

### Plan Review Loop

After completing each chunk of the plan:

1. Dispatch plan-document-reviewer subagent (see plan-document-reviewer-prompt.md) with precisely crafted review context — never your session history. This keeps the reviewer focused on the plan, not your thought process.
   - Provide: chunk content, path to spec document
2. If ❌ Issues Found:
   - Fix the issues in the chunk
   - Re-dispatch reviewer for that chunk
   - Repeat until ✅ Approved
3. If ✅ Approved: proceed to next chunk (or execution handoff if last chunk)

**Chunk boundaries:** Use `## Chunk N: <name>` headings to delimit chunks. Each chunk should be ≤1000 lines and logically self-contained.

**Review loop guidance:**
- Same agent that wrote the plan fixes it (preserves context)
- If loop exceeds 5 iterations, surface to human for guidance
- Reviewers are advisory - explain disagreements if you believe feedback is incorrect

### Execution Handoff

After saving the plan:

**"Plan complete and saved to `docs/superpowers/plans/<filename>.md`. Ready to execute?"**

**Execution path depends on harness capabilities:**

**If harness has subagents (Claude Code, etc.):**
- **REQUIRED:** Use superpowers:subagent-driven-development
- Do NOT offer a choice - subagent-driven is the standard approach
- Fresh subagent per task + two-stage review

**If harness does NOT have subagents:**
- Execute plan in current session using superpowers:executing-plans
- Batch execution with checkpoints for review

## Remember
- Exact file paths always
- Complete code in plan (not "add validation")
- Exact commands with expected output
- Reference relevant skills with @ syntax
- DRY, YAGNI, TDD, frequent commits