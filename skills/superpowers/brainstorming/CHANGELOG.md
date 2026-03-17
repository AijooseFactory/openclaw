# Changelog

All notable changes to this skill will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-03-17

### Added
- **Core Required Sections**: Added all mandatory sections per Skill Creator v2.4.0
  - Purpose section - documents front-door role for all creative work
  - Trigger Contract with Use/Don't Use/Inspect First/Handoff/Stop
  - When Not to Use section - lists alternative skills by request type
  - Inputs section - defines required and optional inputs
  - Output Contract section - specifies output mode and guarantees
  - Risk and Safety Boundaries section - documents low risk posture
  - Failure Taxonomy section - classifies failure types and resolutions
  - Minimal Context Rules section - defines core context requirements
  - Minimum Observability section - logs trigger, questions, proposals, approvals
  - Version Metadata section - documents versioning rules

- **tests/**: Added test directory
  - `test_trigger.yaml` - Trigger accuracy tests (valid/invalid cases)
  - `test_output.yaml` - Output contract validation tests

- **evals/**: Added evaluation directory
  - `evals/baseline/prompts.yaml` - Evaluation prompts for trigger and output
  - `evals/scoring/thresholds.yaml` - Binary pass/fail thresholds

- **CHANGELOG.md**: Added as required documentation

### Changed
- **Version**: Updated from 1.0.0 to 1.1.0
- **Structure**: Reorganized to follow Skill Creator v2.4.0 canonical structure
- **Frontmatter**: Enhanced with all 15 required fields:
  - version: 1.1.0
  - skill_schema_version: 1
  - deprecated: false
  - replaced_by: null
  - minimum_openclaw_version: "1.0.0"
  - supported_models: [general]
  - preferred_model_traits: [strong reasoning, creativity]
  - required_tools: []
  - optional_tools: [web_search, web_fetch]
  - risk_level: low

### Preserved
- All original skill content and functionality
- Hard gate enforcement policy
- Process flow diagram
- Checklist and process instructions
- Complexity assessment table
- Visual companion feature
- Key principles

## [1.0.0] - 2026-01-01

### Added
- Initial version
- Brainstorming methodology with design exploration
- Process checklist (9 steps)
- Visual companion feature
- Complexity assessment for timeline estimation
- Hard gate preventing implementation without design approval