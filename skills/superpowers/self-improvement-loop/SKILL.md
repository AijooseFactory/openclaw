---
name: self-improvement-loop
description: Use at session end (user says "wrap up", "close session", "end session", "wrap things up") or when user explicitly asks for learning capture. Runs end-of-session checklist for shipping, memory, and self-improvement. Creates, audits, and evolves agent configuration over time — gets smarter with each session.
version: 1.0.0
risk_level: low
---

# Self-Improvement Loop (OpenClaw)

Every session is an opportunity to improve. This skill runs a systematic end-of-session process that captures learnings, extracts patterns, and evolves configuration — making the system smarter over time.

## The Core Principle

```
Sessions end. Context compacts. Files persist.
```

What you don't capture is lost to compaction. What you don't extract stays noise. What you don't apply never compounds.

## When to Use

| Trigger | Action |
|---------|--------|
| User says "wrap up" | Run full end-of-session checklist |
| User says "close session" | Run full end-of-session checklist |
| User says "end session" | Run full end-of-session checklist |
| User says "what did we learn" | Run Phase 2 (Remember It) |
| User says "capture this" | Run learning extraction |
| User says "wrap things up" | Run full end-of-session checklist |

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
| `MEMORY.md` | Project-level facts, milestones, decisions | Architecture decisions, team structure, infrastructure facts |
| `memory/*.md` | Session-specific detailed notes | Day-by-day activity logs, detailed decisions |
| `IDENTITY.md` | Agent persona, role, capabilities | Who the agent is, mission, capabilities |
| `SOUL.md` | Agent philosophy, values, temperament | Core drive, principles, communication style |
| `USER.md` | User preferences, context | CEO name, preferences, infrastructure |
| `AGENTS.md` | Team structure, skill assignments | Agent roles, skill-to-role mapping |
| `TOOLS.md` | Tool usage guidance | Best practices for available tools |
| `HEARTBEAT.md` | Routine planning tasks | Morning sync, periodic checks |
| `/app/skills/` | Modular capabilities | Domain-specific skills, superpowers |

**Decision Framework:**
- Permanent project convention? → `MEMORY.md` or new skill in `/app/skills/`
- Scoped to specific file types? → New skill with `description` specifying scope
- Pattern/discovery worth remembering? → `memory/YYYY-MM-DD.md` with detailed context
- Agent persona update? → `IDENTITY.md` or `SOUL.md`
- User preference update? → `USER.md`
- Team structure change? → `AGENTS.md`

**LCM (Lossless Context Management):**
- OpenClaw uses LCM to compact conversation history into summaries
- Summary DAG preserves critical information across compaction
- Use `lcm_expand` to retrieve compacted details when needed

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
| Skill gap | Invoke `skill-creator` to create/update skill, or update `AGENTS.md` |
| Friction | Create new skill using `writing-skills` workflow |
| Knowledge | Save to appropriate memory location (`MEMORY.md`, `memory/`, `USER.md`) |
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