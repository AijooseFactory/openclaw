---
name: requesting-code-review
description: Use when completing tasks, implementing major features, or before merging to verify work meets requirements
version: 1.1.0
skill_schema_version: 1
deprecated: false
replaced_by: null
minimum_openclaw_version: "1.0.0"
supported_models:
  - general
preferred_model_traits:
  - strong communication
  - code review
required_tools: []
optional_tools:
  - read
risk_level: low
---

# Requesting Code Review

## Purpose

Dispatch superpowers:code-reviewer subagent to catch issues before they cascade. The reviewer gets precisely crafted context for evaluation — never your session's history. This keeps the reviewer focused on the work product, not your thought process, and preserves your own context for continued work.

**Core principle:** Review early, review often.

This skill enables systematic code review at key points in the development workflow, catching defects and improvements before they compound.

## Trigger Contract

### Use this skill when
- The user asks for code review or says "review this code"
- Completing a subagent task in task-driven development
- Finishing a major feature implementation
- Before merging to main/production branch
- When stuck and needs fresh perspective
- Before refactoring (as a baseline check)
- After fixing a complex bug (to verify the fix)

### Do NOT use this skill when
- The user explicitly says not to request review
- Code is clearly a work-in-progress / not ready for review
- The change is trivial (typos, formatting only)
- There's no git history to diff against
- The task is purely exploratory or research

### Inspect First
- Whether there are changes to review (git diff)
- The context template at code-reviewer.md
- What the original requirements/plan was

### Handoff To
- superpowers:code-reviewer - The actual reviewer subagent

### Stop Conditions
- No changes to review (empty diff)
- Invalid git SHAs provided
- Unable to determine what was implemented

## When Not to Use

### Common Misactivation Scenarios

**Don't use for:**
- Trivial changes (typos, whitespace, documentation fixes)
- Work-in-progress that isn't ready for review
- Exploratory code not intended for production
- When user explicitly skips review (user knows better)

### Alternative Approaches

| Request | Use Instead |
|---------|-------------|
| "Just fix it quickly" | Skip review if user insists |
| "I want to understand this code" | No skill needed - just explain |
| "Run tests" | Test execution skill |
| "Debug this issue" | Debugging skill |

## Inputs

### Required Inputs
- `{WHAT_WAS_IMPLEMENTED}` - Description of what was built/fixed
- `{PLAN_OR_REQUIREMENTS}` - The original plan or requirements
- `{BASE_SHA}` - Starting git commit SHA to diff from
- `{HEAD_SHA}` - Ending git commit SHA to diff to
- `{DESCRIPTION}` - Brief summary of changes

### Optional Inputs
- Additional context about edge cases considered
- Specific areas of concern to focus on
- Prior review feedback that was addressed

### Input Formats
- Natural language descriptions
- Git SHA references (full or short)
- Template placeholders from code-reviewer.md

## Output Contract

### Output Mode
- Subagent dispatch to superpowers:code-reviewer
- Review results returned as structured feedback

### Required Output Fields
- Strengths identified
- Issues categorized by severity (Critical/Important/Minor)
- Assessment: Ready to merge / With fixes / Not ready
- Clear reasoning for verdict

### Output Guarantees
- Review covers all changed files in the git range
- Issues are specific (file:line references)
- Each issue explains WHY it matters
- Clear verdict with technical reasoning
- Strengths acknowledged

### Failure Output
If review cannot complete:
- reason: What blocked the review
- missing_inputs: What's needed
- safe_next_step: How to proceed

## Risk and Safety Boundaries

**Risk Level:** low - This skill requests review, does not modify code

### Trust Boundaries

| Boundary | Trust Level | Notes |
|----------|-------------|-------|
| User request | Trusted | User knows when they want review |
| Git SHAs | Trusted | Local git operations |
| Template inputs | Trusted | User provides implementation details |
| Reviewer output | Trusted | Subagent provides structured feedback |

### Primary Risks

| Risk | Mitigation |
|------|------------|
| Wrong git range | Validate SHAs exist in repo |
| Empty diff | Stop condition - nothing to review |
| Reviewer unavailable | Fail gracefully, suggest manual review |

### Basic Safety Rules
1. Only dispatch when there are actual changes to review
2. Validate git SHAs before passing to subagent
3. Preserve user's context (don't pass session history to reviewer)
4. Accept and act on review feedback appropriately

## Failure Taxonomy

### Standard Failure Classes

| Class | Description | Resolution |
|-------|-------------|------------|
| missing_input | Required template field not provided | Request missing input from user |
| invalid_sha | Git SHA doesn't exist | Validate with `git log` |
| empty_diff | No changes in git range | Skip review, explain why |
| subagent_unavailable | Reviewer subagent can't run | Request manual review |
| reviewer_error | Reviewer failed to complete | Log error, attempt retry once |

### Expected Failure Behavior
1. Classify the failure using standard taxonomy
2. Explain the specific blocker
3. Provide safe next step (manual review if needed)

### Minimum Failure Handling
- **missing_input**: Request missing template field
- **invalid_sha**: Show `git log --oneline` for valid SHAs
- **empty_diff**: Explain no changes to review, skip
- **subagent_unavailable**: Suggest manual review

## Minimal Context Rules

### Core Required Context

Before using this skill, the following must be known:

| Information | Source | Required |
|-------------|--------|----------|
| Skill name and description | Frontmatter | Yes |
| When to use / not use | Trigger Contract section | Yes |
| Expected outputs | Output Contract section | Yes |
| Code changes to review | Git diff | Yes |
| What was implemented | Template placeholder | Yes |

### Context Principle

This skill is lightweight:
- Core context size: ~200 words
- Only activate when there are actual changes to review
- Don't pass session history to reviewer subagent
- Keep reviewer focused on code, not conversation context

## Version Metadata

### Current Version
- **version:** 1.1.0
- **skill_schema_version:** 1
- **deprecated:** false

### Version History

See CHANGELOG.md for complete version history.

### Versioning Rules
- Use semantic versioning
- Increment PATCH for bug fixes
- Increment MINOR for new features
- Increment MAJOR for structural changes

---

## How to Request Review

**1. Get git SHAs:**
```bash
BASE_SHA=$(git rev-parse HEAD~1)  # or origin/main
HEAD_SHA=$(git rev-parse HEAD)
```

**2. Dispatch code-reviewer subagent:**

Use Task tool with superpowers:code-reviewer type, fill template at `code-reviewer.md`

**Placeholders:**
- `{WHAT_WAS_IMPLEMENTED}` - What you just built
- `{PLAN_OR_REQUIREMENTS}` - What it should do
- `{BASE_SHA}` - Starting commit
- `{HEAD_SHA}` - Ending commit
- `{DESCRIPTION}` - Brief summary

**3. Act on feedback:**
- Fix Critical issues immediately
- Fix Important issues before proceeding
- Note Minor issues for later
- Push back if reviewer is wrong (with reasoning)

## When to Request Review

**Mandatory:**
- After each task in subagent-driven development
- After completing major feature
- Before merge to main

**Optional but valuable:**
- When stuck (fresh perspective)
- Before refactoring (baseline check)
- After fixing complex bug

## Example

```
[Just completed Task 2: Add verification function]

You: Let me request code review before proceeding.

BASE_SHA=$(git log --oneline | grep "Task 1" | head -1 | awk '{print $1}')
HEAD_SHA=$(git rev-parse HEAD)

[Dispatch superpowers:code-reviewer subagent]
  WHAT_WAS_IMPLEMENTED: Verification and repair functions for conversation index
  PLAN_OR_REQUIREMENTS: Task 2 from docs/superpowers/plans/deployment-plan.md
  BASE_SHA: a7981ec
  HEAD_SHA: 3df7661
  DESCRIPTION: Added verifyIndex() and repairIndex() with 4 issue types

[Subagent returns]:
  Strengths: Clean architecture, real tests
  Issues:
    Important: Missing progress indicators
    Minor: Magic number (100) for reporting interval
  Assessment: Ready to proceed

You: [Fix progress indicators]
[Continue to Task 3]
```

## Integration with Workflows

**Subagent-Driven Development:**
- Review after EACH task
- Catch issues before they compound
- Fix before moving to next task

**Executing Plans:**
- Review after each batch (3 tasks)
- Get feedback, apply, continue

**Ad-Hoc Development:**
- Review before merge
- Review when stuck

## Red Flags

**Never:**
- Skip review because "it's simple"
- Ignore Critical issues
- Proceed with unfixed Important issues
- Argue with valid technical feedback

**If reviewer wrong:**
- Push back with technical reasoning
- Show code/tests that prove it works
- Request clarification

## Template Reference

The review template is located at: `code-reviewer.md`

This template provides:
- Review checklist (code quality, architecture, testing, requirements)
- Output format with severity categories
- Critical rules for effective reviews
- Example output for reference