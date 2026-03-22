---
description: "Validate that all success criteria for the current step are met"
agent: "code-reviewer"
tools: [search, read, execute, web, todo]
---

# Validate Step Success Criteria

Verify that all success criteria for a specific step are met by checking the current workspace state.

## Input

Step number: ${input:step-number:Enter the step number (required, e.g., "5-0", "5-1", "5-2")}

## Instructions

### 1. Validate Step Number

Ensure the user provided a step number. If empty, **STOP** and ask:

```
❌ Step number is required. 
Format: "X-Y" where X is the major step and Y is the substep
Examples: "5-0", "5-1", "6-2"
```

### 2. Find the Exercise Issue

Use GitHub CLI to locate the main exercise issue:

```bash
gh issue list --state open
```

Look for the issue with "Exercise:" in the title. Note the issue number.

### 3. Get Issue with Comments

Retrieve the complete issue including all step comments:

```bash
gh issue view <issue-number> --comments
```

The exercise structure:
- **Issue body**: Overview and initial setup
- **Comments**: Individual steps with activities and success criteria

### 4. Locate the Target Step

Search through the issue content for the specific step. Steps are formatted as:

```
# Step <step-number>: [Step Title]

[Step description and activities]

Success Criteria:
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3
```

Parse the "Success Criteria:" section for the specified step number.

### 5. Check Each Criterion

For each success criterion, verify it against the current workspace state:

#### Common Criterion Types

**Test-related**:
```
✓ All tests pass
```
Check with: `npm test`

**File existence**:
```
✓ File X.js exists with function Y
```
Check with: Read the file and search for the function

**API endpoint**:
```
✓ DELETE /todos/:id endpoint returns 204
```
Check with: Review test file or run the API

**Code quality**:
```
✓ No ESLint errors
```
Check with: `npm run lint`

**Functionality**:
```
✓ Feature X works as described
```
Check with: Review implementation and test coverage

**Git/Branch**:
```
✓ Changes committed to feature branch
```
Check with: `git log` and `git branch --show-current`

### 6. Run Systematic Checks

Execute checks in this order:

#### A. Run Tests

```bash
# Backend tests
cd packages/backend && npm test

# Frontend tests  
cd packages/frontend && npm test
```

Capture results:
- ✅ All tests passing
- ❌ X tests failing (list them)

#### B. Run Linter

```bash
# Backend lint
cd packages/backend && npm run lint

# Frontend lint
cd packages/frontend && npm run lint
```

Capture results:
- ✅ No lint errors
- ❌ X lint errors (categorize them)

#### C. Check Files

For any file-related criteria, verify:
- File exists at the correct path
- Contains expected functions/exports
- Implementation matches requirements

#### D. Verify Functionality

Review the code to confirm:
- Features work as described
- Edge cases are handled
- Error handling is present
- Code follows project patterns

### 7. Generate Validation Report

Create a detailed report showing:

1. **Step Information**
   - Step number and title
   - Total criteria count

2. **Criterion Status**
   - ✅ Met criteria with brief evidence
   - ❌ Unmet criteria with specific issues
   - ⚠️  Partially met with details

3. **Overall Status**
   - "All criteria met ✅" or
   - "X of Y criteria met, Z remaining"

4. **Next Actions**
   - If complete: "Ready to commit and push with `/commit-and-push`"
   - If incomplete: Specific guidance for each unmet criterion

### 8. Provide Actionable Guidance

For any unmet criteria, provide specific next steps:

**Example**:
```
❌ Criterion: "All tests pass"
   Issue: 2 tests failing in app.test.js
   Fix: Review test output, the DELETE endpoint test expects 204 but returns 200
   
   Suggested action:
   1. Run: cd packages/backend && npm test
   2. Fix the status code in app.js line 45
   3. Re-run tests to verify
   4. Re-run /validate-step when fixed
```

## Error Handling

### If Step Not Found

```
❌ Step "${step-number}" not found in the issue.

Available steps found:
- Step 5-0: Setup
- Step 5-1: Implement Feature
- Step 5-2: Add Tests

Please verify the step number and try again.
```

### If Issue Not Found

```
❌ No Exercise issue found.

Run: gh issue list --state open

Look for an issue with "Exercise:" in the title and provide the issue number.
```

## Example Validation Report

```
# Validation Report: Step 5-1

**Step**: Add DELETE /todos/:id endpoint

## Success Criteria Status (3/4 met)

✅ **DELETE /todos/:id endpoint implemented**
   - File: packages/backend/src/app.js (line 78-85)
   - Implementation verified

✅ **Test coverage added**
   - File: packages/backend/__tests__/app.test.js
   - Tests present for success and error cases

✅ **Tests passing**
   - Backend: 12/12 tests pass ✓
   - Frontend: 8/8 tests pass ✓

❌ **No ESLint errors**
   - Found 3 errors:
     * no-console: app.js line 82
     * no-unused-vars: app.js line 15
     * prefer-const: routes.js line 23
   
   **Action Required**:
   The code-reviewer agent (active) can help fix these:
   1. Remove console.log at line 82
   2. Remove unused import at line 15  
   3. Change let to const at routes.js:23
   
   Then re-run this validation.

## Overall Status

⚠️  **3 of 4 criteria met**

**Next Steps**:
1. Fix the 3 ESLint errors listed above
2. Run: npm run lint (verify clean)
3. Run: /validate-step 5-1 (re-validate)
4. When all criteria pass: /commit-and-push feature/add-delete-endpoint
```

## Remember

- You are in **code-reviewer mode** - systematic validation is your specialty
- Step number is REQUIRED
- Check ALL criteria thoroughly
- Provide specific, actionable guidance for unmet criteria
- Use tools to verify (don't just assume)
- Give clear next steps based on results

## Output Format

```
# 🔍 Validation Report: Step <step-number>

**Step Title**: [Title from issue]

## Success Criteria Status (X/Y met)

[For each criterion:]
✅/❌/⚠️ **[Criterion description]**
   - [Evidence or issue details]
   - [Action required if unmet]

## Overall Status

✅ **All criteria met** - Ready to commit!
OR
⚠️ **X of Y criteria met** - Action required

**Next Steps**:
[Specific guidance]
```
