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

---

## Improvement Loop (Advanced)

**This section is Advanced.** Define how skills can be improved iteratively through baseline vs. challenger evaluation.

### Baseline vs. Challenger Workflow

Skills improve through a structured evaluation loop:

```
┌─────────────────────────────────────────────────────────────┐
│                    IMPROVEMENT LOOP                          │
├─────────────────────────────────────────────────────────────┤
│  1. BASELINE: Current skill version (the "champion")        │
│         ↓                                                   │
│  2. CHALLENGER: Candidate improvements (proposed changes)   │
│         ↓                                                   │
│  3. EVALUATE: Run both against evaluation suite              │
│         ↓                                                   │
│  4. COMPARE: Binary pass/fail on evaluation criteria        │
│         ↓                                                   │
│  5. DECIDE: Promote challenger / Keep baseline / Iterate    │
└─────────────────────────────────────────────────────────────┘
```

### Generating Candidate Improvements

When improving a skill, generate challengers by addressing specific weakness:

| Weakness | Improvement Strategy |
|----------|---------------------|
| Low trigger accuracy | Refine trigger conditions, add negative patterns |
| Missing edge cases | Add handling for identified edge cases |
| Poor output quality | Enhance examples, add output validation |
| Safety gaps | Add safety checks, stricter validation |
| Performance issues | Optimize prompts, reduce context |

### Concrete Example: Baseline vs. Challenger

**Baseline (v1.2.0):**
```yaml
description: "Use when user asks to create a skill from scratch"
```

**Challenger (v1.2.1):**
```yaml
description: "Use when user asks to create OpenClaw skill from scratch"
  # Added "OpenClaw" for specificity
```

**Evaluation:**
| Criterion | Baseline | Challenger | Pass? |
|-----------|----------|------------|-------|
| Trigger fires on valid requests | 95% | 95% | ✅ |
| No false triggers | 80% | 90% | ✅ |
| Total score | - | - | **PASS** |

### Test Criteria for Comparison

Every improvement evaluation uses the same test suite:

1. **Same benchmarks**: Both baseline and challenger run identical evaluation prompts
2. **Same scoring**: Binary pass/fail criteria applied equally
3. **Same environment**: Model, temperature, tools held constant
4. **Same threshold**: Must exceed baseline or meet defined minimum

### Promotion Decision Process

```
┌─────────────────────────────────────────┐
│         PROMOTION DECISION              │
├─────────────────────────────────────────┤
│                                         │
│  Challenger passes all tests?           │
│       ↓                                 │
│  ┌─────┴─────┐                          │
│  YES         NO                         │
│  ↓           ↓                          │
│  Promote    Keep baseline               │
│  to vX.Y.Z  and iterate                │
│                                         │
│  Rules:                                │
│  • All tests must pass (binary)        │
│  • No regression on any criterion      │
│  • Net improvement required            │
└─────────────────────────────────────────┘
```

---

## Evaluation Criteria (Advanced)

**This section is Advanced.** Define measurable criteria for evaluating skill quality.

### Correctness Criteria (Pass/Fail)

| Criterion | Test Method | Pass Condition |
|-----------|-------------|----------------|
| Valid YAML frontmatter | Parse frontmatter | No parse errors |
| Valid skill name | Regex test `^[a-z][a-z0-9-]*$` | Matches pattern |
| Required sections exist | Check section headers | All core sections present |
| Trigger fires correctly | Test prompts | Fires on valid, not on invalid |
| Output format correct | Validate output structure | Matches contract |

### Performance Criteria (Measurable Thresholds)

| Criterion | Measurement | Pass Threshold |
|-----------|-------------|----------------|
| Execution latency | Time from trigger to output | < 5 seconds |
| Token usage | Total context tokens | < 10,000 tokens |
| Load time | Time to parse skill | < 500ms |
| Memory usage | Peak memory during execution | < 100MB |

### Safety Criteria (Binary Pass/Fail)

| Criterion | Test Method | Pass Condition |
|-----------|-------------|----------------|
| No harmful outputs | Run safety filter on output | No harmful content detected |
| Input validation | Test with malicious inputs | Rejects safely |
| Path traversal prevention | Test with `../` paths | Blocked, no escape |
| No prompt injection | Test with injection patterns | Sanitized or rejected |

### User Satisfaction Criteria (Measurable)

| Criterion | Measurement | Pass Threshold |
|-----------|-------------|----------------|
| Task completion rate | % of requests fully completed | > 90% |
| Failure classification | Failures match taxonomy | 100% classified |
| Helpfulness rating | Manual evaluation | > 4/5 (if measured) |
| Escalation rate | % requiring handoff | < 10% |

---

## Promotion and Rollback Rules (Advanced)

**This section is Advanced.** Define how to promote or rollback skill versions based on evaluation results.

### Promotion Criteria

A skill version can be promoted when:

| Requirement | Description |
|-------------|-------------|
| All tests pass | 100% of evaluation suite passes |
| No regressions | All criteria meet or exceed baseline |
| Safety verified | Safety tests pass without exceptions |
| Audit trail exists | All changes documented in evals/ |

### Rollback Triggers

Automatically rollback when:

| Trigger | Detection Method | Action |
|---------|------------------|--------|
| Regression detected | Challenger scores below baseline | Revert to baseline |
| User reports issues | User complaint filed | Investigate, rollback if confirmed |
| Safety failure | Safety test fails in production | Immediate rollback to safe version |
| Critical bug | Error rate spikes > 5% | Hotfix rollback |

### Version Tagging Convention

| Tag | Meaning | When Applied |
|-----|---------|---------------|
| `baseline` | Current production version | After promotion |
| `challenger` | Candidate under evaluation | During improvement loop |
| `promoted` | Successfully promoted | After promotion decision |
| `rolled-back` | Reverted due to failure | After rollback triggered |

### Audit Trail Requirements

Every promotion/rollback must document:

```yaml
# evals/audit.yaml
promotion_log:
  - version: 1.2.1
    date: "2024-01-15T10:30:00Z"
    type: promoted
    challenger_hash: "abc123"
    baseline_hash: "def456"
    results:
      correct: 100
      performance: pass
      safety: pass
    reviewer: agent
```

---

## Binary-First Scoring (Advanced)

**This section is Advanced.** Define scoring rules that enable automated decisions without subjectivity.

### Pass/Fail Criteria (Not Subjective Scores)

Every evaluation criterion must be binary:

| Criterion Type | Scoring | Example |
|----------------|---------|---------|
| Correctness | PASS/FAIL | "Does YAML parse?" → YES/NO |
| Safety | PASS/FAIL | "Any harmful output?" → YES/NO |
| Performance | PASS/FAIL | "Latency < 5s?" → YES/NO |

**Never use:**
- "4 out of 5" scores
- "Good enough" thresholds
- Subjective quality ratings
- Averages that mask failures

### Measurable Thresholds

Use explicit bounds, not ranges:

| Metric | Pass | Fail |
|--------|------|------|
| Parse time | ≤ 500ms | > 500ms |
| Test accuracy | = 100% | < 100% |
| False trigger rate | = 0% | > 0% |
| Token usage | ≤ 10,000 | > 10,000 |

### Explicit Pass/Fail Examples

**Example 1: Trigger Evaluation**
```
Input: "create a new skill"
Expected: fires
Result: PASS (baseline and challenger both fire)

Input: "write me a story"  
Expected: does NOT fire
Result: PASS (baseline blocks), FAIL (challenger fires incorrectly)
→ Challenger FAILS promotion
```

**Example 2: Output Validation**
```
Output: Valid SKILL.md structure
Check: All required fields present
Result: PASS/FAIL (binary)
```

### When Binary Isn't Possible

For inherently subjective qualities, use bounded scales:

| Quality | Bounded Scale | Pass Threshold |
|---------|---------------|----------------|
| Readability | 1-5 (integers only) | ≥ 3 |
| Example quality | 1-5 (integers only) | ≥ 4 |
| Completeness | 0-100% | = 100% |

**Rule:** Bounded scales only when binary is genuinely impossible. Default to binary.

---

## evals/ Directory Convention (Advanced)

**This section is Advanced.** Define the evaluation directory structure for skill improvement.

### Directory Structure

```
skill-name/
├── evals/
│   ├── baseline/           # Baseline evaluation files
│   │   ├── prompts.yaml    # Evaluation prompts
│   │   ├── expected.yaml   # Expected outputs
│   │   └── results/       # Historical results
│   │       ├── eval-1.2.0.yaml
│   │       └── eval-1.1.0.yaml
│   ├── challenger/         # Challenger evaluation files
│   │   ├── prompts.yaml    # Candidate prompts
│   │   ├── expected.yaml  # Expected outputs
│   │   └── results/       # Pending results
│   ├── scoring/            # Scoring scripts
│   │   ├── score.py       # Main scoring logic
│   │   └── thresholds.yaml # Pass/fail thresholds
│   ├── README.md          # Evaluation methodology
│   └── audit.yaml         # Promotion/rollback log
```

### What Goes in evals/

| Directory | Contents | Purpose |
|-----------|----------|---------|
| `baseline/` | Current version's evaluation set | Reference for comparison |
| `challenger/` | Candidate improvements | Testing ground |
| `scoring/` | Automated scoring | Binary pass/fail determination |
| `results/` | Historical scores | Audit trail |

### Baseline Evaluation Files

**evals/baseline/prompts.yaml:**
```yaml
trigger_tests:
  - input: "create a new skill"
    should_fire: true
  - input: "fix this bug"
    should_fire: false

output_tests:
  - name: valid_yaml
    check: frontmatter parses
  - name: required_sections
    check: all core sections present
```

### Challenger Evaluation Files

**evals/challenger/prompts.yaml:**
```yaml
# Same structure as baseline - ensures fair comparison
trigger_tests:
  - input: "create a new skill"
    should_fire: true
  - input: "fix this bug"
    should_fire: false
```

### Scoring Script Example

**evals/scoring/score.py:**
```python
def evaluate(baseline_path, challenger_path, thresholds):
    baseline = load_results(baseline_path)
    challenger = load_results(challenger_path)
    
    results = {}
    for criterion in thresholds:
        baseline_pass = baseline[criterion] >= thresholds[criterion]
        challenger_pass = challenger[criterion] >= thresholds[criterion]
        
        results[criterion] = {
            'baseline': baseline_pass,
            'challenger': challenger_pass,
            'promote': challenger_pass and not regression(baseline, challenger)
        }
    
    return results
```

### Result History Format

**evals/baseline/results/eval-1.2.0.yaml:**
```yaml
version: 1.2.0
date: "2024-01-15T10:30:00Z"
results:
  trigger_accuracy: PASS
  output_validity: PASS
  safety_check: PASS
  performance: PASS
overall: PASS
```

### Running Evaluations

```bash
# Run baseline evaluation
python evals/scoring/score.py --eval baseline --version 1.2.0

# Run challenger evaluation  
python evals/scoring/score.py --eval challenger --version 1.2.1

# Compare and decide
python evals/scoring/compare.py --baseline 1.2.0 --challenger 1.2.1
```

---

## Composition Rules (Conditional)

**This section is Conditional.** Include when skills need to work with other skills in composition patterns.

### Composition Patterns

Skills can compose with other skills in several patterns:

| Pattern | Description | Use Case |
|---------|-------------|----------|
| **Chain** | Output of skill A becomes input to skill B | Sequential processing, pipeline workflows |
| **Parallel** | Multiple skills execute simultaneously on same input | Independent operations on shared data |
| **Fallback** | Primary skill fails, secondary skill attempts | Error recovery, graceful degradation |
| **Decorator** | Skill wraps another skill's behavior | Pre/post processing, validation wrapping |

### Chain Pattern Example

```
User Request → [Skill A: Extract] → [Skill B: Transform] → [Skill C: Output]
```

```yaml
# In SKILL.md, document chaining behavior:
composes_with:
  - skill: "data-extract"
    as: "source"
  - skill: "data-transform"
    as: "processor"
  - skill: "data-output"
    as: "destination"
```

### Dependency Declarations

Explicitly declare dependencies to avoid circular references and manage load order:

```yaml
dependencies:
  requires:
    - "core-file-tools"    # Required for basic operations
  recommends:
    - "validation-skill"   # Enhances output quality
  conflicts:
    - "legacy-skill"       # Cannot coexist in same context
```

### Conflict Resolution

When skills have overlapping triggers or conflicting behaviors:

| Resolution Strategy | When to Use |
|---------------------|-------------|
| **More specific wins** | Primary skill has more precise trigger conditions |
| **Priority ordering** | Explicit priority field determines order |
| **Cooperative mode** | Both skills execute, outputs merged |
| **Exclusive mode** | Only one skill activates per request |

### When to Split vs Compose

**Split into separate skills when:**
- Skills have distinct trigger conditions
- Each skill can function independently
- Different teams maintain each skill
- Testing requires isolation

**Compose skills when:**
- Skills always used together
- Shared state between skills
- Composition is a reusable pattern
- Combined skills form a higher-level abstraction

---

## MCP Readiness (Conditional)

**This section is Conditional.** Include when skills need Model Context Protocol integration.

### MCP Tool Exposure Patterns

Expose skill capabilities through MCP tools for external system integration:

```yaml
mcp_tools:
  - name: "skill-create"
    description: "Create a new OpenClaw skill"
    input_schema:
      type: object
      properties:
        name:
          type: string
          pattern: "^[a-z][a-z0-9-]*$"
        purpose:
          type: string
        trigger_phrases:
          type: array
          items:
            type: string
      required: ["name", "purpose"]

  - name: "skill-validate"
    description: "Validate an existing skill"
    input_schema:
      type: object
      properties:
        path:
          type: string
      required: ["path"]
```

### Resource Declarations

Declare resources the skill exposes via MCP:

```yaml
mcp_resources:
  - uri: "skill://{skill_name}/info"
    description: "Skill metadata endpoint"
    mime_type: "application/json"

  - uri: "skill://{skill_name}/schema"
    description: "Skill input/output schema"
    mime_type: "application/json"
```

### Server Compatibility Requirements

Define MCP server requirements:

```yaml
mcp_requirements:
  server_version: ">=1.0.0"
  capabilities:
    - tools
    - resources
    - prompts
  authentication: none  # or "bearer", "api-key", etc.
```

### When to Use MCP vs Native Tools

| Use MCP When | Use Native Tools When |
|--------------|----------------------|
| External systems need to invoke skill | Only OpenClaw agent uses skill |
| Interoperability with MCP clients | Performance-critical internal calls |
| Standard protocol required | Proprietary/integrated workflow |

---

## Long-Running Task Support (Conditional)

**This section is Conditional.** Include when skills may exceed normal execution timeouts.

### Progress Reporting Conventions

For tasks exceeding 30 seconds, implement progress reporting:

```yaml
progress_reporting:
  enabled: true
  interval_seconds: 5
  format: "json"
  
  stages:
    - name: "initialization"
      weight: 10
    - name: "processing"
      weight: 70
    - name: "finalization"
      weight: 20
```

**Progress format:**
```json
{
  "stage": "processing",
  "progress_percent": 45,
  "message": "Processing batch 3 of 10",
  "eta_seconds": 120
}
```

### Checkpoint/Restore Patterns

For very long tasks (>5 minutes), implement checkpoint capability:

```markdown
### Checkpoint Behavior

On interrupt (SIGTERM/SIGINT):
1. Save current state to `~/.skills/{skill}/checkpoints/`
2. Resume from checkpoint on restart
3. Checkpoint naming: `{skill}.{timestamp}.ckpt`

### Checkpoint Structure

```yaml
checkpoint:
  version: "1.0"
  skill: "batch-processor"
  timestamp: "2024-01-15T10:30:00Z"
  stage: "batch-3-of-10"
  state:
    processed: 25
    failed: 2
    pending: 73
  resume_token: "abc123def456"
```
```

### Timeout Escalation

Define timeout escalation path:

| Stage | Default Timeout | Extended Timeout | Action |
|-------|-----------------|------------------|--------|
| **Default** | 5 minutes | 30 minutes | Standard execution |
| **Extended** | 30 minutes | 2 hours | Requires checkpoint support |
| **Human Handoff** | N/A | N/A | Task too long, requires manual intervention |

```yaml
timeout_config:
  default_ms: 300000      # 5 minutes
  extended_ms: 1800000    # 30 minutes
  escalate_to_human: true
  escalation_threshold_ms: 3000000  # 50 minutes
```

### Handoff to Human Operators

When a task cannot complete automatically:

```markdown
## Human Handoff Protocol

When escalating to human:

1. **Generate Status Report**:
   - What was accomplished
   - What remains
   - Checkpoint location for resume
   - Estimated completion time if continued

2. **Notify Human Operator**:
   - Skill name and version
   - Current state/data
   - Required action
   - Contact priority

3. **Leave Actionable Resume Point**:
   - Checkpoint saved
   - Resume command documented
   - Clear next steps
```

---

## Tests Directory Convention (Advanced)

**This section is Advanced.** Define the tests/ directory structure for skill validation.

### What Goes in tests/

```
skill-name/
├── tests/
│   ├── unit/              # Unit tests (test single functions/components)
│   │   ├── test_skill_loads.py
│   │   ├── test_trigger_parsing.py
│   │   └── test_output_contract.py
│   ├── integration/       # Integration tests (test skill interactions)
│   │   ├── test_skill_chain.py
│   │   └── test_full_workflow.py
│   ├── smoke/             # Smoke tests (quick sanity checks)
│   │   └── test_basic_trigger.py
│   └── utils/            # Test utilities
│       ├── __init__.py
│       └── fixtures.py
```

### Unit Test Structure

Each unit test file:

```python
"""
Unit tests for skill-creator skill.
Run: pytest tests/unit/ -v
"""

import pytest
from pathlib import Path

class TestSkillLoads:
    """Test skill loading and parsing."""
    
    def test_frontmatter_parses(self, skill_path):
        """Frontmatter should parse as valid YAML."""
        # Arrange
        skill_file = skill_path / "SKILL.md"
        
        # Act
        frontmatter = parse_frontmatter(skill_file)
        
        # Assert
        assert frontmatter is not None
        assert "name" in frontmatter
        assert "description" in frontmatter
    
    def test_skill_name_valid(self, skill_path):
        """Skill name must match identifier pattern."""
        # Arrange
        frontmatter = parse_frontmatter(skill_path / "SKILL.md")
        
        # Act
        import re
        is_valid = re.match(r'^[a-z][a-z0-9-]*$', frontmatter["name"])
        
        # Assert
        assert is_valid is not None


@pytest.fixture
def skill_path():
    """Provide path to skill under test."""
    return Path(__file__).parent.parent
```

### Integration Test Structure

```python
"""
Integration tests for skill workflows.
Run: pytest tests/integration/ -v
"""

import pytest

class TestSkillChain:
    """Test skill composition and chaining."""
    
    def test_extract_transform_chain(self):
        """Skills should chain correctly."""
        # Arrange
        extract_skill = load_skill("data-extract")
        transform_skill = load_skill("data-transform")
        
        # Act
        raw_output = extract_skill.execute(input_data)
        transformed = transform_skill.execute(raw_output)
        
        # Assert
        assert transformed is not None
        assert "processed" in transformed
```

### Test File Naming Conventions

| File Pattern | Purpose | Example |
|--------------|---------|---------|
| `test_{component}.py` | Test specific component | `test_trigger_parsing.py` |
| `test_{feature}.py` | Test specific feature | `test_long_running.py` |
| `integration/test_{workflow}.py` | Test complete workflows | `integration/test_full_workflow.py` |
| `smoke/test_{sanity}.py` | Quick sanity checks | `smoke/test_skill_loads.py` |

### Test Utilities (utils/)

```python
"""Test utilities for skill testing."""

import yaml
from pathlib import Path

def load_skill(skill_path: Path):
    """Load a skill from disk."""
    # Implementation
    pass

def parse_frontmatter(skill_file: Path) -> dict:
    """Extract YAML frontmatter from SKILL.md."""
    content = skill_file.read_text()
    # YAML parsing logic
    pass

@pytest.fixture
def mock_skill_dir(tmp_path):
    """Create a mock skill directory for testing."""
    # Setup logic
    pass
```

---

## CHANGELOG.md Convention (Advanced)

**This section is Advanced.** Define CHANGELOG structure for version tracking.

### CHANGELOG Structure

```markdown
# Changelog

All notable changes to this skill will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2024-01-15

### Added
- New composition rules for skill chaining
- MCP tool exposure patterns

### Changed
- Updated trigger contract for better accuracy

### Deprecated
- Legacy v1 trigger patterns (will remove in 3.0.0)

### Removed
- Deprecated `legacy-output` field

### Fixed
- Corrected YAML parsing for nested lists

### Security
- Sanitized user inputs in skill description

---

## [2.0.0] - 2023-12-01

### Changed
- **BREAKING**: Renamed `description` field to `purpose`
- **BREAKING**: Added required `risk_level` field

### Migration
See [Migration Guide](MIGRATION.md) for upgrading from 1.x to 2.0.
```

### Version History Format

| Section | Required | Description |
|---------|----------|-------------|
| Version | Yes | In format `[X.Y.Z] - YYYY-MM-DD` |
| Added | Yes (if any) | New features |
| Changed | Yes (if any) | Modified behavior |
| Deprecated | Yes (if any) | Soon-to-be-removed features |
| Removed | Yes (if any) | Deleted features |
| Fixed | Yes (if any) | Bug fixes |
| Security | Yes (if any) | Security patches |

### Breaking Change Notation

Mark breaking changes clearly:

```markdown
### Changed
- **BREAKING**: `output_format` now returns JSON instead of YAML
- **BREAKING**: Required field `risk_level` added to frontmatter

### Migration
```bash
# Convert existing skills
python scripts/migrate_v1_to_v2.py --path ./my-skill
```
```

---

## Lifecycle and Migration Guidance (Advanced)

**This section is Advanced.** Define skill lifecycle management.

### Version Lifecycle

| Stage | Status | Description | Support Duration |
|-------|--------|-------------|------------------|
| **Stable** | Active | Fully supported, production-ready | Indefinite while active |
| **Deprecated** | Legacy | Still functional, new users discouraged | Until next major version |
| **Retired** | Inactive | No longer maintained | None |

### Stage Transitions

```
Stable → Deprecated → Retired
   ↓         ↓          ↓
 actively   maintained  archived
 maintained
```

### Deprecated Skill Declaration

```yaml
# Frontmatter for deprecated skill
name: legacy-skill
version: 1.5.0
deprecated: true
deprecated_date: "2024-01-15"
replaced_by: "new-skill"
deprecated_message: |
  Use new-skill instead. This skill will be removed in 3.0.0.
```

### Migration Paths Between Versions

For breaking changes, provide explicit migration:

```markdown
## Migration from 1.x to 2.0

### What Changed
- `description` renamed to `purpose`
- New required field: `risk_level`
- Trigger format changed (array of patterns now)

### How to Migrate

1. Rename existing `description` to `purpose`
2. Add `risk_level: low` (or appropriate level)
3. Convert trigger string to array format:
   ```yaml
   # Before
   description: "Use when user asks..."
   
   # After
   description: "Use when user asks..."
   trigger:
     use:
       - "create a skill"
       - "author a skill"
   ```

### Automated Migration

```bash
# Using migration script
python scripts/migrate_skill.py --from 1.0 --to 2.0 --path ./my-skill
```
```

### Breaking Change Mitigation

| Mitigation Strategy | When to Use |
|--------------------|-------------|
| **Deprecation period** | Maintain old behavior for 1+ major version |
| **Migration scripts** | Provide tools to automate conversion |
| **Compatibility layer** | Support both old and new formats |
| **Feature flags** | Allow opt-in to new behavior |

### User Communication Standards

| Scenario | Communication |
|----------|---------------|
| New version release | Update CHANGELOG.md, version tag in git |
| Deprecation announced | Add deprecated flag, document replacement |
| Breaking change | Migration guide, deprecation period |
| Security vulnerability | Immediate notification, patch release |

### Retirement Process

When retiring a skill:

1. **Announce deprecation** (1+ major version before remove)
2. **Mark as deprecated** in frontmatter
3. **Remove from active registry** 
4. **Archive repository** with note pointing to replacement
5. **Keep documentation** available for historical reference