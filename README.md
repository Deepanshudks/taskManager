# Task Management System

## Description
A full-stack task management system built with React, Express, and MongoDB. Users can create, update, delete, and filter tasks based on their status (Pending, Completed). This project is designed to help users manage tasks efficiently through a user-friendly interface and secure backend.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, React Router
- **Backend**: Express, MongoDB, JWT Authentication
- **Libraries/Tools**: Axios, Zod, CORS

## Features
- User authentication (Login/Signup)
- Create, update, delete tasks
- Filter tasks by status (Pending, Completed, All)
- Responsive design using Tailwind CSS
- JWT-based authentication for secure access

## Installation Instructions

### Step 1: Clone the Repository
To get started, clone this repository to your local machine:
```bash
git clone https://github.com/Deepanshudks/taskManager.git

Navigate to the Project Folder
Once the repository is cloned, navigate to the project folder:

cd task-management

Step 3: Install Backend Dependencies
Navigate to the backend folder:
cd .\backend\

Install the required dependencies:
npm install

Step : Set Up Environment Variables for the Backend
In the backend folder, create a .env file.
Add the following environment variables to the .env file:

MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret_key

Step : Run the Backend
Navigate to the backend folder if you're not already there.

Start the backend server:

node .\index.js

The backend will now run on http://localhost:3000

Step 4: Install Frontend Dependencies
Navigate to the frontend folder:
cd .\frontend\

Install the required dependencies:
npm install

Set Up Environment Variables for the Frontend
In the frontend folder, create a .env file.
Add the following environment variables to the .env file:

VITE_URL=your_backend_url

Step 7: Run the Frontend
In a separate terminal window, navigate to the frontend folder.
Start the frontend server:

npm run dev
The frontend will now run on http://localhost:5173/

Step 8: Open the Application
Open the frontend in your browser at http://localhost:5173/

The backend will run on http://localhost:3000 

Usage
Frontend Features:
Login/Signup: Users can sign up and log in using their credentials. JWT tokens are used for secure access.
Task Management:
Create new tasks with title, description.
Update the status of tasks to Pending or Completed.
Delete tasks from the list.
Task Filtering: Users can filter tasks by status (All, Pending, Completed).
API Endpoints:
GET /tasks: Fetch all tasks for the logged-in user.
POST /tasks: Create a new task.
PATCH /tasks/{id}: Update the task status (Pending/Completed).
DELETE /tasks/{id}: Delete a task.