---
name: using-git-worktrees
description: Use when starting feature work that needs isolation from current workspace or before executing implementation plans - creates isolated git worktrees with smart directory selection and safety verification
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

# Using Git Worktrees

## Purpose

Creates isolated git worktrees for feature development that needs workspace isolation, enabling parallel work on multiple branches without switching. Provides systematic directory selection with safety verification to prevent accidental git pollution.

## Trigger Contract

### Use this skill when
- User wants to start feature work needing isolation from current workspace
- User asks to set up a new branch in an isolated worktree
- Implementation plan execution requires clean workspace
- User mentions "worktree", "isolated workspace", or "new branch" together
- Any brainstorming phase completion requires isolated workspace
- Any subagent-driven-development or executing-plans skill needs to start

### Do NOT use this skill when
- User only wants to switch branches (use `git checkout` instead)
- User needs a quick temporary directory (use `mktemp` or temp folder)
- User is already in an appropriately isolated worktree
- Repository doesn't support worktrees (old git versions <2.5)

### Inspect First
- Existing worktree directories (.worktrees or worktrees)
- Project's CLAUDE.md for worktree preferences
- Git version (verify >= 2.5)
- Project type (Node.js, Rust, Python, Go) for setup detection

### Handoff To
- `finishing-a-development-branch` when work is complete and cleanup is needed

### Stop Conditions
- Git version < 2.5 (worktrees not supported)
- Repository has uncommitted changes that would prevent worktree creation
- Target directory already exists as a worktree
- Insufficient permissions to create directories

## When Not to Use

### Common Misactivation Scenarios

**Don't use for:**
- Simple branch switching (use `git checkout`)
- Temporary file operations (use system temp directory)
- Single isolated commit (use `git stash` or `git worktree add` temporarily)
- Projects with corrupted .git directory

### Alternative Skills

| Request | Use Instead |
|---------|-------------|
| "Switch to another branch" | git checkout directly |
| "Just create a temp directory" | mktemp or system temp |
| "Quick stash changes" | git stash |
| "Clean up current branch" | finishing-a-development-branch |

## Inputs

### Required Inputs
- Branch name to create and work on
- Feature or task name (for reporting)

### Optional Inputs
- Preferred worktree location (from CLAUDE.md or user)
- Specific setup commands (if non-standard project)

### Input Formats
- Branch name: string (valid git branch name)
- Project location: auto-detected from git rev-parse

## Output Contract

### Output Mode
- Worktree directory created at specified location
- Terminal in new worktree directory
- Project dependencies installed
- Test baseline verified

### Required Outputs
- Worktree path (absolute)
- Test results summary
- Confirmation message with feature name

### Output Guarantees
- Worktree is valid git worktree
- Directory is ignored in parent repository (project-local)
- Initial setup commands ran successfully
- Test baseline passes (or failure reported)

### Failure Output
Return a concise blocked status with:
- reason (specific validation error)
- missing inputs (what's needed)
- guarantee violations (which guarantees not met)
- safe next step (how to fix)

## Risk and Safety Boundaries

**Risk Level:** medium - Creates directories and runs project setup commands

### Trust Boundaries

| Boundary | Trust Level | Notes |
|----------|-------------|-------|
| User input | Untrusted | Validate branch names, sanitize paths |
| Git repository | Trusted | Assumes well-formed git repo |
| Project files | Trusted within project | Runs setup defined in project |
| External URLs | Untrusted | Never fetches URLs during worktree setup |

### Primary Risks

| Risk | Mitigation |
|------|------------|
| Worktree contents tracked | Verify directory is gitignored before creation |
| Wrong directory creation | Follow priority: existing > CLAUDE.md > ask |
| Test failure masking | Always run baseline tests, report results |
| Path injection | Validate paths don't escape intended location |
| Accidental data loss | Worktrees are separate directories, low risk |

### Basic Safety Rules
1. Always verify project-local directory is gitignored before creating worktree
2. Run baseline tests before declaring ready
3. Report failures clearly, ask before proceeding
4. Never overwrite existing worktrees without confirmation
5. Follow CLAUDE.md preferences when present

## Failure Taxonomy

### Standard Failure Classes

| Class | Description | Resolution |
|-------|-------------|------------|
| missing_input | Branch name not provided | Request branch name from user |
| git_too_old | Git version < 2.5 | Inform user upgrade required |
| uncommitted_changes | Repo has uncommitted changes | Commit or stash before proceeding |
| directory_exists | Target worktree already exists | Offer to use existing or choose different name |
| permission_denied | Cannot create target directory | Request different path or permissions |
| ignore_failed | Directory not gitignored (project-local) | Add to .gitignore and commit before proceeding |
| setup_failed | Project setup commands failed | Report failures, ask whether to proceed |
| tests_failed | Baseline tests fail | Report failures, ask whether to proceed |

### Expected Failure Behavior

Every worktree creation should:
1. Classify the failure using standard taxonomy
2. Explain the specific blocker in user-friendly terms
3. Return the safest next step
4. Never pretend to succeed

## Minimal Context Rules

### Core Required Context

Before using this skill, the following must be known:

| Information | Source | Required |
|-------------|--------|----------|
| Branch name to create | User input | Yes |
| Feature/task name | User input | Yes |
| Worktree location preference | CLAUDE.md or user | Yes |
| Git version | `git --version` | Yes |
| Project type | File detection | No (auto-detected) |

### Context Principle

Keep core context minimal (under 500 words). Anything detailed or situational belongs in:
- Expanded Context Loading Plan (for complex projects)
- Reference files (for schemas, examples, procedures)
- Scripts (for deterministic execution)

## Minimum Observability

### Required Logging

This skill logs the following:

| Event | Description |
|-------|-------------|
| **Trigger** | When worktree creation is initiated |
| **Action** | Directory creation, setup commands, test run |
| **Failure** | Any error or failure condition that occurs |

### Logging Format

Simple text logs describing:
- Worktree location chosen
- Commands executed
- Test results
- Any failures encountered

## Overview

Git worktrees create isolated workspaces sharing the same repository, allowing work on multiple branches simultaneously without switching.

**Core principle:** Systematic directory selection + safety verification = reliable isolation.

**Announce at start:** "I'm using the using-git-worktrees skill to set up an isolated workspace."

## Directory Selection Process

Follow this priority order:

### 1. Check Existing Directories

```bash
# Check in priority order
ls -d .worktrees 2>/dev/null     # Preferred (hidden)
ls -d worktrees 2>/dev/null      # Alternative
```

**If found:** Use that directory. If both exist, `.worktrees` wins.

### 2. Check CLAUDE.md

```bash
grep -i "worktree.*director" CLAUDE.md 2>/dev/null
```

**If preference specified:** Use it without asking.

### 3. Ask User

If no directory exists and no CLAULE.md preference:

```
No worktree directory found. Where should I create worktrees?

1. .worktrees/ (project-local, hidden)
2. ~/.config/superpowers/worktrees/<project-name>/ (global location)

Which would you prefer?
```

## Safety Verification

### For Project-Local Directories (.worktrees or worktrees)

**MUST verify directory is ignored before creating worktree:**

```bash
# Check if directory is ignored (respects local, global, and system gitignore)
git check-ignore -q .worktrees 2>/dev/null || git check-ignore -q worktrees 2>/dev/null
```

**If NOT ignored:**

Per Jesse's rule "Fix broken things immediately":
1. Add appropriate line to .gitignore
2. Commit the change
3. Proceed with worktree creation

**Why critical:** Prevents accidentally committing worktree contents to repository.

### For Global Directory (~/.config/superpowers/worktrees)

No .gitignore verification needed - outside project entirely.

## Creation Steps

### 1. Detect Project Name

```bash
project=$(basename "$(git rev-parse --show-toplevel)")
```

### 2. Create Worktree

```bash
# Determine full path
case $LOCATION in
  .worktrees|worktrees)
    path="$LOCATION/$BRANCH_NAME"
    ;;
  ~/.config/superpowers/worktrees/*)
    path="~/.config/superpowers/worktrees/$project/$BRANCH_NAME"
    ;;
esac

# Create worktree with new branch
git worktree add "$path" -b "$BRANCH_NAME"
cd "$path"
```

### 3. Run Project Setup

Auto-detect and run appropriate setup:

```bash
# Node.js
if [ -f package.json ]; then npm install; fi

# Rust
if [ -f Cargo.toml ]; then cargo build; fi

# Python
if [ -f requirements.txt ]; then pip install -r requirements.txt; fi
if [ -f pyproject.toml ]; then poetry install; fi

# Go
if [ -f go.mod ]; then go mod download; fi
```

### 4. Verify Clean Baseline

Run tests to ensure worktree starts clean:

```bash
# Examples - use project-appropriate command
npm test
cargo test
pytest
go test ./...
```

**If tests fail:** Report failures, ask whether to proceed or investigate.

**If tests pass:** Report ready.

### 5. Report Location

```
Worktree ready at <full-path>
Tests passing (<N> tests, 0 failures)
Ready to implement <feature-name>
```

## Quick Reference

| Situation | Action |
|-----------|--------|
| `.worktrees/` exists | Use it (verify ignored) |
| `worktrees/` exists | Use it (verify ignored) |
| Both exist | Use `.worktrees/` |
| Neither exists | Check CLAULE.md → Ask user |
| Directory not ignored | Add to .gitignore + commit |
| Tests fail during baseline | Report failures + ask |
| No package.json/Cargo.toml | Skip dependency install |

## Common Mistakes

### Skipping ignore verification

- **Problem:** Worktree contents get tracked, pollute git status
- **Fix:** Always use `git check-ignore` before creating project-local worktree

### Assuming directory location

- **Problem:** Creates inconsistency, violates project conventions
- **Fix:** Follow priority: existing > CLAULE.md > ask

### Proceeding with failing tests

- **Problem:** Can't distinguish new bugs from pre-existing issues
- **Fix:** Report failures, get explicit permission to proceed

### Hardcoding setup commands

- **Problem:** Breaks on projects using different tools
- **Fix:** Auto-detect from project files (package.json, etc.)

## Example Workflow

```
You: I'm using the using-git-worktrees skill to set up an isolated workspace.

[Check .worktrees/ - exists]
[Verify ignored - git check-ignore confirms .worktrees/ is ignored]
[Create worktree: git worktree add .worktrees/auth -b feature/auth]
[Run npm install]
[Run npm test - 47 passing]

Worktree ready at /Users/jesse/myproject/.worktrees/auth
Tests passing (47 tests, 0 failures)
Ready to implement auth feature
```

## Red Flags

**Never:**
- Create worktree without verifying it's ignored (project-local)
- Skip baseline test verification
- Proceed with failing tests without asking
- Assume directory location when ambiguous
- Skip CLAULE.md check

**Always:**
- Follow directory priority: existing > CLAULE.md > ask
- Verify directory is ignored for project-local
- Auto-detect and run project setup
- Verify clean test baseline

## Integration

**Called by:**
- **brainstorming** (Phase 4) - REQUIRED when design is approved and implementation follows
- **subagent-driven-development** - REQUIRED before executing any tasks
- **executing-plans** - REQUIRED before executing any tasks
- Any skill needing isolated workspace

**Pairs with:**
- **finishing-a-development-branch** - REQUIRED for cleanup after work complete