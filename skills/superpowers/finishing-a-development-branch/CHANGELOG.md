# Changelog

All notable changes to this skill will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-03-17

### Added
- Upgraded to Skill Creator v2.4.0 specification
- Added 10 Core Required Sections:
  - Purpose
  - Trigger Contract
  - When Not to Use
  - Inputs
  - Output Contract
  - Risk and Safety Boundaries
  - Failure Taxonomy
  - Minimal Context Rules
  - Minimum Observability
  - Version Metadata
- Added full frontmatter with 15 fields:
  - version: 1.1.0
  - skill_schema_version: 1
  - deprecated: false
  - replaced_by: null
  - minimum_openclaw_version: "1.0.0"
  - supported_models: [general]
  - preferred_model_traits: [strong git operations, branch management]
  - required_tools: []
  - optional_tools: [exec, process]
  - risk_level: medium
- Created evaluation artifacts:
  - tests/test_trigger.yaml
  - tests/test_output.yaml
  - evals/baseline/prompts.yaml
  - evals/scoring/thresholds.yaml

### Changed
- Risk level updated from implicit to explicit "medium"
- Failure taxonomy now explicitly defined with 7 failure classes
- Safety boundaries documented with specific rules

### Security
- Added explicit confirmation requirement for destructive actions
- Documented safety rules to prevent accidental deletion

---

## [1.0.0] - 2024-01-01

### Added
- Initial skill creation
- Core workflow: verify tests → present options → execute choice → cleanup
- 4 integration options: merge locally, create PR, keep branch, discard
- Worktree cleanup logic
- Timeline estimation