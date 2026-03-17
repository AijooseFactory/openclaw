---
name: verification-before-completion
description: Use when about to claim work is complete, fixed, or passing, before committing or creating PRs - requires running verification commands and confirming output before making any success claims; evidence before assertions always. Include verification time in estimates.
version: 1.1.0
skill_schema_version: 1
deprecated: false
replaced_by: null
minimum_openclaw_version: "1.0.0"
supported_models:
  - general
preferred_model_traits:
  - strong verification
  - quality assurance
required_tools: []
optional_tools:
  - exec
  - read
risk_level: low
---

# Verification Before Completion

## Purpose

Verifies that claimed work is actually complete before any completion assertions are made. Ensures evidence exists before claims, preventing false completion reports that waste time and erode trust.

**Core principle:** Evidence before claims, always.

**Violating the letter of this rule is violating the spirit of this rule.**

## Trigger Contract

### Use this skill when
- About to claim work is "complete", "fixed", "done", "working", or "passing"
- About to create a commit, push, or pull request
- About to express satisfaction ("Great!", "Perfect!", "Done!")
- About to move to the next task
- About to delegate to an agent and report success
- Any positive statement about work state is about to be made
- User asks to verify something is working

### Do NOT use this skill when
- Simply reading or exploring code without making claims
- Writing initial code/tasks without completion claims
- Asking for help or clarification (not making completion claims)
- The task is ONLY to generate output (not verify it)

### Inspect First
- What exact command proves the claim being made?
- What is the current state of the codebase?
- What verification has already been run?

### Handoff To
- `superpowers:test-driven-development` for TDD workflow verification
- Relevant domain skills for specific verification needs

### Stop Conditions
- Verification command unavailable or cannot be run
- Claim cannot be verified (e.g., external system state)
- Verification would require significant additional work not in scope

## When Not to Use

### Common Misactivation Scenarios

**Don't use for:**
- Initial exploration without completion claims
- Asking clarifying questions
- Reporting current state without asserting completion
- Generating content without verification claims

### What is NOT a Verification Claim

These statements do NOT require verification:
- "I'm working on X"
- "I've started Y"
- "I'm trying Z"
- "Here's what I found:"
- Questions or requests for help

## Inputs

### Required Inputs
- The claim being made (what is being asserted as complete/correct)
- The verification command that proves the claim
- Access to run verification commands

### Optional Inputs
- Context about the task (what was supposed to be accomplished)
- Previous verification history (for comparison)
- Time constraints (if any)

### Input Formats
- Natural language claim
- Explicit verification command
- Test output, build output, or other evidence

## Output Contract

### Output Mode
- Verification report with evidence
- Claim confirmation or correction

### Required Outputs
- Claim being verified
- Verification command executed
- Evidence (command output, exit code)
- Verdict: confirmed or contradicted

### Output Guarantees

| Guarantee | Description |
|-----------|-------------|
| Evidence-based | Every claim verified with actual command output |
| Complete output | Full output shown, not just summary |
| Exit code reported | Success/failure based on actual exit code |
| Honest verdict | Contradicts false claims with evidence |

### Validation Rules
- Must run actual verification command (not assume)
- Must show actual output (not just summarize)
- Must report actual exit code
- Must not skip steps "just this once"

### Failure Output
Return blocked status with:
- reason: "verification_required"
- claim: what was claimed without evidence
- needed: what verification command proves the claim
- guidance: "Run verification command before making claim"

## Risk and Safety Boundaries

**Risk Level:** low

This skill promotes honesty and thoroughness. It does not execute destructive commands - it only runs verification commands that read state.

### Trust Boundaries

| Boundary | Trust Level | Notes |
|----------|-------------|-------|
| Verification commands | Medium | Only run read-only/verification commands |
| Command output | Trusted | Actual output is source of truth |
| Agent reports | Untrusted | Always verify independently |

### Primary Risks

| Risk | Mitigation |
|------|------------|
| Verification command harm | Only run verification commands, not mutations |
| Incomplete verification | Require full output, not summary |
| False verification | Report actual exit codes |
| Missed verification | Check all claims for verification need |

### Basic Safety Rules
1. Only verify, do not modify state
2. Show full output, not cherry-picked lines
3. Report exit codes accurately
4. Never skip verification "just this once"

## Failure Taxonomy

| Class | Description | Resolution |
|-------|-------------|------------|
| verification_command_missing | No verification command available | Request clarification on what proves the claim |
| verification_failed | Output contradicts claim | Correct the claim with evidence |
| verification_skipped | Claim made without verification | Run verification, update claim |
| partial_verification | Only checked subset | Verify completely before claiming |
| exit_code_misreported | Claimed success from exit code 1 | Report actual exit code |

### Expected Failure Behavior
- If verification not run: Request run verification before claim
- If verification fails: Contradict claim with evidence
- If partial: Require complete verification

### Minimum Failure Handling
- **verification_skipped**: "Run [command] before making that claim"
- **verification_failed**: "Output shows [evidence]. The claim is inaccurate."
- **partial_verification**: "Verify completely: run full command and check all output"

## Minimal Context Rules

### Core Required Context

| Information | Source | Required |
|-------------|--------|----------|
| Claim being made | User message | Yes |
| Verification command | Skill instructions | Yes |
| Command output | Execution result | Yes |
| Exit code | Command result | Yes |

### Context Principle

Verification requires minimal context:
- What claim → What command → What output → What verdict

No need for:
- Full project context for basic verification
- Historical verification records
- Complex state management

## Minimum Observability

### Required Logging

| Event | Description |
|-------|-------------|
| **Trigger** | When verification skill activates (claim about to be made) |
| **Action** | Verification command run, output received |
| **Verdict** | Claim confirmed or contradicted with evidence |

### Logging Format
Simple text logs are sufficient:
```
[verification-before-completion] Triggered: claim="tests pass"
[verification-before-completion] Action: ran `npm test`, exit=0
[verification-before-completion] Verdict: CONFIRMED - 34/34 tests pass
```

## Version Metadata

| Field | Value |
|-------|-------|
| version | 1.1.0 |
| deprecated | false |
| replaced_by | null |

### Versioning
- 1.0.0: Initial version
- 1.1.0: Added v2.4.0 required sections

---

# Original Content (Preserved)

## The Iron Law

```
NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE
```

If you haven't run the verification command in this message, you cannot claim it passes.

## The Gate Function

```
BEFORE claiming any status or expressing satisfaction:

1. IDENTIFY: What command proves this claim?
2. RUN: Execute the FULL command (fresh, complete)
3. READ: Full output, check exit code, count failures
4. VERIFY: Does output confirm the claim?
   - If NO: State actual status with evidence
   - If YES: State claim WITH evidence
5. ONLY THEN: Make the claim

Skip any step = lying, not verifying
```

## Common Failures

| Claim | Requires | Not Sufficient |
|-------|----------|----------------|
| Tests pass | Test command output: 0 failures | Previous run, "should pass" |
| Linter clean | Linter output: 0 errors | Partial check, extrapolation |
| Build succeeds | Build command: exit 0 | Linter passing, logs look good |
| Bug fixed | Test original symptom: passes | Code changed, assumed fixed |
| Regression test works | Red-green cycle verified | Test passes once |
| Agent completed | VCS diff shows changes | Agent reports "success" |
| Requirements met | Line-by-line checklist | Tests passing |

## Red Flags - STOP

- Using "should", "probably", "seems to"
- Expressing satisfaction before verification ("Great!", "Perfect!", "Done!", etc.)
- About to commit/push/PR without verification
- Trusting agent success reports
- Relying on partial verification
- Thinking "just this once"
- Tired and wanting work over
- **ANY wording implying success without having run verification**

## Rationalization Prevention

| Excuse | Reality |
|--------|---------|
| "Should work now" | RUN the verification |
| "I'm confident" | Confidence ≠ evidence |
| "Just this once" | No exceptions |
| "Linter passed" | Linter ≠ compiler |
| "Agent said success" | Verify independently |
| "I'm tired" | Exhaustion ≠ excuse |
| "Partial check is enough" | Partial proves nothing |
| "Different words so rule doesn't apply" | Spirit over letter |

## Key Patterns

**Tests:**
```
✅ [Run test command] [See: 34/34 pass] "All tests pass"
❌ "Should pass now" / "Looks correct"
```

**Regression tests (TDD Red-Green):**
```
✅ Write → Run (pass) → Revert fix → Run (MUST FAIL) → Restore → Run (pass)
❌ "I've written a regression test" (without red-green verification)
```

**Build:**
```
✅ [Run build] [See: exit 0] "Build passes"
❌ "Linter passed" (linter doesn't check compilation)
```

**Requirements:**
```
✅ Re-read plan → Create checklist → Verify each → Report gaps or completion
❌ "Tests pass, phase complete"
```

**Agent delegation:**
```
✅ Agent reports success → Check VCS diff → Verify changes → Report actual state
❌ Trust agent report
```

## Why This Matters

From 24 failure memories:
- your human partner said "I don't believe you" - trust broken
- Undefined functions shipped - would crash
- Missing requirements shipped - incomplete features
- Time wasted on false completion → redirect → rework
- Violates: "Honesty is a core value. If you lie, you'll be replaced."

## When To Apply

**ALWAYS before:**
- ANY variation of success/completion claims
- ANY expression of satisfaction
- ANY positive statement about work state
- Committing, PR creation, task completion
- Moving to next task
- Delegating to agents

**Rule applies to:**
- Exact phrases
- Paraphrases and synonyms
- Implications of success
- ANY communication suggesting completion/correctness

## The Bottom Line

**No shortcuts for verification.**

Run the command. Read the output. THEN claim the result.

This is non-negotiable.

## Timeline Estimation for Verification

Verification has predictable overhead. Include it in all estimates:

| Verification Type | AI Time | Notes |
|-------------------|---------|-------|
| Unit test run | 1-3 min | Fast feedback |
| Integration test run | 3-10 min | Depends on scope |
| Full test suite | 5-20 min | Larger codebases |
| Lint/type check | 30 sec - 2 min | Quick checks |
| Build | 1-5 min | Depends on complexity |
| Security scan | 2-5 min | Dependency vulnerabilities |
| Manual verification | 5-15 min | Browser/API testing |

**Verification is NOT optional:**
```
TASK_TOTAL includes verification time
```

**When estimating tasks using `ai-timeline-estimation`:**
- Add verification time for each commit/PR
- CI/CD runs add to total time
- Failed verification means rework time

**Key insight:** AI code has ~1.7x more issues than human code. Verification cycles are essential, not optional. Always include verification time in estimates.