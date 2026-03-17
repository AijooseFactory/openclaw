# Spec-Driven Development Methodology

## Core Philosophy

For decades, code has been king — specifications were just scaffolding we built and discarded. Spec-Driven Development changes this: specifications become executable, directly generating working implementations rather than just guiding them.

## Key Principles

### 1. Intent-Driven Development

Specifications define the "what" before the "how":
- Focus on outcomes and behaviors
- Describe users and their goals
- Defer technical decisions to planning phase

### 2. Rich Specification Creation

Use guardrails and organizational principles:
- Constitution establishes non-negotiables
- Specs capture requirements comprehensively
- Clarification reduces ambiguity systematically

### 3. Multi-Step Refinement

Not one-shot code generation from prompts:
- Progressive refinement through phases
- Cross-artifact consistency validation
- Incremental delivery with checkpoints

### 4. Artifact Permanence

Specifications are living artifacts:
- Version controlled alongside code
- Updated as requirements evolve
- Source of truth for implementation

## Development Phases

### Phase 0: Constitution (Foundation)

**Purpose:** Establish governing principles for all subsequent decisions.

**Questions to Answer:**
- What quality standards are non-negotiable?
- What testing requirements exist?
- What performance constraints apply?
- What security requirements must be met?
- How should technical decisions be made?

**Output:** `.specify/memory/constitution.md`

**Best Practices:**
- Be specific about standards (e.g., "80% test coverage minimum" not "good test coverage")
- Include decision-making guidelines
- Reference organizational policies
- Define success criteria

### Phase 1: Specification (What)

**Purpose:** Define what you're building from a user perspective.

**Elements:**
- User stories with acceptance criteria
- Functional requirements
- Non-functional requirements
- User personas and journeys
- Success metrics

**Output:** `specs/XXX-<feature>/spec.md`

**Writing Good Specs:**
```markdown
# Feature: Photo Albums

## User Stories

### Story 1: Create Album
As a user, I want to create albums to organize my photos.

Acceptance Criteria:
- User can create new album with title
- Album appears in album list immediately
- Empty albums are persisted

## Functional Requirements
- Albums must have unique titles
- Albums support drag-drop reordering
- Photos display in tile interface within album
```

**Anti-patterns to Avoid:**
- Specifying tech stack too early
- Implementation details in requirements
- Vague acceptance criteria
- Missing user perspective

### Phase 2: Clarification (Refinement)

**Purpose:** Reduce ambiguity before committing to technical decisions.

**Process:**
1. Automated questioning covers underspecified areas
2. Answers recorded in Clarifications section
3. Gaps identified and addressed
4. Requirements tightened

**When to Clarify:**
- Always before planning
- After major requirement changes
- When multiple interpretations exist

### Phase 3: Planning (How)

**Purpose:** Define technical implementation approach.

**Elements:**
- Technology stack decisions
- Architecture patterns
- Data models
- API contracts
- Integration points
- Deployment strategy

**Output:**
- `plan.md` - Implementation overview
- `data-model.md` - Entity relationships
- `contracts/` - API specifications
- `research.md` - Technology decisions

**Planning Best Practices:**
1. Reference constitution for constraints
2. Justify technology choices
3. Document alternatives considered
4. Include rollback strategies
5. **Estimate in AI-hours, not human-weeks** (AI agents execute continuously)

### Phase 4: Task Breakdown (Execution)

**Purpose:** Create ordered, actionable implementation items.

**Task Structure:**
```markdown
## User Story: Create Album

### Phase 1: Foundation
- [ ] Create Album model (src/models/Album.ts)
- [ ] Create AlbumRepository (src/repositories/AlbumRepository.ts)
- [P] Create CreateAlbumService (src/services/CreateAlbumService.ts)
- [P] Create ListAlbumsService (src/services/ListAlbumsService.ts)

### Phase 2: API
- [ ] Create AlbumsController (src/controllers/AlbumsController.ts)
- [ ] Add POST /albums endpoint
- [ ] Add GET /albums endpoint

### Tests (TDD)
- [ ] Write Album model tests
- [ ] Write AlbumRepository tests
- [ ] Write service tests
```

**Notation:**
- `[ ]` - Sequential task (must complete before next)
- `[P]` - Parallel task (can run concurrently with other [P] tasks)

### Phase 5: Implementation (Build)

**Purpose:** Execute tasks following TDD discipline.

**TDD Integration:**
1. Read task from tasks.md
2. Write failing test first
3. Write minimal code to pass
4. Refactor if needed
5. Move to next task

**Progress Tracking:**
- Tasks.md updated as items complete
- Checkpoints validate independent functionality
- Errors bubble up for resolution

### Phase 6: Analysis (Validation)

**Purpose:** Ensure cross-artifact consistency.

**Checks:**
- Every user story has implementation tasks
- Every task references plan details
- All requirements have test coverage
- Acceptance criteria are testable

### Phase 7: Checklist (Completion)

**Purpose:** Validate requirements completeness.

**Checklist Categories:**
- Requirement completeness
- Clarity and consistency
- Testability
- User story coverage
- Non-functional requirement coverage

## Greenfield vs Brownfield

### Greenfield (New Project)

Full workflow from scratch:

```
Phase 0: Constitution → Define principles
Phase 1: Specification → Capture requirements
Phase 2: Clarification → Refine ambiguities
Phase 3: Planning → Choose tech stack
Phase 4: Tasks → Break down work
Phase 5: Implementation → Build
Phase 6: Analysis → Validate
Phase 7: Checklist → Confirm completeness
```

### Brownfield (Existing Project)

Adapted for existing codebase:

```
Phase 0: Constitution → Derive from existing patterns
Phase 1: Specification → Add new feature requirements
Phase 2: Clarification → Refine
Phase 3: Planning → Integrate with existing architecture
Phase 4: Tasks → Incremental changes
Phase 5: Implementation → Extend existing
Phase 6: Analysis → Validate integration
Phase 7: Checklist → Confirm completeness
```

**Brownfield Tips:**
- Analyze existing patterns before planning
- Respect established conventions
- Incremental changes over major refactors
- Document deviations from existing patterns

## Common Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Specifying too early | Tech stack locks in before exploring | Use `specify` for requirements only |
| Skipping clarification | Ambiguity leads to rework | Always clarify before planning |
| One-shot generation | No incremental validation | Use multi-phase workflow |
| Ignoring constitution | Inconsistent decisions | Reference constitution in planning |
| Missing tests | Technical debt from day one | TDD-first in implementation |

## Error Recovery

### Incomplete Specification
```
> /speckit.specify [original request...]
[spec feels incomplete]
> Add more detail about [specific area]...
```

### Plan Doesn't Match Requirements
```
> /speckit.analyze
[finds inconsistencies]
[update plan.md to resolve]
```

### Implementation Blocked
```
[Task requires clarification]
> /speckit.clarify
[add specific question]
[update tasks.md with clarified task]
```

## Metrics

Track Spec-Driven Development effectiveness:

| Metric | Target | Measurement |
|--------|--------|-------------|
| Clarification coverage | 100% | All specs clarified before planning |
| Task completion rate | >95% | Tasks implemented without re-plan |
| Acceptance test pass | 100% | All acceptance criteria testable |
| Spec-to-implementation drift | <10% | Deviations documented |

## References

- [GitHub Spec-Kit Repository](https://github.com/github/spec-kit)
- [Complete Spec-Driven Development Methodology](https://github.com/github/spec-kit/blob/main/spec-driven.md)
- [Community Walkthroughs](https://github.com/github/spec-kit#-community-walkthroughs)