# Changelog

All notable changes to this skill will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2024-03-17

### Added
- Added Skill Creator v2.4.0 structure with 10 core required sections:
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
- Added comprehensive frontmatter with all 15 required fields
- Created tests/test_trigger.yaml for trigger evaluation
- Created tests/test_output.yaml for output validation
- Created evals/baseline/prompts.yaml for baseline evaluation prompts
- Created evals/scoring/thresholds.yaml for scoring thresholds

### Changed
- Updated version from 1.0.0 to 1.1.0

## [1.0.0] - 2024-01-01

### Added
- Initial TDD methodology skill
- Core TDD workflow: Red-Green-Refactor
- Good tests guidelines
- Common rationalizations handling
- Red flags detection
- Timeline estimation for testing