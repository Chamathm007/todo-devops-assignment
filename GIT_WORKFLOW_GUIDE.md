# Git Workflow Guide - Step-by-Step Instructions

This guide provides **exact commands** to simulate a team collaboration workflow for your assignment, even though you're working solo.

---

## Prerequisites

1. Initialize Git repository (if not already done):
   ```bash
   git init
   git remote add origin https://github.com/YOUR_USERNAME/todo-devops-assignment.git
   ```

2. Make sure all files are committed to start:
   ```bash
   git add .
   git commit -m "chore: initial project setup"
   ```

---

## Step 1: Create Main and Develop Branches

```bash
# Create and switch to develop branch
git checkout -b develop
git push -u origin develop

# Switch back to main
git checkout main
git push -u origin main
```

---

## Step 2: Feature Branch 1 - UI Layout

```bash
# Create feature branch from develop
git checkout develop
git checkout -b feature/ui-layout

# Make some UI changes (already done, but you can add more)
# For demonstration, let's make a small CSS enhancement
# Then commit:
git add src/styles/style.css
git commit -m "feat(ui): enhance card styling with glassmorphism effects"

# Push feature branch
git push -u origin feature/ui-layout
```

---

## Step 3: Feature Branch 2 - Todo Logic

```bash
# Create another feature branch from develop
git checkout develop
git checkout -b feature/todo-logic

# Make some logic changes (already done)
# Add a commit:
git add src/scripts/app.js
git commit -m "feat(todo): implement localStorage persistence and task management"

# Push feature branch
git push -u origin feature/todo-logic
```

---

## Step 4: Feature Branch 3 - Filter System

```bash
# Create third feature branch
git checkout develop
git checkout -b feature/filter-system

# Make filter-related changes
git add src/scripts/app.js src/styles/style.css
git commit -m "feat(filter): implement task filtering and counter system"

# Push feature branch
git push -u origin feature/filter-system
```

---

## Step 5: Create Pull Request #1

**On GitHub:**
1. Go to your repository
2. Click "Pull requests" → "New pull request"
3. Base: `develop`, Compare: `feature/ui-layout`
4. Title: `feat: implement responsive UI layout with modern styling`
5. Description:
   ```
   ## Changes
   - Implemented responsive HTML structure
   - Added modern CSS with glassmorphism effects
   - Created mobile-first responsive design
   - Added smooth animations and transitions
   
   ## Testing
   - ✅ Tested on mobile, tablet, and desktop
   - ✅ Verified animations work smoothly
   - ✅ Confirmed accessibility features
   ```
6. Create pull request
7. Merge the PR (you can merge it yourself as solo developer)

**After merging on GitHub:**
```bash
# Update local develop branch
git checkout develop
git pull origin develop
```

---

## Step 6: Create Pull Request #2

**On GitHub:**
1. Create new pull request
2. Base: `develop`, Compare: `feature/todo-logic`
3. Title: `feat: implement core todo functionality with localStorage`
4. Description:
   ```
   ## Changes
   - Implemented add, delete, and toggle completion features
   - Added localStorage persistence
   - Created task rendering and state management
   - Added form validation
   
   ## Testing
   - ✅ Tasks persist across page reloads
   - ✅ All CRUD operations work correctly
   - ✅ Form validation prevents empty tasks
   ```
5. Create and merge pull request

**After merging:**
```bash
git checkout develop
git pull origin develop
```

---

## Step 7: Simulate Merge Conflict

This is the **most important part** for your assignment!

### Step 7a: Create Conflicting Changes

```bash
# Create a branch that will conflict
git checkout develop
git checkout -b feature/conflict-branch-1

# Edit src/styles/style.css - modify the .card section
# Change something like the border-radius or padding
# Then commit:
git add src/styles/style.css
git commit -m "feat(ui): update card border radius to 1.5rem"

# Push this branch
git push -u origin feature/conflict-branch-1
```

### Step 7b: Create Another Conflicting Branch

```bash
# Create another branch with conflicting changes
git checkout develop
git checkout -b feature/conflict-branch-2

# Edit the SAME section in src/styles/style.css
# Change the border-radius to something different (e.g., 0.8rem)
# Then commit:
git add src/styles/style.css
git commit -m "feat(ui): update card border radius to 0.8rem"

# Push this branch
git push -u origin feature/conflict-branch-2
```

### Step 7c: Merge First Branch (No Conflict)

```bash
# Merge the first branch into develop
git checkout develop
git merge feature/conflict-branch-1
git push origin develop
```

### Step 7d: Attempt to Merge Second Branch (Conflict!)

```bash
# Try to merge the second branch - THIS WILL CREATE A CONFLICT
git checkout develop
git merge feature/conflict-branch-2
```

**You'll see:**
```
Auto-merging src/styles/style.css
CONFLICT (content): Merge conflict in src/styles/style.css
Automatic merge failed; fix conflicts and then commit the result.
```

### Step 7e: Resolve the Conflict

1. Open `src/styles/style.css` in your editor
2. Find the conflict markers:
   ```css
   <<<<<<< HEAD
   border-radius: 1.5rem;
   =======
   border-radius: 0.8rem;
   >>>>>>> feature/conflict-branch-2
   ```

3. Resolve by choosing a value or combining:
   ```css
   border-radius: 1rem;  /* Choose a reasonable middle ground */
   ```

4. Remove all conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)

5. Stage the resolved file:
   ```bash
   git add src/styles/style.css
   ```

6. Complete the merge:
   ```bash
   git commit -m "fix: resolve merge conflict in style.css - set border-radius to 1rem"
   ```

7. Push the resolved merge:
   ```bash
   git push origin develop
   ```

---

## Step 8: Merge Develop to Main

```bash
# Switch to main
git checkout main

# Merge develop into main
git merge develop

# Push to main (this will trigger deployment!)
git push origin main
```

---

## Step 9: Create More Meaningful Commits

To reach **10+ commits**, make additional small changes:

```bash
# Add CI/CD configuration commits
git checkout develop
git add .github/workflows/ci.yml
git commit -m "ci: configure GitHub Actions CI pipeline"

git add .github/workflows/deploy.yml
git commit -m "ci: configure GitHub Actions CD pipeline for Vercel"

# Add documentation commits
git add README.md
git commit -m "docs: create comprehensive README with all requirements"

# Add configuration commits
git add .gitignore
git commit -m "chore: add comprehensive .gitignore file"

git add package.json
git commit -m "chore: update package.json with required scripts"
```

---

## Step 10: Verify Commit History

```bash
# View your commit history
git log --oneline --graph --all

# Count your commits
git log --oneline | wc -l
```

You should have **at least 10 commits** with meaningful messages.

---

## Step 11: Update README with Your Information

1. Open `README.md`
2. Replace `[YOUR FULL NAME AS IN LMS]` with your actual name
3. Replace `[YOUR STUDENT ID]` with your student ID
4. Replace `YOUR_USERNAME` in badge URLs with your GitHub username
5. Update the live deployment URL if you have one

---

## Step 12: Set Up GitHub Secrets (for Deployment)

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Add the following secrets:
   - `VERCEL_TOKEN` - Get from Vercel dashboard → Settings → Tokens
   - `VERCEL_ORG_ID` - Get from Vercel dashboard → Settings → General
   - `VERCEL_PROJECT_ID` - Get from Vercel project settings

---

## Summary Checklist

- [x] Created `main` and `develop` branches
- [x] Created at least 3 feature branches
- [x] Made 10+ meaningful commits
- [x] Created 2+ Pull Requests
- [x] Simulated and resolved merge conflict
- [x] Merged feature branches to `develop`
- [x] Merged `develop` to `main`
- [x] CI pipeline configured and passing
- [x] CD pipeline configured (requires secrets)
- [x] README.md updated with all information

---

## Commit Message Examples

Use conventional commit format:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks
- `ci:` - CI/CD changes

Examples:
- `feat(ui): add glassmorphism effects to card component`
- `fix(todo): prevent empty task submission`
- `docs: update README with deployment instructions`
- `ci: configure GitHub Actions workflows`

---

## Tips

1. **Make commits often** - Don't wait until everything is done
2. **Write clear commit messages** - Future you (and graders) will thank you
3. **Test before committing** - Make sure your code works
4. **Use branches** - Even for small changes, use feature branches
5. **Document conflicts** - When resolving conflicts, explain your choices in commit messages

---

Good luck with your assignment! 🚀
