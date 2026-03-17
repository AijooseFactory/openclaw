# Changelog

All notable changes to this skill will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-03-17

### Added
- Upgraded to Skill Creator v2.4.0 specification
- New frontmatter fields: version, skill_schema_version, deprecated, replaced_by, minimum_openclaw_version, supported_models, preferred_model_traits, required_tools, optional_tools, risk_level
- New core required sections: Purpose, Trigger Contract, When Not to Use, Inputs, Output Contract, Risk and Safety Boundaries, Failure Taxonomy, Minimal Context Rules, Minimum Observability, Version Metadata
- Added `tests/test_trigger.yaml` - Trigger test cases
- Added `tests/test_output.yaml` - Output validation tests
- Added `evals/baseline/prompts.yaml` - Baseline evaluation prompts
- Added `evals/scoring/thresholds.yaml` - Scoring thresholds for binary evaluation
- Added formal Failure Taxonomy with standard failure classes
- Added Risk and Safety Boundaries section
- Added Minimal Context Rules section
- Added Minimum Observability requirements

### Changed
- Clarified Trigger Contract with explicit use/do-not-use conditions
- Improved description field guidance per CSO (Claude Search Optimization)
- Expanded When Not to Use section with misactivation scenarios and alternatives

### Deprecated
- Old frontmatter format (only name and description) - now supports extended fields

### Fixed
- N/A (initial v2.4.0 upgrade)

### Security
- Added trust boundaries documentation
- Added safety rules for skill creation

---

## [1.0.0] - Prior

### Added
- Initial skill creation following TDD methodology
- RED-GREEN-REFACTOR workflow for skill development
- Skill Quality Standards verification
- Skill Creation Checklist (TDD adapted)
- Timeline estimation for skill creation