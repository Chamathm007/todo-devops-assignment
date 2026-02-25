 TODO DevOps Assignment

A modern, production-ready Todo List Web Application built for the Advanced Git & DevOps Assignment.

This project demonstrates:

- Git branching strategies  
- Feature-based development  
- Pull Requests & merge conflict handling  
- CI/CD using GitHub Actions  
- Automated deployment with Vercel  

Group Information

Student Name: W.G.C.M. Nimsara  
Student ID: ITBIN-2313-0072  
Role: DevOps Engineer & Full-Stack Developer  

 Project Description

The Todo List application is a fully functional, responsive web application that allows users to manage daily tasks efficiently.

Built using Vanilla HTML, CSS, and JavaScript, it demonstrates modern frontend development practices while maintaining simplicity and performance.

Live Deployment

Live URL: 
https://todo-devops-assignment.vercel.app

 Technologies Used
- HTML5  
- CSS3  
- JavaScript (ES6+)  
- Node.js  
- Git & GitHub  
- GitHub Actions  
- Vercel  

Features

Core Functionality

- Add Tasks  
- Delete Tasks  
- Toggle Completion  
- Filter System (All / Active / Completed)  
- Task Counters  
- LocalStorage Support  

 User Experience
-  Modern glassmorphism UI  
-  Fully responsive design  
-  Smooth animations  
-  Accessible semantic HTML  
-  Dark theme background  

 Branch Strategy
- main
 - Production branch  
 - Automatically deploys to Vercel  
 - Requires passing CI checks  

- develop
 - Integration branch  
 - All feature branches merge here first  

- feature branches
 - feature/ui-layout
 - feature/todo-logic
 - feature/filter-system

CI/CD Pipeline

Continuous Integration (CI)
- Triggered on push to `main`, `develop`, and feature branches
- Runs automatically using GitHub Actions
- Installs dependencies
- Runs build & verification scripts

Continuous Deployment (CD)
- Triggered on push to `main`
- Deploys automatically to Vercel
- Uses GitHub Secrets:
  - VERCEL_TOKEN
  - VERCEL_ORG_ID
  - VERCEL_PROJECT_ID

 Setup Instructions
-  Prerequisites
 - Node.js v18+  
 - npm v9+  
 - Git  

- Installation

bash
- Clone the repository
git clone https://github.com/Chamathm007/todo-devops-assignment.git

- Navigate to project directory
cd todo-devops-assignment

- Install dependencies
npm install

- Run development server
npm run dev

- Project Structure
todo-devops-assignment/
│
├── .github/workflows/
│   ├── ci.yml
│   └── deploy.yml
│
├── src/
│   ├── index.html
│   ├── styles/style.css
│   └── scripts/app.js
│
├── package.json
├── .gitignore
└── README.md

Step-by-Step Implementation Guide
Phase 1: Setup
Step 1: Team Formation & Planning
Assign roles
Decide features
Plan Git branching strategy

Step 2: Repository Creation 
Go to GitHub
Click New Repository
Name: todo-devops-assignment
Select Public
Do NOT initialize with README
Click Create

Step 3: Add Collaborators 
Go to Settings - Collaborators

Step 4: Clone Repository
git clone https://github.com/Chamathm007/todo-devops-assignment.git
cd todo-devops-assignment

Step 5: Initial Setup
- Create initial files
touch README.md .gitignore

- Create develop branch
git checkout -b develop
git push -u origin develop

- Create GitHub Actions directory
mkdir -p .github/workflows

- Add initial commit
git add .
git commit -m "chore: initial repository setup"
git push origin develop

Development Workflow
- Create feature branch from develop
- Implement feature
- Commit meaningful messages
- Push branch
- Open Pull Request
- Merge to develop
- Merge develop - main for deployment



