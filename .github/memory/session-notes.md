# Session Notes

Historical summaries of completed development sessions. Add new sessions at the top (most recent first).

---

## Template for New Sessions

```markdown
## [Session Name] - [Date]

### What Was Accomplished
- Bullet list of completed work
- Features implemented
- Tests written and passing
- Bugs fixed

### Key Findings and Decisions
- Important discoveries during this session
- Architectural or implementation decisions made
- Trade-offs considered and chosen
- Problems encountered and how they were resolved

### Outcomes
- Current state of features/tests
- What works well
- What needs follow-up
- Next steps identified
```

---

## Example Session: Initial Backend Setup - March 22, 2026

### What Was Accomplished
- Created Express backend with TODO CRUD endpoints
- Implemented Jest test suite with Supertest
- Set up in-memory data store for development
- All tests passing (GET, POST, PUT, DELETE endpoints)

### Key Findings and Decisions
- **Decision**: Use in-memory array for todos during development phase
  - Rationale: Simpler to test, no database setup needed for lab exercises
  - Trade-off: Data doesn't persist between server restarts (acceptable for now)
  
- **Finding**: Array initialization matters for tests
  - Empty array `[]` vs `null` affects test expectations
  - Standardized on empty array initialization across all services
  
- **Decision**: Return full todo object on POST/PUT operations
  - Enables frontend to update UI without additional GET request
  - Consistent with REST best practices

### Outcomes
- Backend API is stable and fully tested
- Ready for frontend integration
- Next: Connect React frontend to backend endpoints
- Consider: Add error handling for edge cases (empty strings, invalid IDs)

---

## Guidelines for Session Notes

- **Add entries after completing a development session**
- **Focus on learnings and decisions**, not just a list of tasks
- **Include context**: Why decisions were made, not just what was done
- **Document blockers and resolutions**: Help future debugging
- **Keep it concise**: Bullet points preferred over long paragraphs
- **Date format**: Use Month Day, Year (e.g., March 22, 2026)
