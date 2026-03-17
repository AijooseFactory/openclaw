---
name: finishing-a-development-branch
description: Use when implementation is complete, all tests pass, and you need to decide how to integrate the work - guides completion of development work by presenting structured options for merge, PR, or cleanup. Include verification time in estimates.
version: 1.1.0
skill_schema_version: 1
deprecated: false
replaced_by: null
minimum_openclaw_version: "1.0.0"
supported_models:
  - general
preferred_model_traits:
  - strong git operations
  - branch management
required_tools: []
optional_tools:
  - exec
  - process
risk_level: medium
---

# Finishing a Development Branch

## Purpose

Guide completion of development work by presenting clear options and handling chosen workflow. Helps complete development tasks by verifying tests, presenting integration options (merge/PR/discard), and executing the chosen path with proper cleanup.

## Trigger Contract

### Use this skill when
- Implementation work is complete and all tests pass
- User needs to integrate completed work into the main codebase
- A feature branch or development branch is ready to be merged, PR'd, or discarded
- User asks about completing/finishing a development branch
- User says "complete this branch", "finish this feature", "merge my work", "clean up this branch"

### Do NOT use this skill when
- Tests are still failing or work is incomplete
- User only wants to run tests (use test-running skill instead)
- User wants to discuss implementation strategy (not done yet)
- User asks for code review (use code review skill)
- This is a hotfix branch that shouldn't be deleted

### Inspect First
- Current git branch and its status
- Whether tests pass
- Whether branch has remote tracking
- Whether worktree exists for this branch
- Base branch (main/master/develop)

### Handoff To
- Test-running skill if tests need to be executed first
- Git worktree skill if worktree setup is needed
- Code review skill if review is needed before merging

### Stop Conditions
- Tests are failing - cannot proceed until fixed
- Branch has uncommitted changes that would be lost
- No base branch can be determined
- User explicitly cancels the operation

## When Not to Use

### Common Misactivation Scenarios

**Don't use for:**
- Running tests (that's a separate step)
- Writing new code or fixing bugs
- Code review or discussion
- Hotfix branches that should stay
- Feature branches that need more work

### Alternative Skills

| Request | Use Instead |
|---------|-------------|
| "Run the tests" | Test-running skill |
| "Write more code" | Development skill |
| "Review my code" | Code review skill |
| "Fix this bug" | Debugging skill |

## Inputs

### Required Inputs
- A completed development branch (feature/bugfix/etc.)
- Verification that tests pass
- Knowledge of base branch (main/master)

### Optional Inputs
- Branch name (if not current branch)
- PR title/body template preference
- Whether to keep worktree after completion
- Custom merge commit message

### Input Formats
- Current git branch context
- Test suite results
- User's stated preference for integration method

## Output Contract

### Output Mode
- Display options to user
- Execute chosen git workflow
- Report completion status

### Required Outputs
- List of 4 integration options
- Execution of chosen option (merge/PR/discard/keep)
- Success/failure status report
- Worktree cleanup (if applicable)

### Output Guarantees
- Tests verified before options presented
- Exactly 4 options shown (no more, no less)
- Confirmation required for destructive actions
- Worktree handled appropriately per choice

### Failure Output
- Test failures: Block with clear error message
- Merge conflicts: Report and stop (don't force through)
- Permission denied: Report and suggest alternatives
- Confirmation not received: Stop without proceeding

## Risk and Safety Boundaries

**Risk Level: medium** - Involves git operations that modify branch state and can delete work if not careful.

### Trust Boundaries

| Boundary | Trust Level | Notes |
|----------|-------------|-------|
| User input | Trusted | User provides intent and confirmation |
| Git operations | Trusted | Standard git commands, no external calls |
| Test results | Trusted | From local test execution |
| Branch state | Trusted | Local git state |

### Primary Risks

| Risk | Mitigation |
|------|------------|
| Accidental deletion | Require typed "discard" confirmation |
| Lost work | Always verify tests before merging |
| Merge conflicts | Report, don't force through |
| Wrong branch deletion | Verify branch name before -D |
| Destroying uncommitted changes | Check git status before operations |

### Basic Safety Rules
1. Always verify tests pass before offering options
2. Require explicit confirmation for destructive actions (Option 4)
3. Only cleanup worktree for Options 1 and 4
4. Never force-push unless explicitly requested
5. Show what will be deleted before confirming discard

## Failure Taxonomy

### Standard Failure Classes

| Class | Description | Resolution |
|-------|-------------|------------|
| tests_failing | Tests do not pass | Stop, report failures, don't proceed |
| merge_conflict | Git merge has conflicts | Report conflicts, ask for help |
| uncommitted_changes | Branch has uncommitted work | Ask user to commit or stash |
| permission_denied | Cannot push/create PR | Report error, suggest alternatives |
| confirmation_not_received | User didn't confirm discard | Stop without proceeding |
| base_branch_unknown | Cannot determine base branch | Ask user to specify |
| branch_not_found | Branch doesn't exist | Report and stop |

### Expected Failure Behavior
- **tests_failing**: Show failure count, list failures, say "Cannot proceed"
- **merge_conflict**: Report conflict files, stop without forcing
- **permission_denied**: Report exact error, suggest checking credentials
- **confirmation_not_received**: "Discard cancelled" message, no action taken

## Minimal Context Rules

### Core Required Context

Before using this skill, the following must be known:

| Information | Source | Required |
|-------------|--------|----------|
| Current branch name | git branch --show-current | Yes |
| Base branch | git merge-base or user | Yes |
| Test status | Test execution | Yes |
| Worktree state | git worktree list | If applicable |
| Remote tracking | git branch -vv | If pushing/PR |

### Context Principle

Keep core context minimal. Most information comes from git commands at runtime. Only need to know:
- That work is complete
- What the user wants to do with it

## Minimum Observability

### Required Logging

| Event | Description |
|-------|-------------|
| **Trigger** | Skill activated for branch completion |
| **Action** | Tests verified, options presented, choice executed |
| **Failure** | Test failures, conflicts, errors |

### Logging Format

Simple text logging is sufficient:
- "Finishing development branch: [branch-name]"
- "Tests passed, presenting options"
- "User selected: [option]"
- "Branch [merged|PR'd|discarded|kept]"
- "Failure: [reason]"

---

## Overview (Existing Content - Preserved)

Guide completion of development work by presenting clear options and handling chosen workflow.

**Core principle:** Verify tests → Present options → Execute choice → Clean up.

**Announce at start:** "I'm using the finishing-a-development-branch skill to complete this work."

## The Process

### Step 1: Verify Tests

**Before presenting options, verify tests pass:**

```bash
# Run project's test suite
npm test / cargo test / pytest / go test ./...
```

**If tests fail:**
```
Tests failing (<N> failures). Must fix before completing:

[Show failures]

Cannot proceed with merge/PR until tests pass.
```

Stop. Don't proceed to Step 2.

**If tests pass:** Continue to Step 2.

### Step 2: Determine Base Branch

```bash
# Try common base branches
git merge-base HEAD main 2>/dev/null || git merge-base HEAD master 2>/dev/null
```

Or ask: "This branch split from main - is that correct?"

### Step 3: Present Options

Present exactly these 4 options:

```
Implementation complete. What would you like to do?

1. Merge back to <base-branch> locally
2. Push and create a Pull Request
3. Keep the branch as-is (I'll handle it later)
4. Discard this work

Which option?
```

**Don't add explanation** - keep options concise.

### Step 4: Execute Choice

#### Option 1: Merge Locally

```bash
# Switch to base branch
git checkout <base-branch>

# Pull latest
git pull

# Merge feature branch
git merge <feature-branch>

# Verify tests on merged result
<test command>

# If tests pass
git branch -d <feature-branch>
```

Then: Cleanup worktree (Step 5)

#### Option 2: Push and Create PR

```bash
# Push branch
git push -u origin <feature-branch>

# Create PR
gh pr create --title "<title>" --body "$(cat <<'EOF'
## Summary
<2-3 bullets of what changed>

## Test Plan
- [ ] <verification steps>
EOF
)"
```

Then: Cleanup worktree (Step 5)

#### Option 3: Keep As-Is

Report: "Keeping branch <name>. Worktree preserved at <path>."

**Don't cleanup worktree.**

#### Option 4: Discard

**Confirm first:**
```
This will permanently delete:
- Branch <name>
- All commits: <commit-list>
- Worktree at <path>

Type 'discard' to confirm.
```

Wait for exact confirmation.

If confirmed:
```bash
git checkout <base-branch>
git branch -D <feature-branch>
```

Then: Cleanup worktree (Step 5)

### Step 5: Cleanup Worktree

**For Options 1, 2, 4:**

Check if in worktree:
```bash
git worktree list | grep $(git branch --show-current)
```

If yes:
```bash
git worktree remove <worktree-path>
```

**For Option 3:** Keep worktree.

## Quick Reference (Existing Content - Preserved)

| Option | Merge | Push | Keep Worktree | Cleanup Branch |
|--------|-------|------|---------------|----------------|
| 1. Merge locally | ✓ | - | - | ✓ |
| 2. Create PR | - | ✓ | ✓ | - |
| 3. Keep as-is | - | - | ✓ | - |
| 4. Discard | - | - | - | ✓ (force) |

## Common Mistakes

**Skipping test verification**
- **Problem:** Merge broken code, create failing PR
- **Fix:** Always verify tests before offering options

**Open-ended questions**
- **Problem:** "What should I do next?" → ambiguous
- **Fix:** Present exactly 4 structured options

**Automatic worktree cleanup**
- **Problem:** Remove worktree when might need it (Option 2, 3)
- **Fix:** Only cleanup for Options 1 and 4

**No confirmation for discard**
- **Problem:** Accidentally delete work
- **Fix:** Require typed "discard" confirmation

## Red Flags

**Never:**
- Proceed with failing tests
- Merge without verifying tests on result
- Delete work without confirmation
- Force-push without explicit request

**Always:**
- Verify tests before offering options
- Present exactly 4 options
- Get typed confirmation for Option 4
- Clean up worktree for Options 1 & 4 only

## Integration (Existing Content - Preserved)

**Called by:**
- **subagent-driven-development** (Step 7) - After all tasks complete
- **executing-plans** (Step 5) - After all batches complete

**Pairs with:**
- **using-git-worktrees** - Cleans up worktree created by that skill

## Timeline Estimation for Finishing (Existing Content - Preserved)

| Step | AI Time | Notes |
|------|---------|-------|
| Verify tests | 2-10 min | Depends on test suite size |
| Determine base branch | 30 sec | Quick git command |
| Present options | 10 sec | Instant |
| Execute choice | 1-5 min | Merge takes longer than PR |
| Cleanup worktree | 30 sec | Quick command |

**Total: 3-16 minutes** typically

**Add this to overall project estimates.** Include verification time in all task estimates using `ai-timeline-estimation`.

## Version Metadata

### Version History
- **1.1.0** (current) - Upgraded to Skill Creator v2.4.0 specification
- **1.0.0** (original) - Initial skill creation

### Versioning Rules
- Use semantic versioning
- Increment PATCH for safe internal fixes
- Increment MINOR for backward-compatible enhancements
- Increment MAJOR for breaking structural changes