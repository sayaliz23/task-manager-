# Task Manager Full-Stack Application

A modern task management application built with React, TypeScript, Node.js, and MongoDB. Features a clean material design UI, secure authentication, and real-time task updates.

## Features

- 🔐 **User Authentication**
  - Secure login and signup
  - JWT-based authentication
  - Protected routes

- 📋 **Task Management**
  - Create, read, update, and delete tasks
  - Task status tracking (Pending, In Progress, Completed)
  - Task filtering by status
  - Due date assignment
  - Tag system for task categorization

- 📊 **Dashboard**
  - Task statistics overview
  - Status-based task counts
  - Responsive grid layout

## Tech Stack

### Frontend
- React with TypeScript
- Material-UI (MUI) components
- React Router for navigation
- Axios for API calls

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

## Setup Instructions

### Environment Variables

Create `.env` files in both frontend and backend directories:

#### Backend (.env)
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000
```

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd task-manager-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm run dev
   ```

Server will start on http://localhost:5000

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd task-manager-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

Application will open at http://localhost:3000

## API Endpoints

### Authentication
- POST `/api/auth/signup` - Create new user account
- POST `/api/auth/login` - Login user

### Tasks
- GET `/api/tasks` - Get all tasks for logged-in user
- POST `/api/tasks` - Create new task
- PUT `/api/tasks/:id` - Update existing task
- DELETE `/api/tasks/:id` - Delete task
- GET `/api/tasks/:id` - Get single task

## Screenshots

### Backend Setup
- `screenshots/backend-start.png` - Server startup and MongoDB connection
- `screenshots/backend-api-test.png` - API endpoint testing

### Frontend Views
- `screenshots/login.png` - Login page
- `screenshots/signup.png` - Signup page
- `screenshots/dashboard.png` - Main task dashboard
- `screenshots/task-create.png` - Task creation modal
- `screenshots/task-edit.png` - Task editing interface

## Data Models

### User
```typescript
{
  email: string;
  password: string; // hashed
  name: string;
  createdAt: Date;
}
```

### Task
```typescript
{
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  dueDate?: Date;
  tags?: string[];
  userId: ObjectId; // reference to User
  createdAt: Date;
  updatedAt: Date;
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).