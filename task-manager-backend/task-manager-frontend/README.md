<<<<<<< HEAD
# Task Manager — Full Stack (MERN + TypeScript)

### 📋 Project Overview

**Task Manager** is a full-stack productivity app built using **TypeScript**, **Node/Express**, **MongoDB**, and **React**.
It enables users to register, log in, and manage tasks with **tags**, **status filters**, and **due dates** — presented in a clean Material-UI dashboard.

---

## 🚀 Features

* ✅ User signup and login with JWT authentication
* 🔒 Protected task routes (token-based access)
* ➕ Create, 📝 Edit, ❌ Delete tasks
* 🏷️ Add multiple tags per task
* 📅 Due date selection using MUI DatePicker
* 🔍 Filter tasks by **status** or **tags**
* 📊 Task stats: total, pending, in-progress, completed
* 💻 Fully responsive Material-UI dashboard

---

## 🧠 Tech Stack

| Layer        | Technologies                              |
| ------------ | ----------------------------------------- |
| **Frontend** | React, TypeScript, Axios, Material UI     |
| **Backend**  | Node.js, Express, TypeScript, JWT, bcrypt |
| **Database** | MongoDB Atlas                             |
| **Tools**    | Postman, Git, npm                         |

---

## 🧩 Repository Structure

```
task-manager/
├─ task-manager-backend/
│  ├─ src/
│  ├─ package.json
│  └─ .env.example
├─ task-manager-frontend/
│  ├─ src/
│  ├─ package.json
│  └─ public/
└─ README.md
```

---

## ⚙️ Setup & Run (Local)

### 1️⃣ Backend

```bash
cd task-manager-backend
npm install
# create a .env file (see below)
npm run dev
```

**`.env` example**

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

### 2️⃣ Frontend

```bash
cd ../task-manager-frontend
npm install
npm start
```

Then visit 👉 `http://localhost:3000`

---

## 🔌 API Endpoints

| Method | Endpoint           | Description           |
| ------ | ------------------ | --------------------- |
| POST   | `/api/auth/signup` | Register user         |
| POST   | `/api/auth/login`  | Login and receive JWT |
| GET    | `/api/tasks`       | Fetch all user tasks  |
| POST   | `/api/tasks`       | Create new task       |
| PUT    | `/api/tasks/:id`   | Update task           |
| DELETE | `/api/tasks/:id`   | Delete task           |

**Headers**

```
Authorization: Bearer <your_token>
```

---

## 🧱 Environment Variables

| Variable     | Description                     |
| ------------ | ------------------------------- |
| `PORT`       | Backend port (default: 5000)    |
| `MONGO_URI`  | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for token signing    |

---

## 💡 Development Approach

1. **Backend first:** Designed REST API using Express + TypeScript with Mongoose models.
2. **Authentication:** Added JWT for secure login and protected routes.
3. **Frontend:** Built responsive UI in React using Material UI components.
4. **Integration:** Connected frontend → backend via Axios API calls.
5. **Enhancements:** Added filtering, stats cards, and due date picker.

---

## 🧾 Screenshots

Add these under `/docs/screenshots/`:

* `SignupPage.png`
* `LoginPage.png`
* `Dashboard.png`
* `AddTaskForm.png`
* `TaskCard.png`
* `FilterView.png`

---

## 📦 Deliverables

You can submit **either of**:

1. **GitHub Repo Link:**

   ```
   https://github.com/<your-username>/task-manager
   ```

2. **ZIP File:**
   `task-manager-deliverable.zip` containing:

   * `task-manager-backend/`
   * `task-manager-frontend/`
   * `README.md`
   * `/docs/screenshots/`

---

## 🗒️ Notes for Interviewer

* Tokens are stored in localStorage (for demo). In production, use **httpOnly cookies**.
* Deployment suggestions:

  * Backend → Render / Railway
  * Frontend → Vercel / Netlify
  * Database → MongoDB Atlas
* Optional bonus: add pagination or Kanban board layout for tasks.

---

**Author:** Sayali Balkrushna Zambre

=======
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
>>>>>>> 7faab2697db194e1fb2c392547ab0c24e7e67663
