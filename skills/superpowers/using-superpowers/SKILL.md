---
name: using-superpowers
description: Use when starting any conversation - establishes how to find and use skills, requiring Skill tool invocation before ANY response including clarifying questions
version: 1.1.0
skill_schema_version: 1
deprecated: false
replaced_by: null
minimum_openclaw_version: "1.0.0"
supported_models:
  - general
preferred_model_traits:
  - strong reasoning
  - skill selection
required_tools: []
optional_tools:
  - read
risk_level: low
---

# Using Superpowers

## Purpose

Establishes how to find and use skills in OpenClaw, requiring skill tool invocation before ANY response including clarifying questions. Ensures agents use appropriate skills proactively before executing tasks.

## Trigger Contract

### Use this skill when
- Starting any conversation or receiving a new task
- The user makes a request that could benefit from specialized skills
- There is even a 1% chance a skill might apply to what you are doing
- About to enter planning or execution mode
- Receiving a request that involves writing, coding, debugging, or any task

### Do NOT use this skill when
- You were dispatched as a subagent to execute a specific task (already has focused context)
- The user's request is purely conversational/generative with no actionable task

### Inspect First
- `<available_skills>` metadata for matching skills
- Skill descriptions to determine relevance
- Task context to identify applicable domains

### Handoff To
- Specific domain skills when identified (e.g., `superpowers:brainstorming`, `mcp-builder`, etc.)
- `superpowers:writing-skills` for documentation creation
- `superpowers:test-driven-development` for TDD workflows

### Stop Conditions
- Already operating as subagent with specific task (this skill is for main agent context)
- Pure conversational response with no task (just chat)

## When Not to Use

### Common Misactivation Scenarios

**Don't use for:**
- Subagent sessions where you've already been given a specific task
- Purely social/generative conversations with no actionable component
- Direct clarification questions without first checking for applicable skills

### Alternative Approaches

| Request Type | Approach |
|--------------|----------|
| Subagent task execution | Skip skill check, proceed with task |
| Simple conversation | Skip skill check, respond naturally |
| Complex task | Check for relevant skills first |
| Unclear request | Check skills, then clarify if needed |

## Inputs

### Required Inputs
- User message or request context
- Available skills metadata (from `<available_skills>`)

### Optional Inputs
- Current conversation state
- Previous skill invocations in session

### Input Formats
- Natural language request
- Task description
- Question or clarification

## Output Contract

### Output Mode
- Skill activation announcement
- Task execution following skill guidance
- Response to user

### Required Outputs
- Announcement: "Using [skill] to [purpose]" when a skill is invoked
- Task completion following skill methodology
- Proper todo creation if skill has checklist

### Output Guarantees
- Skills are invoked BEFORE any response or action
- Even 1% chance triggers skill check
- If invoked skill is wrong, no penalty (just don't use it after checking)

### Failure Output
If skill invocation fails:
- Log the failure
- Continue with task but note the issue
- Don't block response on skill tool failure

## Minimal Context Rules

### Core Required Context

| Information | Source | Required |
|-------------|--------|----------|
| Skill name and description | `<available_skills>` | Yes |
| When to use / not use | SKILL.md Trigger Contract | Yes |
| Safety constraints | Risk Level in frontmatter | Yes |
| Expected outputs | Output Contract section | Yes |

### Context Principle

Keep core context minimal. The key guidance is simple:
1. Check for skills BEFORE responding
2. If 1% chance applies, invoke the skill
3. Announce skill usage before following it
4. User instructions override skill behavior

Any detailed skill content is loaded only AFTER triggering.

## Risk and Safety Boundaries

### Risk Level
**low** - This skill only checks for and invokes other skills; it does not execute destructive operations

### Trust Boundaries

| Boundary | Trust Level | Notes |
|----------|-------------|-------|
| Available skills metadata | Trusted | System-provided |
| Skill content | Trusted | Loaded from known paths |
| User instructions | Highest | Always override skill behavior |

### Primary Risks

| Risk | Mitigation |
|------|------------|
| Skill over-invocation | Only invoke when 1%+ chance applies |
| Ignoring user instructions | User instructions ALWAYS take precedence |
| Missing relevant skills | Conservative check - invoke if any doubt |

### Basic Safety Rules
1. User instructions always override skill behavior
2. Don't block on skill tool failures
3. Use conservative skill matching (invoke if any doubt)

## Failure Taxonomy

### Standard Failure Classes

| Class | Description | Resolution |
|-------|-------------|------------|
| skill_tool_unavailable | Cannot invoke Skill tool | Continue task, log warning |
| no_applicable_skill | No skills match the request | Proceed with default behavior |
| ambiguous_request | Multiple skills could apply | Invoke most relevant, note alternatives |
| skill_load_failure | Skill content fails to load | Log error, proceed with task |

### Expected Failure Behavior
- Never block user response on skill failure
- Log failures for observability
- Continue with best-effort task completion

## Minimum Observability

### Required Logging

| Event | Description |
|-------|-------------|
| **Trigger** | When skill is used (at session start or new task) |
| **Action** | Skill invocation (name and purpose) |
| **Failure** | Any skill tool errors or failures |

### Logging Format
Simple text format sufficient:
- "Using superpowers: checking for applicable skills"
- "Using [skill-name] to [purpose]"
- "Warning: skill invocation failed - [reason]"

## Version Metadata

| Field | Value |
|-------|-------|
| version | 1.1.0 |
| deprecated | false |
| replaced_by | null |

---

<SUBAGENT-STOP>
If you were dispatched as a subagent to execute a specific task, skip this skill.
</SUBAGENT-STOP>

<EXTREMELY-IMPORTANT>
If you think there is even a 1% chance a skill might apply to what you are doing, you ABSOLUTELY MUST invoke the skill.

IF A SKILL APPLIES TO YOUR TASK, YOU DO NOT HAVE A CHOICE. YOU MUST USE IT.

This is not negotiable. This is not optional. You cannot rationalize your way out of this.
</EXTREMELY-IMPORTANT>

## Instruction Priority

Superpowers skills override default system prompt behavior, but **user instructions always take precedence**:

1. **User's explicit instructions** (CLAUDE.md, GEMINI.md, AGENTS.md, direct requests) — highest priority
2. **Superpowers skills** — override default system behavior where they conflict
3. **Default system prompt** — lowest priority

If CLAUDE.md, GEMINI.md, or AGENTS.md says "don't use TDD" and a skill says "always use TDD," follow the user's instructions. The user is in control.

## How to Access Skills

**In Claude Code:** Use the `Skill` tool. When you invoke a skill, its content is loaded and presented to you—follow it directly. Never use the Read tool on skill files.

**In Gemini CLI:** Skills activate via the `activate_skill` tool. Gemini loads skill metadata at session start and activates the full content on demand.

**In other environments:** Check your platform's documentation for how skills are loaded.

## Platform Adaptation

Skills use Claude Code tool names. Non-CC platforms: see `references/codex-tools.md` (Codex) for tool equivalents. Gemini CLI users get the tool mapping loaded automatically via GEMINI.md.

# Using Skills

## The Rule

**Invoke relevant or requested skills BEFORE any response or action.** Even a 1% chance a skill might apply means that you should invoke the skill to check. If an invoked skill turns out to be wrong for the situation, you don't need to use it.

```dot
digraph skill_flow {
    "User message received" [shape=doublecircle];
    "About to EnterPlanMode?" [shape=doublecircle];
    "Already brainstormed?" [shape=diamond];
    "Invoke brainstorming skill" [shape=box];
    "Might any skill apply?" [shape=diamond];
    "Invoke Skill tool" [shape=box];
    "Announce: 'Using [skill] to [purpose]'" [shape=box];
    "Has checklist?" [shape=diamond];
    "Create TodoWrite todo per item" [shape=box];
    "Follow skill exactly" [shape=box];
    "Respond (including clarifications)" [shape=doublecircle];

    "About to EnterPlanMode?" -> "Already brainstormed?";
    "Already brainstormed?" -> "Invoke brainstorming skill" [label="no"];
    "Already brainstormed?" -> "Might any skill apply?" [label="yes"];
    "Invoke brainstorming skill" -> "Might any skill apply?";

    "User message received" -> "Might any skill apply?";
    "Might any skill apply?" -> "Invoke Skill tool" [label="yes, even 1%"];
    "Might any skill apply?" -> "Respond (including clarifications)" [label="definitely not"];
    "Invoke Skill tool" -> "Announce: 'Using [skill] to [purpose]'";
    "Announce: 'Using [skill] to [purpose]'" -> "Has checklist?";
    "Has checklist?" -> "Create TodoWrite todo per item" [label="yes"];
    "Has checklist?" -> "Follow skill exactly" [label="no"];
    "Create TodoWrite todo per item" -> "Follow skill exactly";
}
```

## Red Flags

These thoughts mean STOP—you're rationalizing:

| Thought | Reality |
|---------|---------|
| "This is just a simple question" | Questions are tasks. Check for skills. |
| "I need more context first" | Skill check comes BEFORE clarifying questions. |
| "Let me explore the codebase first" | Skills tell you HOW to explore. Check first. |
| "I can check git/files quickly" | Files lack conversation context. Check for skills. |
| "Let me gather information first" | Skills tell you HOW to gather information. |
| "This doesn't need a formal skill" | If a skill exists, use it. |
| "I remember this skill" | Skills evolve. Read current version. |
| "This doesn't count as a task" | Action = task. Check for skills. |
| "The skill is overkill" | Simple things become complex. Use it. |
| "I'll just do this one thing first" | Check BEFORE doing anything. |
| "This feels productive" | Undisciplined action wastes time. Skills prevent this. |
| "I know what that means" | Knowing the concept ≠ using the skill. Invoke it. |

## Skill Priority

When multiple skills could apply, use this order:

1. **Process skills first** (brainstorming, debugging) - these determine HOW to approach the task
2. **Implementation skills second** (frontend-design, mcp-builder) - these guide execution
3. **Estimation skill before any timeline** - always use `ai-timeline-estimation` before creating estimates

"Let's build X" → brainstorming first, then implementation skills.
"Fix this bug" → debugging first, then domain-specific skills.
"How long will this take?" → ai-timeline-estimation first, then answer.

## Skill Types

**Rigid** (TDD, debugging): Follow exactly. Don't adapt away discipline.

**Flexible** (patterns): Adapt principles to context.

The skill itself tells you which.

## User Instructions

Instructions say WHAT, not HOW. "Add X" or "Fix Y" doesn't mean skip workflows.