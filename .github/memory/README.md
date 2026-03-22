# Memory System

## Purpose

This memory system tracks patterns, decisions, and lessons learned during development. It provides GitHub Copilot with context about your project's evolution, enabling more informed and consistent suggestions.

## Two Types of Memory

### Persistent Memory
Location: `.github/copilot-instructions.md`
- Contains foundational principles and workflows
- Defines project structure, tech stack, and development standards
- Rarely changes - represents stable project knowledge
- Always loaded by Copilot

### Working Memory
Location: `.github/memory/` (this directory)
- Contains discoveries, patterns, and session-specific insights
- Changes frequently as development progresses
- Documents what you learn during actual development work
- Referenced by Copilot when providing context-aware help

## Directory Structure

```
.github/memory/
├── README.md                    # This file - explains the memory system
├── session-notes.md             # Historical summaries of completed sessions (COMMITTED)
├── patterns-discovered.md       # Accumulated code patterns and practices (COMMITTED)
└── scratch/
    ├── .gitignore              # Ignores all files in scratch/
    └── working-notes.md        # Active session notes (NOT COMMITTED)
```

### File Purposes

- **session-notes.md**: Document completed development sessions for future reference. Committed to git as a historical record. Summarizes what was accomplished, key findings, and outcomes.

- **patterns-discovered.md**: Document recurring code patterns, architectural decisions, and best practices discovered during development. Committed to git. Helps maintain consistency across the codebase.

- **scratch/working-notes.md**: Active note-taking during current session. NOT committed to git. Ephemeral workspace for tracking progress, approaches, blockers, and decisions in real-time.

## When to Use Each File

### During TDD Workflow

**Active Development** (`scratch/working-notes.md`):
- Note which tests you're writing and why
- Track failing test patterns and solutions
- Document unexpected test behaviors
- Record refactoring decisions made during Green→Refactor phase

**After Session** (`session-notes.md`):
- Summarize what tests were implemented
- Document key TDD insights (e.g., "Mock external API calls in tests before implementing")
- Note any testing patterns that worked well

**Accumulate Patterns** (`patterns-discovered.md`):
- Document reusable test patterns (e.g., "API Error Testing Pattern")
- Record setup/teardown approaches that work well
- Capture mock strategies for different scenarios

### During Linting Workflow

**Active Development** (`scratch/working-notes.md`):
- List lint errors by category
- Track which fixes you're applying
- Note any errors that need clarification
- Document decisions about disabling specific rules

**After Session** (`session-notes.md`):
- Summarize categories of lint issues resolved
- Document any ESLint configuration changes
- Note systematic patterns for fixing common issues

**Accumulate Patterns** (`patterns-discovered.md`):
- Document code style decisions (e.g., "Prefer async/await over .then()")
- Record linting rules that frequently appear
- Capture team preferences on controversial patterns

### During Debugging Workflow

**Active Development** (`scratch/working-notes.md`):
- Describe the bug symptoms
- Track debugging steps and findings
- Note what you've tried and results
- Document hypotheses and validation attempts

**After Session** (`session-notes.md`):
- Summarize the bug and its root cause
- Document the fix and why it worked
- Note any related issues discovered

**Accumulate Patterns** (`patterns-discovered.md`):
- Document common bug patterns (e.g., "Async state updates in React")
- Record debugging techniques that revealed issues
- Capture preventive patterns for similar bugs

## How AI Uses These Patterns

When you ask GitHub Copilot for help, it:

1. **Reads persistent instructions** from `.github/copilot-instructions.md` to understand your project structure and principles

2. **References working memory** from `.github/memory/` to:
   - Apply patterns you've already discovered
   - Avoid suggesting approaches you've ruled out
   - Maintain consistency with decisions you've documented
   - Provide context-aware suggestions based on recent work

3. **Suggests actions** aligned with both persistent principles and accumulated learnings

## Workflow: Active Session to Historical Record

### During Development
1. Open `scratch/working-notes.md`
2. Use the template sections to track your work in real-time
3. Add notes as you discover patterns, make decisions, or encounter blockers
4. This file is **not committed** - it's your ephemeral workspace

### At End of Session
1. Review your `scratch/working-notes.md` notes
2. Extract key findings and add a summary to `session-notes.md`
3. If you discovered reusable patterns, add them to `patterns-discovered.md`
4. Clear or reset `scratch/working-notes.md` for next session
5. Commit `session-notes.md` and `patterns-discovered.md` to git

### Benefits of This Approach
- **Active work stays clean**: Scratch notes don't clutter git history
- **Historical learnings preserved**: Session summaries and patterns are committed
- **AI context grows**: Each session adds to Copilot's understanding of your project
- **Team knowledge sharing**: Committed patterns help other developers and AI assistants

## Example Workflow

**Monday Morning** - Start new feature
```
# In scratch/working-notes.md
Current Task: Add DELETE endpoint for todos
Approach: TDD - write test first, implement, verify
Key Findings: Need to handle cascading deletes
```

**Monday Evening** - End of session
```
# Update session-notes.md with summary
# Add new pattern to patterns-discovered.md if applicable
# Clear scratch/working-notes.md
# Commit session-notes.md and patterns-discovered.md
```

**Tuesday** - Copilot now knows:
- The DELETE endpoint pattern from patterns-discovered.md
- Previous session context from session-notes.md
- Can suggest consistent approaches for new endpoints

## Best Practices

1. **Be concise**: Bullet points are better than paragraphs
2. **Be specific**: Include code examples in patterns
3. **Be current**: Update patterns when practices evolve
4. **Be honest**: Document what didn't work, not just successes
5. **Review regularly**: Your memory system should evolve with your project

## Getting Started

1. Start your session by opening `scratch/working-notes.md`
2. Fill in "Current Task" and "Approach"
3. Add findings and decisions as you work
4. At end of session, summarize key insights into `session-notes.md`
5. Document any reusable patterns in `patterns-discovered.md`

Your future self (and Copilot) will thank you!
