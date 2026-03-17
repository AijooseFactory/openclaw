# Changelog

All notable changes to this skill will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2024-03-17

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
- Added tests/test_trigger.yaml for trigger evaluation
- Added tests/test_output.yaml for output validation
- Added evals/baseline/prompts.yaml for baseline evaluation
- Added evals/scoring/thresholds.yaml for scoring criteria
- Added CHANGELOG.md for version tracking

### Changed
- Updated frontmatter with all 15 required fields:
  - version: from 1.0.0 to 1.1.0
  - skill_schema_version: 1
  - deprecated: false
  - replaced_by: null
  - minimum_openclaw_version: "1.0.0"
  - supported_models: [general]
  - preferred_model_traits: [strong verification, quality assurance]
  - required_tools: []
  - optional_tools: [exec, read]
  - risk_level: low

### Preserved
- All original skill content (The Iron Law, The Gate Function, Common Failures, etc.)
- Core principle: "Evidence before claims, always"

---

## [1.0.0] - [Date Unknown]

### Added
- Initial release of verification-before-completion skill
- Core verification workflow (The Gate Function)
- Common failures and red flags documentation
- Timeline estimation guidance