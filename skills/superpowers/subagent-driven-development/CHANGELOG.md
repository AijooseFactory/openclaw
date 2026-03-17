# Changelog

All notable changes to this skill will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-01-15

### Added
- Upgraded to Skill Creator v2.4.0 specification
- Added 10 core required sections:
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
- Created tests/test_trigger.yaml for trigger validation
- Created tests/test_output.yaml for output validation
- Created evals/baseline/prompts.yaml for baseline evaluation
- Created evals/scoring/thresholds.yaml for scoring thresholds
- Added CHANGELOG.md for version tracking

### Changed
- Updated frontmatter with 15 required fields:
  - version: 1.1.0
  - skill_schema_version: 1
  - deprecated: false
  - replaced_by: null
  - minimum_openclaw_version: "1.0.0"
  - supported_models: [general]
  - preferred_model_traits: [strong coordination, task planning]
  - required_tools: []
  - optional_tools: [sessions_spawn, subagents]
  - risk_level: medium
- Restructured content to fit v2.4.0 section organization

### Fixed
- Formalized failure taxonomy with standard failure classes
- Documented minimal context rules for skill usage
- Added minimum observability logging requirements

---

## [1.0.0] - 2024-01-01

### Added
- Initial release of subagent-driven-development skill
- Core workflow: dispatch implementer → spec review → code quality review
- Model selection guidance by task complexity
- Implementer status handling (DONE, DONE_WITH_CONCERNS, NEEDS_CONTEXT, BLOCKED)
- Timeline estimation with coordination overhead
- Integration requirements with other skills