---
name: systematic-debugging
description: Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes. Debugging time varies - use ai-timeline-estimation for fix time, but investigation time is unpredictable.
version: 1.1.0
skill_schema_version: 1
deprecated: false
replaced_by: null
minimum_openclaw_version: "1.0.0"
supported_models:
  - general
preferred_model_traits:
  - strong reasoning
  - hypothesis testing
required_tools: []
optional_tools:
  - exec
  - read
  - write
risk_level: medium
---

# Systematic Debugging

## Purpose

Provides a rigorous, systematic methodology for debugging any technical issue. Random fixes waste time and create new bugs. Quick patches mask underlying issues.

**Core principle:** ALWAYS find root cause before attempting fixes. Symptom fixes are failure.

**Violating the letter of this process is violating the spirit of debugging.**

### Explicit Guarantees

This skill guarantees:
- **Root cause identification**: Every debugging session MUST trace back to the actual root cause before fixing
- **Scientific method**: Hypothesis testing with minimal changes, one variable at a time
- **Failure tracking**: All failed fix attempts are tracked and inform architectural reconsideration
- **Verification first**: Fixes are verified against failing tests created BEFORE the fix

## Trigger Contract

### Use this skill when
- Encountering any bug, test failure, or unexpected behavior
- Before proposing ANY fixes (mandatory precondition)
- Fixing production issues
- Debugging performance problems
- Investigating build failures
- Resolving integration issues

**Use this ESPECIALLY when:**
- Under time pressure (emergencies make guessing tempting)
- "Just one quick fix" seems obvious
- You've already tried multiple fixes
- Previous fix didn't work
- You don't fully understand the issue

**Don't skip when:**
- Issue seems simple (simple bugs have root causes too)
- You're in a hurry (rushing guarantees rework)
- Manager wants it fixed NOW (systematic is faster than thrashing)

### Do NOT use this skill when
- The issue is purely cosmetic with no functional impact
- You need to write new code from scratch (not fixing existing bugs)
- Request is for code review of correct implementation
- Task is educational/explanatory without a broken system

### Inspect First
- Error messages and stack traces
- Recent changes (git log, diff)
- Environment configuration
- Similar working code in codebase

### Handoff To
- `superpowers:test-driven-development` for creating failing test cases (Phase 4)
- `superpowers:verification-before-completion` for verifying fix success

### Stop Conditions
- True environmental/external issue (not code): document investigation, handle appropriately
- Architectural problem after 3+ failed fixes: discuss with human before continuing

## When Not to Use

### Common Misactivation Scenarios

**Don't use for:**
- Writing new features from scratch
- Code review of correct implementations
- Explaining how code works (no bug to fix)
- Purely UI/cosmetic changes without functional bug
- Configuration changes for new systems (not debugging broken ones)

### Alternative Approaches

| Request | Use Instead |
|---------|-------------|
| "Write a new feature" | No skill needed |
| "Explain this code" | No skill needed |
| "Review this implementation" | Code review skill |
| "Add new configuration" | Configuration skill |
| "Debug failing test" | This skill (systematic-debugging) |

## Inputs

### Required Inputs
- Description of the bug, failure, or unexpected behavior
- Reproduction steps (if known)
- Error messages or stack traces
- Context about when issue occurs

### Optional Inputs
- Recent changes that might have caused the issue
- Relevant code location
- Environment details
- Whether issue is reproducible

### Input Formats
- Natural language description
- Error message text
- Stack trace
- Steps to reproduce

## Output Contract

### Output Mode
- Root cause identification
- Fix recommendation (after investigation complete)
- Documentation of what was tried

### Required Outputs
1. **Root cause** - Clear statement of WHY the bug occurs
2. **Evidence** - Facts supporting the conclusion
3. **Fix** - Minimal change addressing root cause (not symptoms)
4. **Verification** - Test passes after fix

### Output Guarantees
- No fix proposed without root cause investigation
- Failed fix attempts are documented
- Architecture is questioned after 3+ failures
- Failing test created before fix (Phase 4.1)

### Failure Output
- Documented investigation (what was checked, result)
- Clear statement if issue appears environmental/external
- Recommendation for next steps if architecture is suspect

## Risk and Safety Boundaries

**This is a Core Required section.** Every skill must define its safety posture.

### Risk Level
**medium** - Skill modifies code files but only within controlled fix workflow

### Trust Boundaries

| Boundary | Trust Level | Notes |
|----------|-------------|-------|
| User's bug description | Untrusted | Validate by reproducing |
| Error messages | Trusted | Direct system output |
| Stack traces | Trusted | Debugging info |
| Code under investigation | Trusted | In-scope codebase |
| Proposed fix | Untrusted | Must verify before committing |

### Primary Risks

| Risk | Mitigation |
|------|------------|
| Introducing new bugs | Create failing test first, verify after fix |
| Breaking working features | Run full test suite after fix |
| Incomplete root cause | Follow all 4 phases, don't skip |
| Fixing symptoms not cause | Phase 4.5 architecture check after 3 failures |

### Basic Safety Rules
1. Create failing test BEFORE fixing (mandatory)
2. One fix at a time - isolate variables
3. Verify fix works before proceeding
4. Run full test suite after any change
5. Question architecture after 3+ failed attempts

## Failure Taxonomy

**This is a Core Required section.** Every skill must define a standard way to fail.

### Standard Failure Classes

| Class | Description | Resolution |
|-------|-------------|------------|
| cannot_reproduce | Issue not reproducible with given steps | Gather more data, ask for details |
| ambiguous_symptom | Not enough info to identify root cause | Request additional context |
| unsupported_request | Not a bug/issue to debug | Hand off to appropriate skill |
| environment_issue | Issue is truly environmental | Document, handle appropriately |
| architectural_problem | 3+ fixes failed, pattern indicates architecture issue | Discuss with human before continuing |
| verification_failed | Fix didn't work | Return to Phase 1 with new info |

### Expected Failure Behavior
1. Classify failure using standard taxonomy
2. Explain specific blocker in user-friendly terms
3. Return safest next step
4. Never pretend to succeed

### Minimum Failure Handling
- **cannot_reproduce**: Ask for more details, try variations
- **environment_issue**: Document investigation, implement handling
- **architectural_problem**: STOP fixing, discuss with human
- **verification_failed**: Return to Phase 1, new information available

## Minimal Context Rules

Every skill must define what must be known before using it. This is separate from full context loading.

### Core Required Context

Before using this skill, the following must be known:

| Information | Source | Required |
|-------------|--------|----------|
| Skill name and description | Frontmatter | Yes |
| When to use / not use | Trigger Contract section | Yes |
| Safety constraints | Risk Level + Risk/Safety Boundaries | Yes |
| Expected outputs | Output Contract section | Yes |
| The Four Phases | Purpose section | Yes |

### Context Principle

Keep core context minimal. The core systematic debugging workflow is:
1. Root Cause Investigation (Phase 1)
2. Pattern Analysis (Phase 2)
3. Hypothesis and Testing (Phase 3)
4. Implementation (Phase 4)

Detailed techniques (root-cause-tracing.md, defense-in-depth.md) are in supporting files for expanded context loading.

## Minimum Observability

**This is a Core Required section.** Every skill must define minimum observability requirements.

### Required Logging

Every skill execution must track:

| Event | Description |
|-------|-------------|
| **Trigger** | When systematic-debugging is activated |
| **Phase** | Current phase (1-4) being executed |
| **Fix Attempts** | Each failed fix attempt is logged |
| **Completion** | Whether root cause found + fix verified OR handed off |

### Logging Format

Simple text-based logging:
- Phase transitions
- Hypothesis formation and test results
- Failed fix attempts with reason
- Final outcome (success/architectural issue/handoff)

## Version Metadata

Every skill must declare version information in frontmatter:

| Field | Required | Purpose |
|-------|----------|---------|
| version | Yes | Semantic version (MAJOR.MINOR.PATCH) - currently 1.1.0 |
| deprecated | Yes | Whether this version is deprecated - currently false |
| replaced_by | Yes (if deprecated) | Name of replacement skill - currently null |

### Versioning Rules
- Use semantic versioning
- Increment PATCH for safe internal fixes
- Increment MINOR for backward-compatible enhancements
- Increment MAJOR for breaking structural changes

---

## The Iron Law

```
NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST
```

If you haven't completed Phase 1, you cannot propose fixes.

## The Four Phases

You MUST complete each phase before proceeding to the next.

### Phase 1: Root Cause Investigation

**BEFORE attempting ANY fix:**

1. **Read Error Messages Carefully**
   - Don't skip past errors or warnings
   - They often contain the exact solution
   - Read stack traces completely
   - Note line numbers, file paths, error codes

2. **Reproduce Consistently**
   - Can you trigger it reliably?
   - What are the exact steps?
   - Does it happen every time?
   - If not reproducible → gather more data, don't guess

3. **Check Recent Changes**
   - What changed that could cause this?
   - Git diff, recent commits
   - New dependencies, config changes
   - Environmental differences

4. **Gather Evidence in Multi-Component Systems**

   **WHEN system has multiple components (CI → build → signing, API → service → database):**

   **BEFORE proposing fixes, add diagnostic instrumentation:**
   ```
   For EACH component boundary:
     - Log what data enters component
     - Log what data exits component
     - Verify environment/config propagation
     - Check state at each layer

   Run once to gather evidence showing WHERE it breaks
   THEN analyze evidence to identify failing component
   THEN investigate that specific component
   ```

   **Example (multi-layer system):**
   ```bash
   # Layer 1: Workflow
   echo "=== Secrets available in workflow: ==="
   echo "IDENTITY: ${IDENTITY:+SET}${IDENTITY:-UNSET}"

   # Layer 2: Build script
   echo "=== Env vars in build script: ==="
   env | grep IDENTITY || echo "IDENTITY not in environment"

   # Layer 3: Signing script
   echo "=== Keychain state: ==="
   security list-keychains
   security find-identity -v

   # Layer 4: Actual signing
   codesign --sign "$IDENTITY" --verbose=4 "$APP"
   ```

   **This reveals:** Which layer fails (secrets → workflow ✓, workflow → build ✗)

5. **Trace Data Flow**

   **WHEN error is deep in call stack:**

   See `root-cause-tracing.md` in this directory for the complete backward tracing technique.

   **Quick version:**
   - Where does bad value originate?
   - What called this with bad value?
   - Keep tracing up until you find the source
   - Fix at source, not at symptom

### Phase 2: Pattern Analysis

**Find the pattern before fixing:**

1. **Find Working Examples**
   - Locate similar working code in same codebase
   - What works that's similar to what's broken?

2. **Compare Against References**
   - If implementing pattern, read reference implementation COMPLETELY
   - Don't skim - read every line
   - Understand the pattern fully before applying

3. **Identify Differences**
   - What's different between working and broken?
   - List every difference, however small
   - Don't assume "that can't matter"

4. **Understand Dependencies**
   - What other components does this need?
   - What settings, config, environment?
   - What assumptions does it make?

### Phase 3: Hypothesis and Testing

**Scientific method:**

1. **Form Single Hypothesis**
   - State clearly: "I think X is the root cause because Y"
   - Write it down
   - Be specific, not vague

2. **Test Minimally**
   - Make the SMALLEST possible change to test hypothesis
   - One variable at a time
   - Don't fix multiple things at once

3. **Verify Before Continuing**
   - Did it work? Yes → Phase 4
   - Didn't work? Form NEW hypothesis
   - DON'T add more fixes on top

4. **When You Don't Know**
   - Say "I don't understand X"
   - Don't pretend to know
   - Ask for help
   - Research more

### Phase 4: Implementation

**Fix the root cause, not the symptom:**

1. **Create Failing Test Case**
   - Simplest possible reproduction
   - Automated test if possible
   - One-off test script if no framework
   - MUST have before fixing
   - Use the `superpowers:test-driven-development` skill for writing proper failing tests

2. **Implement Single Fix**
   - Address the root cause identified
   - ONE change at a time
   - No "while I'm here" improvements
   - No bundled refactoring

3. **Verify Fix**
   - Test passes now?
   - No other tests broken?
   - Issue actually resolved?

4. **If Fix Doesn't Work**
   - STOP
   - Count: How many fixes have you tried?
   - If < 3: Return to Phase 1, re-analyze with new information
   - **If ≥ 3: STOP and question the architecture (step 5 below)**
   - DON'T attempt Fix #4 without architectural discussion

5. **If 3+ Fixes Failed: Question Architecture**

   **Pattern indicating architectural problem:**
   - Each fix reveals new shared state/coupling/problem in different place
   - Fixes require "massive refactoring" to implement
   - Each fix creates new symptoms elsewhere

   **STOP and question fundamentals:**
   - Is this pattern fundamentally sound?
   - Are we "sticking with it through sheer inertia"?
   - Should we refactor architecture vs. continue fixing symptoms?

   **Discuss with your human partner before attempting more fixes**

   This is NOT a failed hypothesis - this is a wrong architecture.

## Red Flags - STOP and Follow Process

If you catch yourself thinking:
- "Quick fix for now, investigate later"
- "Just try changing X and see if it works"
- "Add multiple changes, run tests"
- "Skip the test, I'll manually verify"
- "It's probably X, let me fix that"
- "I don't fully understand but this might work"
- "Pattern says X but I'll adapt it differently"
- "Here are the main problems: [lists fixes without investigation]"
- Proposing solutions before tracing data flow
- **"One more fix attempt" (when already tried 2+)**
- **Each fix reveals new problem in different place**

**ALL of these mean: STOP. Return to Phase 1.**

**If 3+ fixes failed:** Question the architecture (see Phase 4.5)

## Your Human Partner's Signals You're Doing It Wrong

**Watch for these redirections:**
- "Is that not happening?" - You assumed without verifying
- "Will it show us...?" - You should have added evidence gathering
- "Stop guessing" - You're proposing fixes without understanding
- "Ultrathink this" - Question fundamentals, not just symptoms
- "We're stuck?" (frustrated) - Your approach isn't working

**When you see these:** STOP. Return to Phase 1.

## Common Rationalizations

| Excuse | Reality |
|--------|---------|
| "Issue is simple, don't need process" | Simple issues have root causes too. Process is fast for simple bugs. |
| "Emergency, no time for process" | Systematic debugging is FASTER than guess-and-check thrashing. |
| "Just try this first, then investigate" | First fix sets the pattern. Do it right from the start. |
| "I'll write test after confirming fix works" | Untested fixes don't stick. Test first proves it. |
| "Multiple fixes at once saves time" | Can't isolate what worked. Causes new bugs. |
| "Reference too long, I'll adapt the pattern" | Partial understanding guarantees bugs. Read it completely. |
| "I see the problem, let me fix it" | Seeing symptoms ≠ understanding root cause. |
| "One more fix attempt" (after 2+ failures) | 3+ failures = architectural problem. Question pattern, don't fix again. |

## Quick Reference

| Phase | Key Activities | Success Criteria |
|-------|---------------|------------------|
| **1. Root Cause** | Read errors, reproduce, check changes, gather evidence | Understand WHAT and WHY |
| **2. Pattern** | Find working examples, compare | Identify differences |
| **3. Hypothesis** | Form theory, test minimally | Confirmed or new hypothesis |
| **4. Implementation** | Create test, fix, verify | Bug resolved, tests pass |

## When Process Reveals "No Root Cause"

If systematic investigation reveals issue is truly environmental, timing-dependent, or external:

1. You've completed the process
2. Document what you investigated
3. Implement appropriate handling (retry, timeout, error message)
4. Add monitoring/logging for future investigation

**But:** 95% of "no root cause" cases are incomplete investigation.

## Supporting Techniques

These techniques are part of systematic debugging and available in this directory:

- **`root-cause-tracing.md`** - Trace bugs backward through call stack to find original trigger
- **`defense-in-depth.md`** - Add validation at multiple layers after finding root cause
- **`condition-based-waiting.md`** - Replace arbitrary timeouts with condition polling

**Related skills:**
- **superpowers:test-driven-development** - For creating failing test case (Phase 4, Step 1)
- **superpowers:verification-before-completion** - Verify fix worked before claiming success

## Real-World Impact

From debugging sessions:
- Systematic approach: 15-30 minutes to fix
- Random fixes approach: 2-3 hours of thrashing
- First-time fix rate: 95% vs 40%
- New bugs introduced: Near zero vs common

## Timeline Estimation for Debugging

Debugging time is inherently unpredictable. Use ranges, not point estimates.

| Debugging Phase | AI Time Estimate | Notes |
|-----------------|------------------|-------|
| Phase 1: Root cause investigation | 10-60 min | Highly variable |
| Phase 2: Reproduce minimally | 5-30 min | Depends on complexity |
| Phase 3: Hypothesis & verify | 10-45 min | May need multiple hypotheses |
| Phase 4: Implement fix | Use ai-timeline-estimation | Now predictable |
| Verification & tests | Base fix time × 1.3 | Debugging fixes need more testing |

**Total debugging estimate:**
```
DEBUG_TOTAL = Investigation + Reproduction + Hypothesis + Fix + Verification
```

**Buffer for unknowns:**
- Simple bug (obvious reproduction): +25% buffer
- Complex bug (intermittent/unclear): +50% buffer
- Production incident (pressure, limited info): +100% buffer

**Key insight:** Investigation time is unpredictable. Fix time is predictable once root cause is known. Report both separately.