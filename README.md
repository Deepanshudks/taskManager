# TaskManagerPro 

A full-stack task management system built with React, Express, and MongoDB. Users can create, update, delete, and filter tasks based on their status (Pending, Completed). This project is designed to help users manage tasks efficiently through a user-friendly interface and secure backend.


 It includes the following:

- Backend API with Express & MongoDB
- Routes for signin, signup,tasks, edit.
- JWT authentication stored in localStorage
- Protected routes and endpoints
- Custom middleware to check JSON web token.
- React frontend to signin, signup, tasks,createtask ,edit, and delete
- Tailwind for responsive UI
- React-hot-toast for notifications

## Usage

- Create a MongoDB database and obtain your `MongoDB URI`

### Env Variables
  
Create a `.env file` in backend and add the following

```
JWT_SECRET = "JwtSecret"
MONGO_URL = "mongodb://localhost:27017/Task"
```
Change the JWT_SECRET to what you want

Update `.env file` in frontend and add the following

```
VITE_URL = "http://localhost:3000" 
```
Change the VITE_URL as per your backend url


### Install Dependencies (backend)


```
cd .\backend\
npm install
```
# Run backend only
```
node .\index.js
```

### Install Dependencies (frontend )
```
cd .\frontend\
npm install
```
### Run

# Run frontend (:5173) & backend (:3000)
```
npm run dev
```

