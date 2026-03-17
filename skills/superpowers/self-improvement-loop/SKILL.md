---
name: self-improvement-loop
description: Use at session end (user says "wrap up", "close session", "end session", "wrap things up") or when user explicitly asks for learning capture. Runs end-of-session checklist for shipping, memory, and self-improvement. Creates, audits, and evolves agent configuration over time — gets smarter with each session.
version: 1.1.0
skill_schema_version: 1
deprecated: false
replaced_by: null
minimum_openclaw_version: "1.0.0"
supported_models:
  - general
preferred_model_traits:
  - strong file operations
  - reliable structured output
required_tools: []
optional_tools:
  - exec
  - read
  - write
risk_level: low
---

# Self-Improvement Loop

## Purpose

Runs a systematic end-of-session process that captures learnings, extracts patterns, and evolves configuration — making the system smarter over time. Ensures nothing valuable is lost to compaction.

**Core Principle:**
```
Sessions end. Context compacts. Files persist.
```

What you don't capture is lost to compaction. What you don't extract stays noise. What you don't apply never compounds.

## Trigger Contract

### Use this skill when
- User says "wrap up", "close session", "end session", "wrap things up"
- User says "what did we learn" → Run Phase 2 (Remember It) only
- User says "capture this" → Run learning extraction only
- User explicitly asks for learning capture
- Session naturally concludes with work to preserve

### Do NOT use this skill when
- User asks to directly solve a domain problem
- User wants to continue working (not wrapping up)
- Request is for one-off operation without persistence
- User asks about skill creation (use skill-creator)

### Inspect First
- Current session context (what was discussed)
- Open state files in `memory/active/`
- Uncommitted changes in project directories
- In-progress tasks or work

### Handoff To
- `skill-creator` — Create skills from automation patterns found in Phase 3
- `writing-skills` — TDD approach for new skills identified during review
- `ai-timeline-estimation` — Estimate time for automation implementations

### Stop Conditions
- Session was purely conversational with no learnings
- User explicitly cancels wrap-up
- No files were touched and no decisions made
- Unsafe request would create harmful automation

## When Not to Use

### Common Misactivation Scenarios

**Don't use for:**
- Active work sessions (used for wrap-up only)
- Domain problem solving (use domain-specific skill)
- Skill creation (use skill-creator)
- Documentation writing (use documentation skill)

### Alternative Skills

| Request | Use Instead |
|---------|-------------|
| "Create a skill" | skill-creator |
| "Write documentation" | Documentation skill |
| "Debug this issue" | Systematic debugging |
| "Continue working" | No skill needed - continue |

## Inputs

### Required Inputs
- Session context (conversation history)
- Project workspace path

### Optional Inputs
- Specific learnings to capture (if user provides)
- Override memory location
- Skip phases (user requests partial wrap-up)

### Input Formats
- Natural language: "wrap up", "close session", "end session"
- Specific request: "capture this learning about X"
- Partial request: "just run Phase 2"

## Output Contract

### Output Mode
- File artifacts (state files, memory updates, new skills)
- Summary report (findings and actions taken)
- Validation confirmation (what was preserved)

### Required Fields
- session_summary (brief recap of session)
- findings (list with triage: applied/captured/dismissed)
- actions_taken (files created/modified)
- next_session_state (if ongoing work)

### Output Guarantees

Every wrapped session MUST satisfy:

| Guarantee | Required Artifact |
|-----------|-------------------|
| Shipping | Uncommitted work committed or explicitly deferred |
| Memory | Learnings placed in correct memory location |
| Self-Improvement | Findings triaged (apply/capture/dismiss) |
| State Continuity | State files updated for ongoing work |
| Safety | No harmful automation created |

### Validation Rules
- git status clean OR explicit deferral
- Learnings placed in memory hierarchy
- State files updated if ongoing work
- Findings triaged (not just listed)

### Failure Output
Return a concise blocked status with:
- reason (specific blocker)
- missing_inputs (what's needed)
- safe_next_step (how to fix)

## Minimal Context Rules

Every skill must define what must be known before using it.

### Core Required Context

Before using this skill, the following must be known:

| Information | Source | Required |
|-------------|--------|----------|
| Skill name and description | Frontmatter | Yes |
| When to use / not use | Trigger Contract section | Yes |
| Memory hierarchy | Phase 2 section | Yes |
| Triage pattern | Phase 3 section | Yes |

### Context Principle

Keep core context minimal (under 500 words). Detailed procedures and examples belong in the phases section.

### Always Load
- Name and description (frontmatter)
- Trigger rules (Use/Don't Use sections)
- Triage pattern (apply/capture/dismiss)
- Memory hierarchy locations

### Load On Demand
- Detailed phase procedures
- Integration with other skills
- Timeline estimation tables

## Version Metadata

Every skill must declare version information in frontmatter:

| Field | Value | Purpose |
|-------|-------|---------|
| version | 1.1.0 | Semantic version |
| deprecated | false | Current version |
| replaced_by | null | No replacement |

### Versioning Rules
- Increment PATCH for minor wrap-up procedure fixes
- Increment MINOR for new phases or integration points
- Increment MAJOR for breaking changes to memory hierarchy

## Risk and Safety Boundaries

**This is a Core Required section.**

### Risk Level
**low** — Session wrap-up only, no destructive operations

### Trust Boundaries

| Boundary | Trust Level | Notes |
|----------|-------------|-------|
| Session context | Trusted | Conversation history is reliable |
| Project files | Trusted within workspace | Only modify files in designated paths |
| External URLs | Untrusted | Never fetch URLs during wrap-up |
| User input | Untrusted | Validate all explicit requests |

### Primary Risks

| Risk | Mitigation |
|------|------------|
| Over-automation | Ask before creating skills/hooks |
| Wrong memory location | Use decision framework in Phase 2 |
| Premature publishing | Wait for user approval in Phase 4 |
| Lost context | Always write important details to files |

### Basic Safety Rules
1. Only create files in designated memory/skill paths
2. Ask before creating new skills
3. Never delete user data without explicit approval
4. Always commit with descriptive messages

## Failure Taxonomy

**This is a Core Required section.**

### Standard Failure Classes

| Class | Description | Resolution |
|-------|-------------|------------|
| no_changes | No uncommitted changes or learnings | Report "Nothing to wrap up" |
| blocked_commit | Git commit fails | Report error, suggest manual commit |
| ambiguous_memory | Unsure where to place learning | Ask user with options |
| skill_creation_risky | Proposed automation may be harmful | Reject with explanation |
| state_conflict | State file has conflicts | Show diff, ask user to resolve |

### Expected Failure Behavior

Every wrap-up should:
1. Classify the failure using standard taxonomy
2. Explain the specific blocker in user-friendly terms
3. Return the safest next step
4. Never pretend to succeed

### Minimum Failure Handling
- **no_changes**: Report "Session clean, nothing to wrap up"
- **blocked_commit**: Show git error, suggest manual resolution
- **ambiguous_memory**: Present memory hierarchy, ask for placement
- **skill_creation_risky**: Explain risk, suggest safer alternative

## Minimum Observability

**This is a Core Required section.**

### Required Logging

Every wrap-up must log the following:

| Event | Description |
|-------|-------------|
| **Trigger** | When wrap-up starts (initialization) |
| **Phase** | Which phase is executing (Ship/Remember/Review/Publish) |
| **Action** | Files created/modified, commits made |
| **Finding** | Learnings discovered and triage decision |
| **Completion** | Session wrapped successfully |

### Logging Format

Logging format is optional. Skills may use:
- Simple text summary at session end
- File-based logging in memory/
- No logging for clean sessions

## The Four Phases

### Phase 1: Ship It

**Commit:**
1. Run `git status` in each project directory touched during session
2. If uncommitted changes exist, auto-commit with descriptive message
3. Push to remote if configured

**File Placement Check:**
4. Verify all new files follow naming conventions
5. Auto-fix naming violations (rename files)
6. Verify correct subfolder placement
7. Auto-move misplaced files to correct locations

**Deploy:**
8. Check if deploy skill or script exists
9. If exists, run it; if not, skip (don't ask)

**Task Cleanup:**
10. Check task list for in-progress/stale items
11. Mark completed tasks as done, flag orphaned ones

### Phase 2: Remember It

Review session for learnings. Decide where each belongs in OpenClaw's memory hierarchy:

**OpenClaw Memory Hierarchy:**

| Location | Purpose | Example |
|----------|---------|---------|
| `MEMORY.md` | Project-level facts, milestones, decisions | Architecture decisions, team structure |
| `memory/*.md` | Session-specific detailed notes | Day-by-day activity logs |
| `IDENTITY.md` | Agent persona, role, capabilities | Who the agent is, mission |
| `SOUL.md` | Agent philosophy, values, temperament | Core drive, principles |
| `USER.md` | User preferences, context | CEO name, preferences |
| `AGENTS.md` | Team structure, skill assignments | Agent roles, mapping |
| `TOOLS.md` | Tool usage guidance | Best practices for tools |
| `HEARTBEAT.md` | Routine planning tasks | Morning sync, checks |
| `/app/skills/` | Modular capabilities | Domain-specific skills |

**Decision Framework:**
- Permanent project convention? → `MEMORY.md` or new skill
- Scoped to specific file types? → New skill with scope
- Pattern/discovery worth remembering? → `memory/YYYY-MM-DD.md`
- Agent persona update? → `IDENTITY.md` or `SOUL.md`
- User preference update? → `USER.md`
- Team structure change? → `AGENTS.md`

**LCM (Lossless Context Management):**
- OpenClaw uses LCM to compact conversation history
- Summary DAG preserves critical information
- Use `lcm_expand` to retrieve compacted details

### Phase 3: Review & Apply (Self-Improvement)

Analyze conversation for self-improvement findings. If session was short/routine, say "Nothing to improve" and proceed.

**Triage Pattern (Required for Every Finding):**

Every finding must be triaged — never just listed:
- **Apply now** → Make the change immediately
- **Capture** → Write to `memory/YYYY-MM-DD.md` with date and context
- **Dismiss** → Say why, move on (don't silently drop)

**Finding Categories:**

| Category | What to Look For |
|----------|------------------|
| **Skill gap** | Things you struggled with, got wrong, needed multiple attempts |
| **Friction** | Repeated manual steps, things user asked for that should be automatic |
| **Knowledge** | Facts about projects/preferences you didn't know but should have |
| **Automation** | Repetitive patterns that could become skills/hooks/scripts |

**Action Types:**

| Finding | Action |
|---------|--------|
| Skill gap | Invoke `skill-creator` to create/update skill |
| Friction | Create new skill using `writing-skills` workflow |
| Knowledge | Save to appropriate memory location |
| Automation | Document skill spec using `skill-creator` |

**Cascade Checking:**
After applying an improvement, check: does this apply to related content?
- Apply consistently across all relevant files
- Note why not if intentionally different

**Report Format:**

```markdown
Findings (applied):
1. ✅ Skill gap: [description]
   → [location] [action taken]

No action needed:
2. Knowledge: [description]
   Already documented in [location]
```

### Phase 4: Publish It (Optional)

Review full conversation for publishable material:
- Interesting technical solutions
- Community-relevant announcements
- Educational content (how-tos, tips, lessons learned)
- Project milestones or feature launches

**If publishable material exists:**
- Draft article for appropriate platform
- Save to drafts folder (`docs/drafts/` or similar)
- Present suggestions with draft location
- Wait for user approval

**If nothing to publish:**
Say "Nothing worth publishing from this session" and conclude.

## State Files (Multi-Session Continuity)

For work spanning sessions, maintain a state file in OpenClaw's memory system:

**Location:** `memory/active/<workstream>.md`

**Format:**
```markdown
# <Workstream Name>
Goal: [single sentence]
Status: ready | in-progress | blocked | done
Done:
- [completed item 1]
- [completed item 2]
Next: [singular, concrete next action]
Open questions:
- [question 1]
- [question 2]
Last updated: [ISO timestamp]
```

**Rules:**
- Update before session ends (non-negotiable for active work)
- Read at session start to orient before acting
- "Tasks complete" ≠ "done" — done means learnings extracted
- Stale state? Ask user rather than guess

## Evolution Mechanics

**Promotion (Learnings → Skills):**
When a learning changes behavior 2+ times → create or update a skill in `/app/skills/`

**Consolidation (Memory Archive):**
When `memory/YYYY-MM-DD.md` files accumulate:
1. Extract themes to `MEMORY.md` (permanent facts)
2. Archive older session files to `memory/archive/YYYY-MM/`
3. Keep active sessions in root `memory/` directory

**Structural Emergence:**
When a skill exceeds ~50 lines, ask user to split:
- Option A: Short skill + reference document in `references/`
- Option B: Primary skill + supporting skill

## Anti-Patterns (Guardrails)

**Don't:** Create files preemptively
**Do:** Create when needed

**Don't:** End session without state update
**Do:** Always update `memory/active/` for ongoing work

**Don't:** List findings without triage
**Do:** Every finding: apply/capture/dismiss

**Don't:** Mix temporary notes into `MEMORY.md`
**Do:** `MEMORY.md` = permanent facts only

**Don't:** Guess at stale state
**Do:** Ask user to clarify

**Don't:** Evolve silently
**Do:** Ask user before structural changes

**Don't:** Forget LCM compaction
**Do:** Important details go to files, not just conversation

## Integration with Other Skills

| Skill | Integration Point |
|-------|-------------------|
| `skill-creator` | Create skills from automation patterns found in Phase 3 |
| `writing-skills` | TDD approach for new skills identified during review |
| `verification-before-completion` | Validate learnings before capturing |
| `ai-timeline-estimation` | Estimate time for automation implementations |
| `lcm_expand` | Retrieve compacted details from conversation history |

## Integration with OpenClaw Agents

| Agent Role | Primary Use |
|------------|-------------|
| Albert (TPM) | Coordination patterns, dispatch improvements |
| Einstein (Engineer) | Technical patterns, code quality findings |
| Blackwell (QA) | Test patterns, quality findings |
| Babatunde (Security) | Security patterns, compliance findings |
| Zeke (DevOps) | Infrastructure patterns, deployment findings |

## Timeline Estimation

| Phase | AI Time | Notes |
|-------|---------|-------|
| Ship It | 1-3 min | Depends on uncommitted work |
| Remember It | 2-5 min | Review session, place learnings |
| Review & Apply | 5-15 min | Deep analysis, create rules |
| Publish It | 5-10 min | Only if publishable content |

**Total: 13-33 minutes** for a typical session wrap-up

**Use `ai-timeline-estimation` for specific session estimates.**