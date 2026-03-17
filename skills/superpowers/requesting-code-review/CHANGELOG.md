# Changelog

All notable changes to this skill will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2026-03-17

### Added
- Minimum Observability section (Core Required compliance with skill-creator v2.4.0)

## [1.1.0] - 2024-01-15

### Added
- Upgraded to Skill Creator v2.4.0 specification
- Added 10 core required sections (Purpose, Trigger Contract, When Not to Use, Inputs, Output Contract, Risk and Safety Boundaries, Failure Taxonomy, Minimal Context Rules, Minimum Observability, Version Metadata)
- Created tests/test_trigger.yaml for trigger validation
- Created tests/test_output.yaml for output validation
- Created evals/baseline/prompts.yaml for evaluation prompts
- Created evals/scoring/thresholds.yaml for scoring criteria
- Added comprehensive frontmatter with all 15 required fields
- Added version metadata and changelog

### Changed
- Updated frontmatter to include: version, skill_schema_version, deprecated, replaced_by, minimum_openclaw_version, supported_models, preferred_model_traits, required_tools, optional_tools, risk_level
- Reorganized content to match v2.4.0 section ordering

### Deprecated
- None

### Removed
- None

### Fixed
- None

### Security
- Added explicit trust boundary definitions
- Documented safety rules for git operations

---

## [1.0.0] - 2024-01-01

### Added
- Initial skill creation
- Code review request workflow
- Integration with superpowers:code-reviewer subagent
- Template at code-reviewer.md for review context

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