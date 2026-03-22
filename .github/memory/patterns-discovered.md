# Patterns Discovered

Reusable code patterns, architectural decisions, and best practices discovered during development. Add new patterns as they emerge.

---

## Pattern Template

When documenting a new pattern, use this structure:

```markdown
## [Pattern Name]

**Context**: When does this pattern apply?

**Problem**: What problem does it solve?

**Solution**: How to implement it?

**Example**:
```code
// Show actual code example
```

**Related Files**: Where is this pattern used?

**Notes**: Additional considerations or variations
```

---

## Service Initialization Pattern

**Context**: Initializing data structures in service modules (backend or frontend)

**Problem**: Tests and application code need consistent empty state, but `null`/`undefined` can cause errors if not handled properly.

**Solution**: Always initialize collections as empty arrays `[]` rather than `null` or `undefined`.

**Example**:
```javascript
// ✅ Good - Safe for array operations
let todos = [];

// ❌ Avoid - Can cause .map() or .filter() errors
let todos = null;
let todos; // undefined
```

**Related Files**: 
- `packages/backend/src/app.js` - todos array initialization
- Any service modules that manage collections

**Notes**: 
- Empty arrays allow immediate use of `.map()`, `.filter()`, `.find()` without null checks
- Makes tests simpler - no need to check for null/undefined states
- Follows JavaScript best practice for collection initialization

---

## Guidelines for Pattern Documentation

- **Add patterns as you discover them during development**
- **Include real code examples** from your project
- **Show both good and bad examples** when helpful
- **Link to related files** where pattern is used
- **Update patterns** if the approach evolves
- **Keep patterns focused**: One pattern per section
- **Use clear names**: Pattern name should indicate when to use it
