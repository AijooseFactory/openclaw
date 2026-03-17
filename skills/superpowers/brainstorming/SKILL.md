---
name: brainstorming
description: "Use when exploring user intent, requirements and design before implementation. Helps turn ideas into fully formed designs through collaborative dialogue, presents multiple approaches, and produces complexity assessments."
version: 1.1.0
skill_schema_version: 1
deprecated: false
replaced_by: null
minimum_openclaw_version: "1.0.0"
supported_models:
  - general
preferred_model_traits:
  - strong reasoning
  - creativity
required_tools: []
optional_tools:
  - web_search
  - web_fetch
risk_level: low
---

# Brainstorming Ideas Into Designs

Help turn ideas into fully formed designs and specs through natural collaborative dialogue.

Start by understanding the current project context, then ask questions one at a time to refine the idea. Once you understand what you're building, present the design and get user approval.

<HARD-GATE>
Do NOT invoke any implementation skill, write any code, scaffold any project, or take any implementation action until you have presented a design and the user has approved it. This applies to EVERY project regardless of perceived simplicity.
</HARD-GATE>

## Anti-Pattern: "This Is Too Simple To Need A Design"

Every project goes through this process. A todo list, a single-function utility, a config change — all of them. "Simple" projects are where unexamined assumptions cause the most wasted work. The design can be short (a few sentences for truly simple projects), but you MUST present it and get approval.

## Checklist

You MUST create a task for each of these items and complete them in order:

1. **Explore project context** — check files, docs, recent commits
2. **Offer visual companion** (if topic will involve visual questions) — this is its own message, not combined with a clarifying question. See the Visual Companion section below.
3. **Ask clarifying questions** — one at a time, understand purpose/constraints/success criteria
4. **Propose 2-3 approaches** — with trade-offs and your recommendation
5. **Present design** — in sections scaled to their complexity, get user approval after each section
6. **Write design doc** — save to `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md` and commit
7. **Spec review loop** — dispatch spec-document-reviewer subagent with precisely crafted review context (never your session history); fix issues and re-dispatch until approved (max 5 iterations, then surface to human)
8. **User reviews written spec** — ask user to review the spec file before proceeding
9. **Transition to implementation** — invoke writing-plans skill to create implementation plan

## Process Flow

```dot
digraph brainstorming {
    "Explore project context" [shape=box];
    "Visual questions ahead?" [shape=diamond];
    "Offer Visual Companion\n(own message, no other content)" [shape=box];
    "Ask clarifying questions" [shape=box];
    "Propose 2-3 approaches" [shape=box];
    "Present design sections" [shape=box];
    "User approves design?" [shape=diamond];
    "Write design doc" [shape=box];
    "Spec review loop" [shape=box];
    "Spec review passed?" [shape=diamond];
    "User reviews spec?" [shape=diamond];
    "Invoke writing-plans skill" [shape=doublecircle];

    "Explore project context" -> "Visual questions ahead?";
    "Visual questions ahead?" -> "Offer Visual Companion\n(own message, no other content)" [label="yes"];
    "Visual questions ahead?" -> "Ask clarifying questions" [label="no"];
    "Offer Visual Companion\n(own message, no other content)" -> "Ask clarifying questions";
    "Ask clarifying questions" -> "Propose 2-3 approaches";
    "Propose 2-3 approaches" -> "Present design sections";
    "Present design sections" -> "User approves design?";
    "User approves design?" -> "Present design sections" [label="no, revise"];
    "User approves design?" -> "Write design doc" [label="yes"];
    "Write design doc" -> "Spec review loop";
    "Spec review loop" -> "Spec review passed?";
    "Spec review passed?" -> "Spec review loop" [label="issues found,\nfix and re-dispatch"];
    "Spec review passed?" -> "User reviews spec?" [label="approved"];
    "User reviews spec?" -> "Write design doc" [label="changes requested"];
    "User reviews spec?" -> "Invoke writing-plans skill" [label="approved"];
}
```

**The terminal state is invoking writing-plans.** Do NOT invoke frontend-design, mcp-builder, or any other implementation skill. The ONLY skill you invoke after brainstorming is writing-plans.

## The Process

**Understanding the idea:**

- Check out the current project state first (files, docs, recent commits)
- Before asking detailed questions, assess scope: if the request describes multiple independent subsystems (e.g., "build a platform with chat, file storage, billing, and analytics"), flag this immediately. Don't spend questions refining details of a project that needs to be decomposed first.
- If the project is too large for a single spec, help the user decompose into sub-projects: what are the independent pieces, how do they relate, what order should they be built? Then brainstorm the first sub-project through the normal design flow. Each sub-project gets its own spec → plan → implementation cycle.
- For appropriately-scoped projects, ask questions one at a time to refine the idea
- Prefer multiple choice questions when possible, but open-ended is fine too
- Only one question per message - if a topic needs more exploration, break it into multiple questions
- Focus on understanding: purpose, constraints, success criteria

**Exploring approaches:**

- Propose 2-3 different approaches with trade-offs
- Present options conversationally with your recommendation and reasoning
- Lead with your recommended option and explain why

**Presenting the design:**

- Once you believe you understand what you're building, present the design
- Scale each section to its complexity: a few sentences if straightforward, up to 200-300 words if nuanced
- Ask after each section whether it looks right so far
- Cover: architecture, components, data flow, error handling, testing
- Be ready to go back and clarify if something doesn't make sense

**Design for isolation and clarity:**

- Break the system into smaller units that each have one clear purpose, communicate through well-defined interfaces, and can be understood and tested independently
- For each unit, you should be able to answer: what does it do, how do you use it, and what does it depend on?
- Can someone understand what a unit does without reading its internals? Can you change the internals without breaking consumers? If not, the boundaries need work
- Smaller, well-bounded units are also easier for you to work with - you reason better about code you can hold in context at once, and your edits are more reliable when files are focused. When a file grows large, that's often a signal that it's doing too much

**Working in existing codebases:**

- Explore the current structure before proposing changes. Follow existing patterns
- Where existing code has problems that affect the work (e.g., a file that's grown too large, unclear boundaries, tangled responsibilities), include targeted improvements as part of the design - the way a good developer improves code they're working in
- Don't propose unrelated refactoring. Stay focused on what serves the current goal

## After the Design

**Documentation:**

- Write the validated design (spec) to `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md`
  - (User preferences for spec location override this default)
- Use elements-of-style:writing-clearly-and-concisely skill if available
- Commit the design document to git

**Spec Review Loop:**
After writing the spec document:

1. Dispatch spec-document-reviewer subagent (see spec-document-reviewer-prompt.md)
2. If Issues Found: fix, re-dispatch, repeat until Approved
3. If loop exceeds 5 iterations, surface to human for guidance

**User Review Gate:**
After the spec review loop passes, ask the user to review the written spec before proceeding:

> "Spec written and committed to `<path>`. Please review it and let me know if you want to make any changes before we start writing out the implementation plan."

Wait for the user's response. If they request changes, make them and re-run the spec review loop. Only proceed once the user approves.

**Implementation:**

- Invoke the writing-plans skill to create a detailed implementation plan
- Do NOT invoke any other skill. writing-plans is the next step.

## Complexity Assessment (for Estimation)

During design, assess complexity to feed into timeline estimation:

| Complexity | Indicators | AI Est. Range |
|------------|------------|---------------|
| Trivial | Single file, config change, typo fix | 15-30 min |
| Small | Single function, simple endpoint | 30 min - 2 hours |
| Medium | 3-5 components, CRUD API | 2-6 hours |
| Large | Multi-service, complex business logic | 6-12 hours |
| Major | New service, significant refactor | 1-3 days |
| Epic | Platform migration, system redesign | 3-10 days |

**Include this assessment in the design doc.** When transitioning to writing-plans, the planner will use `ai-timeline-estimation` to validate and refine these estimates with overhead, verification cycles, and buffer.

## Key Principles

- **One question at a time** - Don't overwhelm with multiple questions
- **Multiple choice preferred** - Easier to answer than open-ended when possible
- **YAGNI ruthlessly** - Remove unnecessary features from all designs
- **Explore alternatives** - Always propose 2-3 approaches before settling
- **Incremental validation** - Present design, get approval before moving on
- **Be flexible** - Go back and clarify when something doesn't make sense

## Visual Companion

A browser-based companion for showing mockups, diagrams, and visual options during brainstorming. Available as a tool — not a mode. Accepting the companion means it's available for questions that benefit from visual treatment; it does NOT mean every question goes through the browser.

**Offering the companion:** When you anticipate that upcoming questions will involve visual content (mockups, layouts, diagrams), offer it once for consent:
> "Some of what we're working on might be easier to explain if I can show it to you in a web browser. I can put together mockups, diagrams, comparisons, and other visuals as we go. This feature is still new and can be token-intensive. Want to try it? (Requires opening a local URL)"

**This offer MUST be its own message.** Do not combine it with clarifying questions, context summaries, or any other content. The message should contain ONLY the offer above and nothing else. Wait for the user's response before continuing. If they decline, proceed with text-only brainstorming.

**Per-question decision:** Even after the user accepts, decide FOR EACH QUESTION whether to use the browser or the terminal. The test: **would the user understand this better by seeing it than reading it?**

- **Use the browser** for content that IS visual — mockups, wireframes, layout comparisons, architecture diagrams, side-by-side visual designs
- **Use the terminal** for content that is text — requirements questions, conceptual choices, tradeoff lists, A/B/C/D text options, scope decisions

A question about a UI topic is not automatically a visual question. "What does personality mean in this context?" is a conceptual question — use the terminal. "Which wizard layout works better?" is a visual question — use the browser.

If they agree to the companion, read the detailed guide before proceeding:
`skills/brainstorming/visual-companion.md`

---

## Purpose

The brainstorming skill serves as the front-door to all creative work: creating features, building components, adding functionality, or modifying behavior. It ensures that before any implementation begins, the user's intent is fully understood, requirements are clarified, and a design exists that has been reviewed and approved.

This skill transforms raw ideas into fully formed designs through collaborative dialogue, produces complexity assessments for timeline estimation, and enforces a hard gate that prevents implementation until design approval is obtained.

---

## Trigger Contract

### Use this skill when
- The user wants to create a new feature, component, or functionality
- The user asks to "brainstorm" ideas or explore design options
- The user requests help thinking through or designing something
- The user mentions building, creating, adding, or implementing something new
- The user asks about approaches or solutions for a problem
- Any creative/implementation work is requested

### Do NOT use this skill when
- The user is asking to fix a bug (use systematic-debugging)
- The user wants to write tests (use test-driven-development)
- The user wants to execute an existing plan (use executing-plans)
- The user wants to request code review (use requesting-code-review)
- The user asks about git operations, documentation, or administrative tasks

### Inspect First
- Current project context (files, docs, recent commits)
- Whether the request involves multiple independent subsystems requiring decomposition
- User preferences for design doc location

### Handoff To
- `superpowers:systematic-debugging` for bug fixing
- `superpowers:test-driven-development` for test creation
- `superpowers:writing-plans` after design approval
- `superpowers:subagent-driven-development` if subagent coordination needed

### Stop Conditions
- User explicitly declines to proceed with design phase
- Request is unsafe or would create harmful content
- Missing required context to proceed (refuse to guess)

---

## When Not to Use

### Common Misactivation Scenarios

**Don't use for:**
- Bug fixes and debugging tasks
- Refactoring existing code (unless part of new feature design)
- Writing tests (use TDD skill)
- Executing existing plans
- Code review requests
- Documentation updates
- Git or administrative tasks

### Alternative Skills

| Request | Use Instead |
|---------|-------------|
| "Fix this bug" | systematic-debugging |
| "Write tests" | test-driven-development |
| "Execute plan" | executing-plans |
| "Refactor this" | systematic-debugging or specific refactor guidance |
| "Review code" | requesting-code-review |
| "Check status" | No skill needed - just execute |

---

## Inputs

### Required Inputs
- User request for new feature/functionality/design exploration
- Project context (can be explored during skill execution)

### Optional Inputs
- User preferences for design doc location
- Existing constraints or requirements
- Budget/timeline concerns
- Technical stack preferences

### Input Formats
- Natural language description of what user wants to build
- Open-ended exploration of user needs
- Clarifying questions answered by user

---

## Output Contract

### Output Mode
- Interactive dialogue (questions, proposals, design sections)
- File artifact: Design document at `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md`
- Skill invocation: writing-plans after approval

### Required Fields
- Design sections with incremental approval requests
- 2-3 approaches with trade-offs and recommendation
- Complexity assessment table
- Architecture and component breakdown
- Data flow and error handling considerations

### Output Guarantees
| Guarantee | Required Artifact |
|-----------|-------------------|
| Design approval | User approves each design section before proceeding |
| Documented spec | Design written to file before spec review |
| Spec review | Spec review subagent invoked before user review |
| Skill transition | Only writing-plans invoked after completion |

### Validation Rules
- Must request user approval before proceeding to implementation
- Must propose multiple approaches (minimum 2)
- Must write design document before spec review
- Must invoke spec review subagent (max 5 iterations)
- Must get user sign-off on written spec
- Must invoke writing-plans as final action

### Failure Output
If unable to proceed:
- Explain what information is missing
- Request clarification on ambiguous points
- Suggest alternative skill ifrequest is out of scope
- Never proceed to implementation without design approval

---

## Risk and Safety Boundaries

### Risk Level
**low** — This skill only produces design documents and does not execute any implementation or destructive operations

### Trust Boundaries

| Boundary | Trust Level | Notes |
|----------|-------------|-------|
| User input | Untrusted | Validate scope, clarify before proceeding |
| Design decisions | User-owned | User approval required at each step |
| File writes | Constrained | Only writes to docs/superpowers/specs/ |
| Git commits | User-approved | Only commits design doc after explicit approval |
| Skill invocations | Strict | Only invokes writing-plans, no other implementation |

### Primary Risks

| Risk | Mitigation |
|------|------------|
| Premature implementation | Hard gate enforced - no code written before approval |
| Scope creep | Assess scope first, decompose if needed |
| Misunderstanding requirements | Ask questions one at a time, validate understanding |
| User bypass | Explicit approval required for each section |

### Basic Safety Rules
1. Never write any code or implementation during brainstorming
2. Never invoke implementation skills (frontend-design, mcp-builder, etc.)
3. Always get explicit user approval before moving to next phase
4. If user requests implementation without design, remind of hard gate

---

## Failure Taxonomy

### Standard Failure Classes

| Class | Description | Resolution |
|-------|-------------|------------|
| missing_input | User request too vague or incomplete | Ask clarifying questions one at a time |
| ambiguous_trigger | Request could mean multiple things | Clarify whether they want design exploration |
| unsupported_request | Request for bug fixing, testing, etc. | Handoff to appropriate skill |
| scope_too_large | Project requires decomposition | Help decompose into sub-projects |
| user_abort | User declines to continue design | Acknowledge, stop, no implementation |

### Expected Failure Behavior
- Ask clarifying questions until intent is clear
- Detect when project needs decomposition and suggest it
- Refuse to proceed if asked for implementation without design
- Properly classify and communicate failures

### Minimum Failure Handling
- **missing_input**: Ask one focused clarifying question
- **ambiguous_trigger**: Offer to clarify scope and intent
- **unsupported_request**: Suggest correct skill with explanation
- **scope_too_large**: Propose decomposition into sub-projects

---

## Minimal Context Rules

### Core Required Context

| Information | Source | Required |
|-------------|--------|----------|
| Skill name and purpose | Frontmatter | Yes |
| Hard gate constraint | SKILL.md body | Yes |
| Process flow | Process Flow diagram | Yes |
| Approval requirements | When Not to Use section | Yes |

### Context Principle
Keep core context minimal. The skill involves interactive dialogue, so context is built incrementally through questions.

### Always Load
- Frontmatter (name, description)
- Hard gate instruction
- Process checklist
- Key principles

### Load On Demand
- Visual companion guide (if user accepts)
- Spec document reviewer prompt
- Complexity assessment table

---

## Minimum Observability

### Required Logging

| Event | Description |
|-------|-------------|
| **Trigger** | When brainstorming skill activates |
| **Question** | Each clarifying question asked |
| **Proposal** | Approaches presented to user |
| **Approval** | Design section approvals |
| **Document** | Design doc written and committed |
| **Spec Review** | Spec review invocation and result |
| **Transition** | Writing-plans skill invoked |
| **Failure** | Any failure with classification |

### Logging Format
Simple text logs or optional structured format. Key events tracked for session review.

---

## Version Metadata

| Field | Value | Purpose |
|-------|-------|---------|
| version | 1.1.0 | Current skill version |
| skill_schema_version | 1 | Schema version for compatibility |
| deprecated | false | Not deprecated |
| replaced_by | null | No replacement |
| minimum_openclaw_version | 1.0.0 | Minimum required version |

### Versioning Rules
- Use semantic versioning
- Increment PATCH for bug fixes
- Increment MINOR for new features
- Increment MAJOR for breaking changes