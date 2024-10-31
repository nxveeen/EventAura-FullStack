# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# WebApp Project

This is a full-stack web application that includes a **Flask** backend and a **React** frontend (using Vite). The app allows for managing events, with separate interfaces for organizers and attendees.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Backend Setup (Flask)](#backend-setup-flask)
- [Frontend Setup (React with Vite)](#frontend-setup-react-with-vite)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)

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

### Backend Setup (Flask)

1. **Navigate to the Backend Folder** (if applicable):
   ```bash
   cd backend
   ```
