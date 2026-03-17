# Changelog

All notable changes to this skill will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-03-17

### Added
- **Core Required Sections**: Added all mandatory sections per Skill Creator v2.4.0
  - Purpose section
  - Trigger Contract with Use/Don't Use/Inspect First/Handoff/Stop
  - When Not to Use section
  - Inputs section
  - Output Contract section
  - Risk and Safety Boundaries section
  - Failure Taxonomy section
  - Minimal Context Rules section
  - Minimum Observability section
  - Version Metadata section
- **tests/**: Added test directory with test_trigger.yaml and test_output.yaml
- **evals/**: Added evaluation directory with baseline/prompts.yaml and scoring/thresholds.yaml
- **CHANGELOG.md**: Added as required documentation

### Changed
- **Version**: Updated from 1.0.0 to 1.1.0
- **Structure**: Reorganized to follow Skill Creator v2.4.0 canonical structure
- **Frontmatter**: Enhanced with all 15 required fields

## [1.0.0] - 2024-01-01

### Added
- Initial version of executing-plans skill
- Plan loading and review workflow
- Task execution with timeline tracking
- Integration with finishing-a-development-branch
- Git worktree setup reference