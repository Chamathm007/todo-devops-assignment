## Todo DevOps Assignment – Team Todo Board

A clean, beginner-friendly **Todo List application** built with **HTML, CSS, and Vanilla JavaScript**, designed specifically for an **Advanced Git & DevOps Team Collaboration Assignment**.  
The app is fully client-side, persists data in `localStorage`, and is ready to be deployed on **Vercel** or **Netlify** with CI/CD via **GitHub Actions**.

---

### Features

- **Add new tasks**: Quickly create tasks using the input field and Add button (or press Enter).
- **Delete tasks**: Remove tasks individually from the list.
- **Mark tasks as completed**: Toggle completion via a checkbox; completed tasks are visually crossed out.
- **Filter tasks**:
  - **All** – show every task
  - **Active** – show tasks that are not yet completed
  - **Completed** – show only completed tasks
- **Task counters**:
  - **Total** tasks
  - **Active** tasks
  - **Completed** tasks
- **Persistent storage**: All tasks are stored in the browser’s **`localStorage`**.
- **Responsive UI**:
  - Mobile-first layout
  - Flexbox-based structure
  - Works well on phones, tablets, and desktops
- **Modern, clean design**:
  - Card-based layout
  - Subtle shadows and hover effects
  - Accessible, semantic HTML

---

### Technologies Used

- **HTML5** – semantic structure and accessible markup.
- **CSS3** – responsive layout, Flexbox, modern styling, hover states.
- **Vanilla JavaScript (ES6)** – core application logic, DOM manipulation, `localStorage` integration.
- **Git & GitHub** – version control, branching, collaboration.
- **GitHub Actions** – CI and CD workflows.
- **Vercel / Netlify** – static site hosting and deployment (compatible with both).

---

### Project Structure

```text
todo-devops-assignment/
├── .github/
│   └── workflows/
│       ├── ci.yml           # Continuous Integration workflow
│       └── deploy.yml       # Deployment workflow (Vercel-oriented)
├── src/
│   ├── index.html           # Main HTML entry point
│   ├── styles/
│   │   └── style.css        # Global styles
│   └── scripts/
│       └── app.js           # Todo app logic (localStorage, filters, counters)
├── .gitignore               # Git ignored files
├── README.md                # Project documentation
└── package.json             # Project metadata & simple scripts
```

---

### Branch Strategy

- **`main` branch**
  - Always in a **deployable** state.
  - Protected branch (recommended): require passing CI checks before merge.
  - Deployment triggers to production (Vercel) on push.

- **Feature branches**
  - Naming convention:  
    - `feature/<short-description>` (e.g. `feature/add-edit-button`)  
    - `fix/<short-description>` (e.g. `fix/counter-off-by-one`)  
    - `chore/<short-description>` (e.g. `chore/update-readme`)
  - Open a **Pull Request** into `main` for code review.
  - CI (via `ci.yml`) runs automatically on push and PR.

- **Suggested workflow**
  1. Branch off from `main`.
  2. Implement feature / fix.
  3. Commit with clear messages.
  4. Open PR → review → merge after CI passes.
  5. Push to `main` automatically triggers deployment.

---

### CI / CD Overview

- **CI – `.github/workflows/ci.yml`**
  - Triggers on:
    - **push** to any branch
    - **pull_request** targeting any branch
  - Steps:
    - Check out the repository.
    - Set up Node.js (v20).
    - Install dependencies using `npm ci`.
    - Run a basic “build” check using `npm run build`  
      (for this static app, the build step simply ensures that the project and scripts are correctly wired).

- **CD – `.github/workflows/deploy.yml`**
  - Triggers on:
    - **push** to `main`.
  - Steps:
    - Check out repository.
    - Set up Node.js (v20).
    - Install **Vercel CLI**.
    - Deploy the project using `vercel --prod` with GitHub Secrets:
      - `VERCEL_TOKEN`
      - `VERCEL_ORG_ID`
      - `VERCEL_PROJECT_ID`

> Note: The same built assets can be deployed to **Netlify** by connecting this repo in Netlify and using `src` as the publish directory.

---

### Build Status Badges (Placeholders)

You can update these with actual badge URLs once CI/CD is wired to your GitHub repository:

- **CI Status**:  
  `[![CI Status](https://img.shields.io/badge/CI-pending-lightgrey)](https://github.com/OWNER/REPO/actions/workflows/ci.yml)`

- **Deploy Status**:  
  `[![Deploy Status](https://img.shields.io/badge/Deploy-pending-lightgrey)](https://github.com/OWNER/REPO/actions/workflows/deploy.yml)`

Replace `OWNER` and `REPO` with your GitHub organization/user and repository name.

---

### Setup Instructions (Local Development)

- **Prerequisites**
  - A recent **Node.js** and **npm** version (for the helper scripts and CI; the app itself runs without Node).
  - A modern browser (Chrome, Firefox, Edge, Safari).

- **Option 1 – Open directly in the browser**
  1. Clone the repository:
     ```bash
     git clone https://github.com/OWNER/todo-devops-assignment.git
     cd todo-devops-assignment
     ```
  2. Open `src/index.html` directly in your browser (double-click or “Open With…”).

- **Option 2 – Use a simple static server**
  1. Install dependencies:
     ```bash
     npm install
     ```
  2. Start a local server:
     ```bash
     npm start
     ```
  3. Open the printed URL (e.g. `http://localhost:3000`) in your browser.

---

### Deployment

- **Deploy to Vercel**
  1. Create a new Vercel project and link it to this GitHub repo.
  2. Set `src` as the **root/public** directory.
  3. Add the following GitHub Secrets in your repository settings:
     - `VERCEL_TOKEN`
     - `VERCEL_ORG_ID`
     - `VERCEL_PROJECT_ID`
  4. Push to `main` to trigger the `deploy.yml` workflow and deploy.

- **Deploy to Netlify**
  1. Create a new site from Git in Netlify.
  2. Choose this repository.
  3. Use:
     - **Build command**: `npm run build` (or leave empty for pure static)
     - **Publish directory**: `src`
  4. Netlify will deploy on each push to your chosen branch.

---

### Live Deployment (Placeholder)

- **Production URL**: `https://your-live-todo-devops-url.example.com`
- Replace this with the actual Vercel / Netlify URL once deployed.

---

### Application Logic Overview

- **Data model**
  - Each task has:
    - `id` – unique identifier (`string`)
    - `text` – task description (`string`)
    - `completed` – completion state (`boolean`)
  - All tasks are stored as an array in `localStorage` under the key:
    - `todo-devops-assignment-tasks`

- **Core functions in `src/scripts/app.js`**
  - **`addTask(text)`** – creates and stores a new task.
  - **`deleteTask(id)`** – removes a task by its `id`.
  - **`toggleComplete(id)`** – toggles the `completed` flag.
  - **`filterTasks(type)`** – updates the active filter (`all`, `active`, `completed`).
  - **`updateCounter()`** – recalculates and displays total/active/completed counts.
  - Tasks are loaded from `localStorage` on page load, and re-rendered after each change.

---

### Individual Contribution Placeholders

Use this section for team / classroom assignments to document who did what:

- **Student A / Contributor 1**
  - Implemented basic UI (HTML structure, input form, task list).
  - Connected `localStorage` and core JavaScript functions.

- **Student B / Contributor 2**
  - Designed and refined CSS (responsive layout, hover styles, completed-state styling).
  - Improved accessibility (labels, ARIA attributes, keyboard-friendly interactions).

- **Student C / Contributor 3**
  - Set up GitHub Actions (`ci.yml`, `deploy.yml`).
  - Documented branch strategy and CI/CD in `README.md`.

Feel free to edit or expand this for your team and submission.

---

### Notes for Reviewers / Instructors

- The app is intentionally implemented using **only HTML, CSS, and Vanilla JavaScript**.
- The code aims to be:
  - **Beginner-friendly** (clear naming, comments, and separation of concerns).
  - **DevOps-ready** (CI / CD workflows and clear branching strategy).
- The project can run by simply opening `src/index.html` without any build step, while still being suitable for automated pipelines and hosting platforms.

