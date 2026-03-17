# Changelog

All notable changes to this skill will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2024-03-17

### Added
- Upgraded to Skill Creator v2.4.0 specification
- Added 10 Core Required Sections:
  - Purpose (enhanced with explicit guarantees)
  - Trigger Contract (with Use/Don't Use/Inspect/Handoff/Stop conditions)
  - When Not to Use (common misactivation scenarios)
  - Inputs (required and optional)
  - Output Contract (with guarantees)
  - Risk and Safety Boundaries (risk_level: medium)
  - Failure Taxonomy (standard failure classes)
  - Minimal Context Rules (core required context)
  - Minimum Observability (required logging)
  - Version Metadata (semantic versioning)
- Created tests/test_trigger.yaml for trigger accuracy evaluation
- Created tests/test_output.yaml for output validation
- Created evals/baseline/prompts.yaml with evaluation prompts
- Created evals/scoring/thresholds.yaml with pass/fail thresholds

### Changed
- Updated frontmatter with all 15 required fields:
  - version: 1.1.0
  - skill_schema_version: 1
  - deprecated: false
  - replaced_by: null
  - minimum_openclaw_version: "1.0.0"
  - supported_models: [general]
  - preferred_model_traits: [strong reasoning, hypothesis testing]
  - required_tools: []
  - optional_tools: [exec, read, write]
  - risk_level: medium
- Reorganized content to match v2.4.0 section ordering
- Enhanced Purpose section with explicit guarantees
- Added trigger contract with inspection and handoff conditions

### Deprecated
- None

### Removed
- None

### Fixed
- Structure now matches Skill Creator v2.4.0 specification

### Security
- Added trust boundaries documentation
- Defined risk level with safety rules

---

## [1.0.0] - [Original]

### Added
- Initial systematic-debugging skill
- Four-phase debugging methodology (Root Cause → Pattern → Hypothesis → Implementation)
- Core principles: no fixes without root cause, scientific method
- Supporting techniques: root-cause-tracing.md, defense-in-depth.md, condition-based-waiting.md
- Related skills integration