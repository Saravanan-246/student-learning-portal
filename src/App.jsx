import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Exams from "./pages/Exams.jsx";
import TakeExam from "./pages/TakeExam.jsx";
import Results from "./pages/Results.jsx";
import Profile from "./pages/Profile.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import StudentLayout from "./layout/StudentLayout.jsx";

export default function App() {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* PROTECTED STUDENT AREA */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="exams" element={<Exams />} />
        <Route path="exam/:id" element={<TakeExam />} />
        <Route path="results" element={<Results />} />
        <Route path="profile" element={<Profile />} />

        {/* Redirect default */}
        <Route index element={<Dashboard />} />
      </Route>

      {/* Catch invalid URL → Login */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
