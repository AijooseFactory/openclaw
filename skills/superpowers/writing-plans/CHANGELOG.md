# Changelog

All notable changes to this skill will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2024-01-15

### Added
- **Skill Creator v2.4.0 Compliance:** Upgraded to match new skill specification
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
- Added tests/ directory with test_trigger.yaml and test_output.yaml
- Added evals/ directory with baseline/prompts.yaml and scoring/thresholds.yaml

### Changed
- Updated frontmatter with all 15 required fields
- Restructured content to fit v2.4.0 schema requirements

### Fixed
- Ensured all sections properly mapped to skill creator specification

---

## [1.0.0] - 2024-01-01

### Added
- Initial release of writing-plans skill
- Core planning functionality for implementation plans
- TDD-based task breakdown structure
- Plan review loop with subagent-based validation
- Execution handoff documentation