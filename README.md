# EventAura Project

This is a full-stack web application that includes a **Flask** backend and a **React** frontend (using Vite and Redux-Toolkit). The app allows for managing events, with separate interfaces for organizers and attendees.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Frontend Setup (React with Vite)](#frontend-setup-react-with-vite)
- [Backend Setup (Flask)](#backend-setup-flask)

## Features

- Event management for organizers (create, edit, delete events).
- Event browsing for attendees (view events, search by criteria).
- Secure RESTful API for communication between the backend and frontend.
- State management using Redux in the frontend.

## Tech Stack

- **Frontend**: React, Vite, Redux Toolkit
- **Backend**: Flask, SQLAlchemy, SQLite (or other DB of choice)
- **Styling**: Tailwind CSS (optional, based on your project requirements)
- **API Communication**: RESTful API, JSON-based communication
- **Tooling**: Node.js, Python, Git, CORS

## Getting Started

### Prerequisites

- Node.js and npm installed (for the frontend)
- Python 3.x installed (for the backend)
- Virtual environment for Python (optional but recommended)

### Frontend Setup (Vite + Redux)

1. **Navigate to the Frontend Folder**

```bash
cd frontend

npm install
# or
pnpm install

npm run dev
# or
pnpm run dev
```

### Backend Setup (Flask)

2. **Navigate to the Backend Folder** (if applicable):

```bash
cd backend

flask run (debug = False)
# or
python app.py (debug = True)
```
