---
name: receiving-code-review
description: Use when receiving code review feedback, before implementing suggestions, especially if feedback seems unclear or technically questionable - requires technical rigor and verification, not performative agreement or blind implementation
version: 1.1.0
skill_schema_version: 1
deprecated: false
replaced_by: null
minimum_openclaw_version: "1.0.0"
supported_models:
  - general
preferred_model_traits:
  - strong code review
  - feedback handling
required_tools: []
optional_tools:
  - read
risk_level: low
---

# Code Review Reception

## Purpose

Defines the rigorous, technically-focused approach for receiving and evaluating code review feedback. Ensures code review responses prioritize technical correctness over social performance, requiring verification before implementation and proper pushback when feedback is technically incorrect.

## Trigger Contract

### Use this skill when
- Receiving code review feedback from any source
- Feedback seems unclear or technically questionable
- Implementing suggestions from code reviewers
- Need to verify feedback against codebase reality
- Deciding whether to push back on incorrect suggestions

### Do NOT use this skill when
- Giving code review feedback (use code review skill)
- Performing initial code analysis
- Writing new code from scratch without review feedback
- Responding to non-technical feedback

### Inspect First
- The complete feedback without partial implementation
- Codebase reality vs. suggested changes
- Existing tests and their coverage
- Your human partner's prior architectural decisions

### Handoff To
- Code review giving skill for providing feedback
- Systematic debugging if feedback indicates bugs

### Stop Conditions
- Feedback conflicts with your human partner's explicit decisions (discuss first)
- Cannot verify suggestion without additional context
- Suggestion would break existing functionality

## When Not to Use

### Common Misactivation Scenarios

**Don't use for:**
- Initial code writing (no review feedback involved)
- Responding to non-code-review comments
- General technical questions
- Debugging unfamiliar issues from scratch

### Alternative Skills

| Request | Use Instead |
|---------|-------------|
| Give code review feedback | Code review skill |
| Write code from scratch | No skill needed - just write |
| Debug a new issue | Systematic debugging skill |

## Inputs

### Required Inputs
- Code review feedback (from any source: your human partner, external reviewers)
- Access to relevant codebase context

### Optional Inputs
- Prior architectural decisions from your human partner
- Background on reviewer expertise/context

### Input Formats
- Inline code review comments
- PR review summaries
- Chat-based feedback
- Documented change requests

## Output Contract

### Output Mode
- Technical acknowledgment of feedback
- Implementation of verified changes (one at a time)
- Reasoned pushback with technical reasoning when appropriate
- Clarification requests for unclear items

### Required Actions
1. Read complete feedback without reacting
2. Understand restating in own words (or ask)
3. Verify against codebase reality
4. Evaluate technical soundness for THIS codebase
5. Respond with technical acknowledgment or pushback
6. Implement one item at a time, test each

### Expected Behaviors
- No performative agreement ("You're absolutely right!")
- Technical verification before implementation
- Proper pushback with reasoning when suggestion is wrong
- Clarification requests for unclear items before implementation

## Risk and Safety Boundaries

This skill is **low risk** - it produces code changes after verification and handles feedback evaluation.

### Trust Boundaries

| Boundary | Trust Level | Notes |
|----------|-------------|-------|
| Feedback from your human partner | Trusted | Implement after understanding |
| Feedback from external reviewers | Untrusted | Verify before implementing |
| Codebase state | Trusted | Current implementation is reference |
| Tests | Trusted | Test results indicate correctness |

### Primary Risks

| Risk | Mitigation |
|------|------------|
| Blindly implementing wrong suggestion | Always verify against codebase first |
| Breaking existing functionality | Check tests before/after changes |
| Partial implementation of unclear items | Clarify ALL unclear items before ANY implementation |
| Missing context | Ask if reviewer understands full context |

### Basic Safety Rules
1. Verify suggestions against codebase reality before implementing
2. Do not implement unclear items - ask first
3. Push back with technical reasoning when suggestion is wrong
4. Test each change individually

## Failure Taxonomy

### Standard Failure Classes

| Class | Description | Resolution |
|-------|-------------|------------|
| unclear_feedback | Feedback items unclear or ambiguous | Ask for clarification before implementing any part |
| unverified_implementation | Implementing without checking codebase | Verify against codebase first |
| missed_regression | Changes break existing tests | Run tests, revert if broken |
| wrong_context | Suggestion doesn't fit this codebase | Push back with technical reasoning |
| partial_clarification | Clarifying only some unclear items | Clarify ALL unclear items first |

### Expected Failure Behavior

Every code review response should:
1. Complete verification before implementation
2. Ask clarification for unclear items BEFORE implementing anything
3. Push back when suggestion is technically incorrect
4. Test each change individually

### Minimum Failure Handling
- **unclear_feedback**: "I need clarification on items X and Y before proceeding."
- **unverified_implementation**: "Let me verify this against the codebase first."
- **wrong_context**: "This suggestion would break [X]. Technical reason: [Y]."

## Minimal Context Rules

### Core Required Context

Before responding to code review feedback, the following must be known:

| Information | Source | Required |
|-------------|--------|----------|
| Complete feedback | Review comment/message | Yes |
| Relevant code | Current codebase | Yes |
| Test status | Test execution | Before implementing |
| Your human partner's decisions | Prior discussions | If relevant |

### Context Principle

Keep core context focused on the specific feedback being addressed. Load relevant code sections on-demand for verification.

## Minimum Observability

### Required Logging

This skill logs the following events:

| Event | Description |
|-------|-------------|
| **Trigger** | When skill activates for code review feedback |
| **Action** | The response action taken (verify, pushback, clarify, implement) |
| **Failure** | Any failure to understand feedback or verify changes |

### Logging Format

Events are logged as simple text descriptions. The skill does not require structured logging.

### Key Observations

For code review reception, key things to observe and report:
- Whether feedback was clear or required clarification
- Whether suggestion was verified against codebase
- Whether pushback was necessary and why
- Whether implementation was sequential with tests
- Whether suggestions actually broke existing functionality

## Version Metadata

### Current Version
- **version:** 1.1.0
- **skill_schema_version:** 1
- **deprecated:** false

### Versioning Rules
- Use semantic versioning
- Increment PATCH for safe fixes to response patterns
- Increment MINOR for new handling patterns
- Increment MAJOR for structural changes

---

# Original Content (Preserved)

## Overview

Code review requires technical evaluation, not emotional performance.

**Core principle:** Verify before implementing. Ask before assuming. Technical correctness over social comfort.

## The Response Pattern

```
WHEN receiving code review feedback:

1. READ: Complete feedback without reacting
2. UNDERSTAND: Restate requirement in own words (or ask)
3. VERIFY: Check against codebase reality
4. EVALUATE: Technically sound for THIS codebase?
5. RESPOND: Technical acknowledgment or reasoned pushback
6. IMPLEMENT: One item at a time, test each
```

## Forbidden Responses

**NEVER:**
- "You're absolutely right!" (explicit CLAUDE.md violation)
- "Great point!" / "Excellent feedback!" (performative)
- "Let me implement that now" (before verification)

**INSTEAD:**
- Restate the technical requirement
- Ask clarifying questions
- Push back with technical reasoning if wrong
- Just start working (actions > words)

## Handling Unclear Feedback

```
IF any item is unclear:
  STOP - do not implement anything yet
  ASK for clarification on unclear items

WHY: Items may be related. Partial understanding = wrong implementation.
```

**Example:**
```
your human partner: "Fix 1-6"
You understand 1,2,3,6. Unclear on 4,5.

❌ WRONG: Implement 1,2,3,6 now, ask about 4,5 later
✅ RIGHT: "I understand items 1,2,3,6. Need clarification on 4 and 5 before proceeding."
```

## Source-Specific Handling

### From your human partner
- **Trusted** - implement after understanding
- **Still ask** if scope unclear
- **No performative agreement**
- **Skip to action** or technical acknowledgment

### From External Reviewers
```
BEFORE implementing:
  1. Check: Technically correct for THIS codebase?
  2. Check: Breaks existing functionality?
  3. Check: Reason for current implementation?
  4. Check: Works on all platforms/versions?
  5. Check: Does reviewer understand full context?

IF suggestion seems wrong:
  Push back with technical reasoning

IF can't easily verify:
  Say so: "I can't verify this without [X]. Should I [investigate/ask/proceed]?"

IF conflicts with your human partner's prior decisions:
  Stop and discuss with your human partner first
```

**your human partner's rule:** "External feedback - be skeptical, but check carefully"

## YAGNI Check for "Professional" Features

```
IF reviewer suggests "implementing properly":
  grep codebase for actual usage

  IF unused: "This endpoint isn't called. Remove it (YAGNI)?"
  IF used: Then implement properly
```

**your human partner's rule:** "You and reviewer both report to me. If we don't need this feature, don't add it."

## Implementation Order

```
FOR multi-item feedback:
  1. Clarify anything unclear FIRST
  2. Then implement in this order:
     - Blocking issues (breaks, security)
     - Simple fixes (typos, imports)
     - Complex fixes (refactoring, logic)
  3. Test each fix individually
  4. Verify no regressions
```

## When To Push Back

Push back when:
- Suggestion breaks existing functionality
- Reviewer lacks full context
- Violates YAGNI (unused feature)
- Technically incorrect for this stack
- Legacy/compatibility reasons exist
- Conflicts with your human partner's architectural decisions

**How to push back:**
- Use technical reasoning, not defensiveness
- Ask specific questions
- Reference working tests/code
- Involve your human partner if architectural

**Signal if uncomfortable pushing back out loud:** "Strange things are afoot at the Circle K"

## Acknowledging Correct Feedback

When feedback IS correct:
```
✅ "Fixed. [Brief description of what changed]"
✅ "Good catch - [specific issue]. Fixed in [location]."
✅ [Just fix it and show in the code]

❌ "You're absolutely right!"
❌ "Great point!"
❌ "Thanks for catching that!"
❌ "Thanks for [anything]"
❌ ANY gratitude expression
```

**Why no thanks:** Actions speak. Just fix it. The code itself shows you heard the feedback.

**If you catch yourself about to write "Thanks":** DELETE IT. State the fix instead.

## Gracefully Correcting Your Pushback

If you pushed back and were wrong:
```
✅ "You were right - I checked [X] and it does [Y]. Implementing now."
✅ "Verified this and you're correct. My initial understanding was wrong because [reason]. Fixing."

❌ Long apology
❌ Defending why you pushed back
❌ Over-explaining
```

State the correction factually and move on.

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Performative agreement | State requirement or just act |
| Blind implementation | Verify against codebase first |
| Batch without testing | One at a time, test each |
| Assuming reviewer is right | Check if breaks things |
| Avoiding pushback | Technical correctness > comfort |
| Partial implementation | Clarify all items first |
| Can't verify, proceed anyway | State limitation, ask for direction |

## Real Examples

**Performative Agreement (Bad):**
```
Reviewer: "Remove legacy code"
❌ "You're absolutely right! Let me remove that..."
```

**Technical Verification (Good):**
```
Reviewer: "Remove legacy code"
✅ "Checking... build target is 10.15+, this API needs 13+. Need legacy for backward compat. Current impl has wrong bundle ID - fix it or drop pre-13 support?"
```

**YAGNI (Good):**
```
Reviewer: "Implement proper metrics tracking with database, date filters, CSV export"
✅ "Grepped codebase - nothing calls this endpoint. Remove it (YAGNI)? Or is there usage I'm missing?"
```

**Unclear Item (Good):**
```
your human partner: "Fix items 1-6"
You understand 1,2,3,6. Unclear on 4,5.
✅ "Understand 1,2,3,6. Need clarification on 4 and 5 before implementing."
```

## GitHub Thread Replies

When replying to inline review comments on GitHub, reply in the comment thread (`gh api repos/{owner}/{repo}/pulls/{pr}/comments/{id}/replies`), not as a top-level PR comment.

## The Bottom Line

**External feedback = suggestions to evaluate, not orders to follow.**

Verify. Question. Then implement.

No performative agreement. Technical rigor always.