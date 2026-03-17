# Changelog

All notable changes to this skill will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-03-17

### Added
- **Core Required Sections**: Added all mandatory sections per Skill Creator v2.4.0
  - Purpose section (renamed from "The Core Principle")
  - Trigger Contract with Use/Don't Use/Inspect First/Handoff/Stop
  - When Not to Use section
  - Inputs section (Required/Optional/Input Formats)
  - Output Contract section (Output Mode/Required Fields/Output Guarantees/Validation Rules/Failure Output)
  - Risk and Safety Boundaries section (Trust Boundaries/Primary Risks/Basic Safety Rules)
  - Failure Taxonomy section (Standard Failure Classes/Expected Failure Behavior/Minimum Failure Handling)
  - Minimal Context Rules section (Core Required Context/Context Principle/Always Load/Load On Demand)
  - Minimum Observability section (Required Logging/Logging Format)
  - Version Metadata section (Versioning Rules)
- **tests/**: Added test directory with test_trigger.yaml and test_output.yaml
- **evals/**: Added evaluation directory with baseline/prompts.yaml and scoring/thresholds.yaml
- **Skill Anatomy Compliance**: Added tests/, evals/, CHANGELOG.md as required directories

### Changed
- **Version**: Updated from 1.0.0 to 1.1.0
- **Structure**: Reorganized to follow Skill Creator v2.4.0 canonical structure
- **Trigger Contract**: Expanded "When to Use" to full Trigger Contract format
- **Frontmatter**: Added skill_schema_version, deprecated, replaced_by, minimum_openclaw_version, supported_models, preferred_model_traits, required_tools, optional_tools

### Fixed
- **Section naming**: "The Core Principle" renamed to "Purpose" (standard section name)
- **Trigger format**: Added full Use/Don't Use/Inspect First/Handoff/Stop structure
- **Missing guarantees**: Added all 6 explicit guarantees via Output Contract

## [1.0.0] - 2026-03-17

### Added
- Initial version based on ChristopherA bootstrap seed methodology
- Four phases: Ship It, Remember It, Review & Apply, Publish It
- OpenClaw memory hierarchy integration
- State files for multi-session continuity
- Evolution mechanics for learnings → skills promotion
- Anti-patterns guardrails
- Integration with other skills (skill-creator, writing-skills, ai-timeline-estimation)
- Integration with OpenClaw agents (Albert, Einstein, Blackwell, Babatunde, Zeke)
- Timeline estimation (13-33 minutes typical wrap-up)