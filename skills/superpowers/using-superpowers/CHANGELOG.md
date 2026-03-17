# Changelog

All notable changes to this skill will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-03-17

### Added
- Upgraded to Skill Creator v2.4.0 specification
- Added 10 Core Required Sections in order:
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
- Added frontmatter with 15 required fields:
  - version: 1.1.0
  - skill_schema_version: 1
  - deprecated: false
  - replaced_by: null
  - minimum_openclaw_version: "1.0.0"
  - supported_models: [general]
  - preferred_model_traits: [strong reasoning, skill selection]
  - required_tools: []
  - optional_tools: [read]
  - risk_level: low
- Created tests/test_trigger.yaml with trigger evaluation cases
- Created tests/test_output.yaml with output validation cases
- Created evals/baseline/prompts.yaml with evaluation prompts
- Created evals/scoring/thresholds.yaml with pass/fail thresholds

### Changed
- Reorganized SKILL.md to match v2.4.0 structure
- Section ordering matches Skill Creator specification

---

## [1.0.0] - 2024-01-01

### Added
- Initial version of using-superpowers skill
- Core skill invocation logic
- Red flags for rationalization detection
- Skill priority ordering
- User instructions precedence rules