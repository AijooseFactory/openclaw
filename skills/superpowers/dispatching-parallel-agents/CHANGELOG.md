# Changelog

All notable changes to this skill will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-03-17

### Added
- Upgraded to Skill Creator v2.4.0 specification
- Added 10 Core Required Sections: Purpose, Trigger Contract, When Not to Use, Inputs, Output Contract, Risk and Safety Boundaries, Failure Taxonomy, Minimal Context Rules, Minimum Observability, Version Metadata

### Changed
- Expanded frontmatter with all 15 required fields

### Added
- tests/test_trigger.yaml - Trigger evaluation tests
- tests/test_output.yaml - Output validation tests
- evals/baseline/prompts.yaml - Baseline evaluation prompts
- evals/scoring/thresholds.yaml - Scoring thresholds
- CHANGELOG.md - Version history

---

## [1.0.0] - 2025-10-03

### Added
- Initial release of dispatching-parallel-agents skill
- Core pattern for dispatching multiple agents to independent problem domains
- Timeline estimation for parallel vs sequential execution
- Real example from debugging session