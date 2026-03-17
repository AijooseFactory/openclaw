---
name: skill-creator
description: Create, edit, improve, or audit AgentSkills. Use when creating a new skill from scratch or when asked to improve, review, audit, tidy up, or clean up an existing skill or SKILL.md file. Also use when editing or restructuring a skill directory (moving files to references/ or scripts/, removing stale content, validating against the AgentSkills spec). Triggers on phrases like "create a skill", "author a skill", "tidy up a skill", "improve this skill", "review the skill", "clean up the skill", "audit the skill".
version: 2.0.0
skill_schema_version: 1
deprecated: false
replaced_by: null
minimum_openclaw_version: "1.0.0"
supported_models:
  - general
preferred_model_traits:
  - strong tool calling
  - reliable structured output
required_tools: []
optional_tools: []
risk_level: low
---

# Skill Creator

## Purpose

The Skill Creator Skill is a meta-skill for OpenClaw that helps design, generate, validate, and package high-quality OpenClaw skills. Its job is not just to write SKILL.md files. Its job is to produce durable, safe, well-routed, evaluation-ready skills that work reliably in real agent environments.

This implementation is designed to produce a top-tier skill engineering system, not a simple skill scaffolding tool.

## Trigger Contract

### Use this skill when
- The user asks to create a new OpenClaw skill from scratch
- The user asks to improve, review, audit, or clean up an existing skill
- The request involves SKILL.md structure, skill packaging, or skill validation
- The user says "create a skill", "author a skill", "tidy up a skill", "improve this skill"
- The user asks about skill anatomy, progressive disclosure, or skill organization

### Do NOT use this skill when
- The user is asking to directly solve a domain problem rather than create a reusable skill
- The request is only for one-off writing with no reusable skill intent
- The user wants to create documentation that is not a skill (use documentation skill)
- The task is about configuring existing software (use appropriate configuration skill)

### Inspect First
- Existing skill directory structure
- Current frontmatter fields
- Existing scripts, references, and assets
- Validation requirements from package_skill.py

### Handoff To
- `superpowers:writing-skills` for TDD-based skill creation methodology
- `superpowers:test-driven-development` if the skill requires test development
- Documentation skill for prose-only documentation (not skills)

### Stop Conditions
- Missing required source material for a requested refactor
- Unsafe request that would create harmful tooling
- Request conflicts with OpenClaw security policies

## When Not to Use

### Common Misactivation Scenarios

**Don't use for:**
- One-off solutions that won't be reused
- Standard practices well-documented elsewhere (link instead)
- Project-specific conventions (put in project CLAUDE.md)
- Mechanical constraints that can be automated (regex, validation)
- Direct domain problem solving (use domain-specific skill)

### Alternative Skills

| Request | Use Instead |
|---------|-------------|
| "Write documentation" | Documentation skill |
| "Fix this bug" | Systematic debugging |
| "Create a test" | Test-driven development |
| "Explain this code" | No skill needed - just respond |
| "Configure this tool" | Tool-specific skill |

## Inputs

### Required Inputs
- Skill intent (what the skill should do)
- Use cases or examples of how the skill will be triggered

### Optional Inputs
- Existing skill to improve (path or content)
- Domain-specific requirements
- Preferred scripts, references, or assets
- Risk level preference
- Evaluation tier preference

### Input Formats
- Natural language description
- Draft skill content (markdown)
- Example requests and expected behaviors
- Reference skills or patterns to follow

## Output Contract

### Output Mode
- File artifact (skill directory)
- Validation summary
- Known limitations report

### Required Fields
- skill name (valid identifier)
- purpose (clear description)
- trigger contract (use/don't use/inspect/handoff/stop)
- output contract
- risk level (low/medium/high/critical)

### Validation Rules
- frontmatter must parse as valid YAML
- name field must be valid skill identifier (lowercase, hyphens)
- description must start with "Use when" or "Use for"
- required sections must exist (Purpose, Trigger Contract)
- references must resolve if listed

### Failure Output
Return a concise blocked status with:
- reason (specific validation error)
- missing inputs (what's needed)
- safe next step (how to fix)

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

### Context Principle

Keep core context minimal (under 500 words). Anything detailed or situational belongs in:
- Expanded Context Loading Plan (for complex skills)
- Reference files (for schemas, examples, procedures)
- Scripts (for deterministic execution)

## Version Metadata

Every skill must declare version information in frontmatter:

| Field | Required | Purpose |
|-------|----------|---------|
| version | Yes | Semantic version (MAJOR.MINOR.PATCH) |
| deprecated | Yes | Whether this version is deprecated |
| replaced_by | Yes (if deprecated) | Name of replacement skill |

### Versioning Rules
- Use semantic versioning
- Increment PATCH for safe internal fixes
- Increment MINOR for backward-compatible enhancements
- Increment MAJOR for breaking structural changes

## Risk and Safety Boundaries

**This is a Core Required section.** Every skill must define its safety posture.

### Risk Level
**low** - Skills create documentation, no destructive operations

### Trust Boundaries

| Boundary | Trust Level | Notes |
|----------|-------------|-------|
| User input | Untrusted | Validate skill names, sanitize descriptions |
| Workspace files | Trusted within skill directory | Only create files in designated skill path |
| External URLs | Untrusted | Never fetch URLs during skill creation |
| Third-party content | Untrusted | Don't include external content without validation |
| Tool results | Trusted | Validation scripts are trusted |

### Primary Risks

| Risk | Mitigation |
|------|------------|
| Path traversal | Validate skill paths stay within designated directory |
| Arbitrary code in scripts | Scripts run in isolation, document security implications |
| Data exfiltration | Never send skill content externally |
| Unsafe file operations | Fail closed on unresolved references |
| Prompt injection | Description field validated for malicious patterns |

### Basic Safety Rules
1. Only create files in designated skill paths
2. Validate all inputs before processing
3. Fail closed on ambiguous or unsafe inputs
4. Never overwrite without confirmation

## Failure Taxonomy

**This is a Core Required section.** Every skill must define a standard way to fail.

### Standard Failure Classes

| Class | Description | Resolution |
|-------|-------------|------------|
| missing_input | Required input not provided | Request missing input from user |
| ambiguous_trigger | Trigger description unclear | Clarify triggering conditions |
| unsupported_request | Request outside skill scope | Handoff to appropriate skill |
| permission_denied | Cannot write to target path | Request different path or permissions |
| tool_unavailable | Validation scripts not found | Check skill installation |
| validation_failure | Skill fails validation | Fix specific validation errors |
| safety_block | Request would create harmful content | Reject with explanation |

### Expected Failure Behavior

Every skill creation should:
1. Classify the failure using standard taxonomy
2. Explain the specific blocker in user-friendly terms
3. Return the safest next step
4. Never pretend to succeed

### Minimum Failure Handling
- **missing_input**: Request missing input with example format
- **ambiguous_trigger**: Ask clarifying question with options
- **unsupported_request**: Suggest appropriate skill to handoff
- **safety_block**: Explain violation, provide safe alternative

## Minimum Observability

**This is a Core Required section.** Every skill must define minimum observability requirements.

### Required Logging

Every skill must log the following:

| Event | Description |
|-------|-------------|
| **Trigger** | When the skill is activated (initialization) |
| **Action** | The primary action taken by the skill |
| **Failure** | Any error or failure condition that occurs |

### Logging Format

Logging format is **optional**. Skills may use:
- Simple text logs
- Structured JSON format
- Framework-native logging

### Relationship to Advanced Observability

This minimum observability section is separate from the **Observability Expansion** (advanced section). Advanced topics like metrics, tracing, and detailed debugging belong in expanded context loading, not in core required definitions.

## Skill Anatomy

Every skill consists of a required SKILL.md file and optional bundled resources:

```
skill-name/
├── SKILL.md (required)
│   ├── YAML frontmatter metadata (required)
│   │   ├── name: (required)
│   │   └── description: (required)
│   └── Markdown instructions (required)
└── Bundled Resources (optional)
    ├── scripts/          - Executable code (Python/Bash/etc.)
    ├── references/       - Documentation loaded as needed
    └── assets/           - Files used in output (templates, etc.)
```

### SKILL.md (required)
- **Frontmatter (YAML):** Contains `name` and `description` fields. Only fields that Codex reads to determine when skill triggers.
- **Body (Markdown):** Instructions and guidance for using the skill. Only loaded AFTER skill triggers.

### scripts/ (optional)
Executable code for tasks that require deterministic reliability or are repeatedly rewritten.
- When to include: Same code rewritten repeatedly, deterministic reliability needed
- Example: `scripts/rotate_pdf.py` for PDF rotation tasks

### references/ (optional)
Documentation loaded as needed to inform Codex's process and thinking.
- When to include: Documentation that Codex should reference while working
- Examples: Schema docs, API docs, domain knowledge
- Best practice: If files are large (>10k words), include grep search patterns in SKILL.md

### assets/ (optional)
Files not intended to be loaded into context, but used in output Codex produces.
- When to include: Files needed in final output
- Examples: Templates, images, icons, boilerplate code

### tests/ (optional)
Skill validation tests ensuring the skill functions correctly.
- When to include: Skills that need automated validation of behavior
- Examples: Unit tests, integration tests, smoke tests
- Best practice: Include at minimum smoke tests for core functionality

### evals/ (optional)
Evaluation criteria and baselines for measuring skill performance.
- When to include: Skills requiring measurable quality benchmarks
- Examples: Evaluation prompts, expected outputs, scoring rubrics
- Best practice: Define clear success criteria and edge cases

### CHANGELOG.md (optional)
Version history and changes for the skill.
- When to include: Skills with ongoing maintenance and version tracking
- Contents: Version numbers, dates, changes, deprecation notices
- Format: Keep in reverse chronological order (newest first)

### What NOT to Include in a Skill

A skill should only contain essential files that directly support its functionality. Do NOT create extraneous documentation or auxiliary files, including:

- README.md
- INSTALLATION_GUIDE.md
- QUICK_REFERENCE.md
- CHANGELOG.md
- etc.

The skill should only contain the information needed for an AI agent to do the job at hand. It should not contain auxiliary context about the process that went into creating it, setup and testing procedures, user-facing documentation, etc.

## Execution Rules

### Skill Creation Workflow

Follow these steps in order, skipping only if there is a clear reason:

#### Step 1: Understanding the Skill with Concrete Examples

Skip this step only when skill's usage patterns are already clearly understood.

To create an effective skill, understand concrete examples of how the skill will be used:

Questions to ask:
- "What functionality should this skill support?"
- "Can you give examples of how this skill would be used?"
- "What would a user say that should trigger this skill?"

Conclude this step when there's a clear sense of the functionality the skill should support.

#### Step 2: Planning Reusable Skill Contents

Analyze each example by:
1. Considering how to execute on the example from scratch
2. Identifying what scripts, references, and assets would be helpful

**Example analysis:**
- `pdf-editor` skill: Rotating PDF requires rewriting same code → `scripts/rotate_pdf.py`
- `big-query` skill: Querying requires re-discovering schemas → `references/schema.md`

#### Step 3: Initializing the Skill

Always run `init_skill.py` for new skills:

```bash
scripts/init_skill.py <skill-name> --path <output-directory> [--resources scripts,references,assets]
```

This generates template skill directory with proper structure.

#### Step 4: Editing the Skill

Write instructions that are beneficial and non-obvious to Codex. Include procedural knowledge, domain-specific details, or reusable assets.

**Consult these references:**
- `references/workflows.md` for sequential workflows
- `references/output-patterns.md` for template patterns

#### Step 5: Packaging the Skill

Run validation and packaging:

```bash
scripts/package_skill.py <path/to/skill-folder> [output-directory]
```

The script validates then packages into `.skill` file.

#### Step 6: Iterate

After testing, users may request improvements. Notice struggles, update skill, test again.

## Expanded Context Loading Plan

**This section is Conditional.** Include for skills with references, scripts, or complex context needs.

### Progressive Disclosure Design

Skills use a three-level loading system to manage context efficiently:

1. **Metadata (name + description)** - Always in context (~100 words)
2. **SKILL.md body** - When skill triggers (<5k words)
3. **Bundled resources** - As needed by Codex (Unlimited because scripts can be executed without reading into context window)

### Always Load
- Name and description (frontmatter)
- Trigger rules (Use/Don't Use sections)
- Safety constraints
- Output contract

### Load On Demand
- Examples and long procedures
- Extended references
- Schemas and troubleshooting guides
- Advanced patterns

### Cacheable
- Tool definitions
- Reusable schemas
- Standard templates

### Fresh Each Run
- User request details
- File system state
- External tool results
- Runtime environment facts

### Token Efficiency Guidelines

**Target word counts:**
- Frequently-loaded skills: <200 words total
- Standard skills: <500 words
- Reference files: Include summary card at top for quick scanning

**Techniques:**
- Move details to tool help (--help) instead of documenting all flags
- Use cross-references to other skills instead of repeating
- Compress examples to minimal viable version
- Eliminate redundancy across files

#### Progressive Disclosure Patterns

Keep SKILL.md body to the essentials and under 500 lines to minimize context bloat. Split content into separate files when approaching this limit. When splitting out content into other files, it is very important to reference them from SKILL.md and describe clearly when to read them, to ensure the reader of the skill knows they exist and when to use them.

**Key principle:** When a skill supports multiple variations, frameworks, or options, keep only the core workflow and selection guidance in SKILL.md. Move variant-specific details (patterns, examples, configuration) into separate reference files.

**Pattern 1: High-level guide with references**

```markdown
# PDF Processing

## Quick start

Extract text with pdfplumber:
[code example]

## Advanced features

- **Form filling**: See [FORMS.md](FORMS.md) for complete guide
- **API reference**: See [REFERENCE.md](REFERENCE.md) for all methods
- **Examples**: See [EXAMPLES.md](EXAMPLES.md) for common patterns
```

Codex loads FORMS.md, REFERENCE.md, or EXAMPLES.md only when needed.

**Pattern 2: Domain-specific organization**

For Skills with multiple domains, organize content by domain to avoid loading irrelevant context.

**Pattern 3: Conditional details**

Show basic content, link to advanced content.

**Important guidelines:**
- **Avoid deeply nested references** - Keep references one level deep from SKILL.md
- **Structure longer reference files** - For files longer than 100 lines, include a table of contents at the top

## Core Principles

### Concise is Key

The context window is a public good. Skills share the context window with everything else Codex needs: system prompt, conversation history, other Skills' metadata, and the actual user request.

**Default assumption: Codex is already very smart.** Only add context Codex doesn't already have. Challenge each piece of information: "Does Codex really need this explanation?" and "Does this paragraph justify its token cost?"

Prefer concise examples over verbose explanations.

### Set Appropriate Degrees of Freedom

Match the level of specificity to the task's fragility and variability:

**High freedom (text-based instructions)**: Use when multiple approaches are valid, decisions depend on context, or heuristics guide the approach.

**Medium freedom (pseudocode or scripts with parameters)**: Use when a preferred pattern exists, some variation is acceptable, or configuration affects behavior.

**Low freedom (specific scripts, few parameters)**: Use when operations are fragile and error-prone, consistency is critical, or a specific sequence must be followed.

## References

### Internal References
- `references/workflows.md` - Sequential workflows and conditional logic patterns
- `references/output-patterns.md` - Template and example patterns
- `references/trigger-contract-template.md` - Trigger contract templates
- `references/output-contract-template.md` - Output contract templates
- `references/failure-taxonomy.md` - Full failure taxonomy reference
- `references/safety-boundaries.md` - Safety boundaries by risk level

### External References
- OpenClaw AgentSkills specification
- Claude Code skill best practices
- MCP tool integration guide

### Related Skills
- `superpowers:writing-skills` - TDD approach to skill creation
- `superpowers:test-driven-development` - General TDD methodology

## Tool Contract (Conditional)

**This section is Conditional.** Include for skills that use tools.

When a skill uses tools, define a clear contract to ensure reliable operation:

### Required vs Optional Tools

```markdown
required_tools:
  - read      # Core file reading capability
  - write     # Core file writing capability

optional_tools:
  - exec      # For running validation scripts
  - browser   # For web-based interactions
```

### Tool Usage Patterns

Document how tools should be used:

| Tool | Usage Pattern | Failure Handling |
|------|---------------|------------------|
| read | Always validate path before reading | Fail closed if path outside skill directory |
| write | Confirm before overwriting existing files | Request explicit confirmation |
| exec | Use timeout for long-running commands | Capture output, return partial on timeout |

### Failure Handling for Tool Unavailability

When required tools are unavailable:

1. **Detect**: Check tool availability at skill initialization
2. **Classify**: Use `tool_unavailable` failure class
3. **Communicate**: Explain which tool is missing and why it's required
4. **Suggest**: Provide safe next steps (install tool, use alternative, handoff)

```markdown
### Tool Unavailable Response
- Required tool missing: "This skill requires [tool] which is not available. Alternative: [suggestion] or handoff to [skill]."
- Optional tool missing: Continue without optional functionality, log warning.
```

## Observability Expansion (Advanced)

**This section is Advanced.** Build upon minimum observability for production-ready skills.

### Structured Logging Formats

For skills requiring detailed logging, use structured format:

```json
{
  "timestamp": "2024-01-15T10:30:00Z",
  "level": "info|warn|error",
  "skill": "skill-name",
  "event": "trigger|action|failure",
  "details": {
    "action": "file_created",
    "path": "/path/to/file",
    "duration_ms": 150
  }
}
```

### Metrics and Tracing Concepts

Key metrics to track:

| Metric | Purpose | Collection |
|--------|---------|------------|
| trigger_count | How often skill activates | Every trigger |
| success_rate | Percentage of successful executions | On completion |
| execution_time | Time from trigger to completion | On completion |
| failure_type | Distribution of failure types | On failure |

### Debugging Hooks

Include debugging capabilities for troubleshooting:

- **Verbose mode**: Enable detailed logging via flag
- **Dry run**: Execute without side effects to test
- **State inspection**: Expose intermediate state for debugging

### Performance Monitoring Patterns

- Set timeouts for long-running operations
- Log progress for operations > 5 seconds
- Track token usage for context-heavy operations
- Monitor for regression in execution time

## Evaluation Tiering (Advanced)

**This section is Advanced.** Define evaluation tiers for different testing scenarios.

### Tier 0: Smoke Tests (Always Run)

Run on every skill change, even minor fixes.

- Verify skill loads without errors
- Check trigger contract works
- Validate basic output format

```
tests/smoke/
├── test_loads.yaml      # Skill loads successfully
├── test_triggers.yaml   # Trigger conditions work
└── test_output.yaml     # Basic output format valid
```

### Tier 1: Standard Tests (Run on Changes)

Run when skill content changes.

- Validate all input handling
- Test output contract compliance
- Verify safety constraints

```
tests/
├── test_inputs.yaml     # All input formats handled
├── test_outputs.yaml    # Output meets contract
└── test_safety.yaml     # Safety constraints enforced
```

### Tier 2: Comprehensive Tests (Pre-Release)

Run before releasing new skill versions.

- Edge case coverage
- Cross-model compatibility
- Failure mode verification
- Performance benchmarks

```
tests/
├── test_edge_cases.yaml # Boundary conditions
├── test_failure.yaml    # All failure paths work correctly
└── test_performance.yaml # Meets performance targets
```

### Tier 3: Stress Tests (Periodic)

Run periodically or before major releases.

- High-volume execution
- Concurrent invocation
- Long-running stability

```
tests/stress/
├── test_volume.yaml     # Handle high request volume
├── test_concurrency.yaml # Concurrent execution
└── test_stability.yaml  # Long-running stability
```

## Model Behavior Profile (Conditional)

**This section is Conditional.** Document model-specific behavior for skills withparticular model requirements.

### Model Assumptions

Document what the skill assumes about the model:

```markdown
**Assumed capabilities:**
- Structured output (JSON/YAML)
- Tool calling with detailed parameters
- Long context handling (>100k tokens)

**Prompting style:**
- Works well with explicit step-by-step instructions
- Follows examples precisely
```

### Known Model Limitations

Document known limitations to help users:

| Limitation | Workaround |
|------------|------------|
| Limited JSON precision | Use string representations for exact numbers |
| Truncates long inputs | Chunk inputs > 10k words |
| Inconsistent with dates | Use ISO 8601 format explicitly |

### Alternative Model Behaviors

Document expected behavior variations across models:

```markdown
**Behavior by model:**
- **Default model**: Full capability, standard timing
- **Fast model**: May skip optional validation steps
- **Vision model**: Can process images in referenced assets
```

## Version and Compatibility Notes

### Breaking Change Definitions

A breaking change includes:

1. **Structural changes** - SKILL.md schema modifications
2. **Trigger changes** - Modified use/don't use conditions
3. **Output changes** - Altered output contract format
4. **Tool requirement changes** - New required tools added
5. **Semantic changes** - Changed behavior users depend on

### Migration Guidance

When making backward-incompatible changes:

```markdown
## Migration from 1.x to 2.0

### What changed
- Field `description` renamed to `purpose`
- New required field `risk_level`

### How to migrate
1. Rename existing `description` field to `purpose`
2. Add `risk_level: low|medium|high|critical`
3. Validate with: `scripts/validate_skill.py`

### Compatibility
- 2.0 skills work with OpenClaw >= 1.0.0
- 1.x skills continue to work until 3.0.0
```

### Deprecation Policy

Deprecation timeline:

| Stage | Notice | Action |
|-------|--------|--------|
| Announced | Version noted as deprecated | Document replacement |
| Legacy | Still functional but flagged | Recommend migration |
| Removed | No longer functional | Remove in next major |

Always maintain deprecated skills for at least one major version cycle.