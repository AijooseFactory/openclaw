# Changelog

All notable changes to this skill will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-03-17

### Added
- Skill Creator v2.4.0 specification compliance
- 10 core required sections: Purpose, Trigger Contract, When Not to Use, Inputs, Output Contract, Risk and Safety Boundaries, Failure Taxonomy, Minimal Context Rules, Minimum Observability, Version Metadata
- Complete frontmatter with all 15 required fields
- tests/test_trigger.yaml - Trigger condition tests
- tests/test_output.yaml - Output contract tests
- evals/baseline/prompts.yaml - Evaluation prompts
- evals/scoring/thresholds.yaml - Scoring thresholds
- CHANGELOG.md - Version history

### Changed
- Expanded skill documentation with proper section structure
- Added explicit failure taxonomy and handling patterns
- Defined minimal context rules for context efficiency

### Deprecated
- None

### Removed
- None

### Fixed
- None

### Security
- None

---

## [1.0.0] - 2025-01-01

### Added
- Initial skill version
- Core code review reception patterns
- Forbidden response patterns
- Technical verification approach
- YAGNI checking guidance
- Push-back principles

### Changed
- None

### Deprecated
- None

### Removed
- None

### Fixed
- None

### Security
- None