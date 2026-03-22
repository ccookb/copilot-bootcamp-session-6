---
description: "Execute instructions from the current GitHub Issue step"
agent: "tdd-developer"
tools: [search, read, edit, execute, web, todo]
---

# Execute Current Issue Step

Execute the instructions from the current step in the GitHub Issue exercise systematically.

## Input

Issue number: ${input:issue-number:Enter the issue number (leave blank to auto-detect Exercise issue)}

## Instructions

### 1. Find the Exercise Issue

If no issue number was provided, use GitHub CLI to locate the Exercise issue:

```bash
gh issue list --state open
```

Look for the issue with "Exercise:" in the title. This is the main exercise issue that contains step-by-step instructions.

### 2. Get Issue Content with Comments

Retrieve the complete issue with all comments:

```bash
gh issue view <issue-number> --comments
```

The issue structure:
- **Issue body**: Contains the exercise overview and initial instructions
- **Comments**: Each comment contains a step with activities and success criteria

### 3. Parse the Latest Step

Locate the most recent step comment. Steps are formatted as:

```
# Step X-Y: [Step Title]

[Step description]

:keyboard: Activity: [Activity title]
- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

Success Criteria:
- [ ] Criterion 1
- [ ] Criterion 2
```

### 4. Execute Each Activity

For each `:keyboard: Activity:` section in the step:

1. **Read the requirements carefully**
2. **Plan your approach** - Use the todo tool for complex tasks
3. **Follow TDD principles** (you're in tdd-developer mode):
   - Write tests FIRST for new features (RED phase)
   - Implement minimal code to pass tests (GREEN phase)
   - Refactor while keeping tests green (REFACTOR phase)
   - For test fixes, focus ONLY on making tests pass (don't fix linting)
4. **Execute incrementally** - Small changes, frequent validation
5. **Run tests after each change** to verify correctness

### 5. Testing Constraints (CRITICAL)

**Use ONLY the existing test infrastructure**:
- ✅ Jest for backend testing
- ✅ Supertest for API endpoint testing
- ✅ React Testing Library for frontend component testing
- ✅ Manual browser testing for complete UI flows

**NEVER suggest**:
- ❌ Playwright, Cypress, Selenium, or other e2e frameworks
- ❌ Browser automation tools
- ❌ Headless browser testing

**This project focuses on unit and integration tests ONLY.**

### 6. Stop Before Committing

**IMPORTANT**: DO NOT commit or push changes. That's the responsibility of the `/commit-and-push` prompt.

After completing all activities:
1. Verify tests are passing
2. Verify code runs correctly
3. Inform the user that activities are complete
4. Instruct them to run `/validate-step` to check success criteria

## Example Workflow

When you receive a step like:

```
# Step 5-1: Add DELETE endpoint

:keyboard: Activity: Implement the DELETE /todos/:id endpoint
- [ ] Write test for DELETE endpoint
- [ ] Implement the endpoint
- [ ] Verify tests pass
```

Execute as follows:

1. **RED Phase**: Write the test first
   ```javascript
   describe('DELETE /todos/:id', () => {
     it('should delete a todo and return 204', async () => {
       // Test implementation
     });
   });
   ```

2. **Verify RED**: Run tests to confirm they fail

3. **GREEN Phase**: Implement minimal code to pass
   ```javascript
   app.delete('/todos/:id', (req, res) => {
     // Minimal implementation
   });
   ```

4. **Verify GREEN**: Run tests to confirm they pass

5. **REFACTOR**: Clean up if needed, keep tests green

6. **Report completion**: "Activities complete. Run `/validate-step 5-1` to verify success criteria."

## Remember

- You are in **tdd-developer mode** - follow TDD discipline rigorously
- Write tests FIRST for new features
- For fixing tests, focus ONLY on making them pass (no linting fixes)
- Execute activities systematically, one at a time
- DO NOT commit - let `/commit-and-push` handle that
- Direct user to `/validate-step` when done

## Output Format

Provide clear updates as you work:

```
🎯 **Step Identified**: Step 5-1: Add DELETE endpoint

📋 **Activities**:
1. Write test for DELETE endpoint
2. Implement the endpoint  
3. Verify tests pass

🔴 **RED Phase**: Writing test...
[Test code]

🟢 **GREEN Phase**: Implementing feature...
[Implementation]

✅ **Complete**: All activities finished. Run `/validate-step 5-1` to verify success criteria.
```
