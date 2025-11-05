import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import TaskPage from "./pages/TaskPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  const token = localStorage.getItem("token");

  return (
    <Router>
      {/* ✅ Global Toast notification container */}
      <ToastContainer position="top-center" autoClose={2000} />

      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Task Page */}
        <Route
          path="/tasks"
          element={token ? <TaskPage /> : <Navigate to="/login" />}
        />

        {/* Default Route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
