---
description: "Analyze changes, generate commit message, and push to feature branch"
tools: [read, execute, todo]
---

# Commit and Push Changes

Analyze changes in the workspace, generate a conventional commit message, and push to the specified feature branch.

## Input

Branch name: ${input:branch-name:Enter the feature branch name (required, e.g., feature/add-delete-endpoint)}

## Instructions

### 1. Validate Branch Name

Ensure the user provided a branch name. If empty, **STOP** and ask:

```
❌ Branch name is required. Please provide a branch name.
Example: feature/add-delete-endpoint
```

### 2. Analyze Changes

Review what changed in the workspace:

```bash
# Show all changed files
git status

# Show detailed diff
git diff

# Show staged and unstaged changes
git diff HEAD
```

Understand:
- Which files were modified
- What functionality was added/changed/fixed
- The scope of the changes (backend, frontend, tests, docs)

### 3. Generate Conventional Commit Message

Create a commit message following the conventional commit format:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types**:
- `feat` - New feature
- `fix` - Bug fix
- `test` - Adding or updating tests
- `refactor` - Code refactoring
- `chore` - Maintenance tasks
- `docs` - Documentation changes
- `style` - Formatting changes (no code logic change)

**Scope** (optional but recommended):
- `backend` - Backend/API changes
- `frontend` - Frontend/UI changes
- `tests` - Test-related changes
- Component/feature name (e.g., `todos`, `api`)

**Description**:
- Use imperative mood: "add feature" not "added feature"
- Keep it concise (50-72 characters)
- Lowercase, no period at end

**Examples**:
```
feat(backend): add DELETE /todos/:id endpoint
fix(frontend): correct todo deletion confirmation dialog
test(backend): add unit tests for delete endpoint
chore(backend): remove unused console.log statements
```

### 4. Create or Switch to Branch

Handle branch operations safely:

```bash
# Check if branch exists locally
git rev-parse --verify <branch-name>

# If branch doesn't exist, create it
git checkout -b <branch-name>

# If branch exists, switch to it
git checkout <branch-name>
```

**CRITICAL**: Never commit directly to `main` or any branch other than the user-specified branch.

### 5. Stage All Changes

Add all changes to staging:

```bash
git add .
```

Verify what will be committed:

```bash
git status
```

### 6. Commit with Generated Message

Create the commit:

```bash
git commit -m "<generated-commit-message>"
```

### 7. Push to Remote

Push the branch to origin:

```bash
git push origin <branch-name>
```

If this is the first push for the branch:

```bash
git push -u origin <branch-name>
```

### 8. Confirm Completion

Report the successful commit and provide next steps:

```
✅ **Committed**: <commit-message>
📤 **Pushed to**: origin/<branch-name>

**Next Steps**:
- Create a pull request: gh pr create --base main --head <branch-name>
- Or continue working on this branch and commit again later
```

## Error Handling

### If No Changes Detected

```bash
git status --short
```

If output is empty:

```
❌ No changes to commit. Working tree is clean.
```

### If Branch Name is Invalid

Branch names should:
- Use lowercase-with-hyphens or feature/ prefix
- No spaces or special characters (except `-`, `/`, `_`)
- Be descriptive of the feature/fix

Invalid: `My Feature`, `fix bug`, `temp123`
Valid: `feature/add-delete-endpoint`, `fix/todo-validation`, `test/api-coverage`

### If Already on Main Branch

If `git branch --show-current` returns `main`:

```
⚠️  Currently on main branch. Creating feature branch: <branch-name>
```

Then create and switch to the feature branch.

## Example Workflow

Given these changes:
- Added DELETE endpoint in `packages/backend/src/app.js`
- Added tests in `packages/backend/__tests__/app.test.js`
- Tests are passing

**Generated commit**:
```
feat(backend): add DELETE /todos/:id endpoint

- Implement DELETE route handler
- Add validation for todo ID
- Return 204 on successful deletion
- Add comprehensive test coverage
```

**Execution**:
```bash
git checkout -b feature/add-delete-endpoint
git add .
git commit -m "feat(backend): add DELETE /todos/:id endpoint"
git push -u origin feature/add-delete-endpoint
```

## Remember

- Branch name is REQUIRED - don't proceed without it
- NEVER commit to main - always use feature branches
- Follow conventional commit format strictly
- Stage ALL changes (git add .)
- Use descriptive, imperative commit messages
- Push to the exact branch the user specified
- Provide clear next-step guidance after pushing

## Output Format

```
📊 **Changes Detected**:
- packages/backend/src/app.js (modified)
- packages/backend/__tests__/app.test.js (modified)

💬 **Commit Message**:
feat(backend): add DELETE /todos/:id endpoint

🌿 **Branch**: feature/add-delete-endpoint (created)

✅ **Status**:
- Staged: 2 files
- Committed: feat(backend): add DELETE /todos/:id endpoint
- Pushed: origin/feature/add-delete-endpoint

**Next**: Create PR with `gh pr create --base main --head feature/add-delete-endpoint`
```
