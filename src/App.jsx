import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

/* ==================== AUTH PAGES ==================== */
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

/* ==================== CORE PAGES ==================== */
import Dashboard from "./pages/Dashboard";
import ExploreExam from "./pages/ExploreExam";
import CoursePage from "./pages/CoursePage";
import TopicPage from "./pages/TopicPage";
import LessonPage from "./pages/LessonPage";
import HistoryNodePage from "./pages/HistoryNodePage";

/* ==================== ROUTE GUARD ==================== */
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ================= DASHBOARD ================= */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* ================= EXPLORE FLOW ================= */}
        {/* Exams */}
        <Route
          path="/explore/:exam"
          element={
            <PrivateRoute>
              <ExploreExam />
            </PrivateRoute>
          }
        />

        {/* Courses */}
        <Route
          path="/explore/:exam/:course"
          element={
            <PrivateRoute>
              <CoursePage />
            </PrivateRoute>
          }
        />

        {/* Topics */}
        <Route
          path="/explore/:exam/:course/:topic"
          element={
            <PrivateRoute>
              <TopicPage />
            </PrivateRoute>
          }
        />

        {/* Lessons */}
        <Route
          path="/explore/:exam/:course/:topic/:lesson"
          element={
            <PrivateRoute>
              <LessonPage />
            </PrivateRoute>
          }
        />

        {/* ================= HISTORY (EDUREV STYLE) ================= */}
        {/* Wildcard route handles full history tree */}
        <Route
          path="/explore/upsc/history/*"
          element={
            <PrivateRoute>
              <HistoryNodePage />
            </PrivateRoute>
          }
        />

        {/* ================= FALLBACK ================= */}
        <Route
          path="*"
          element={
            <div className="p-10 text-center text-gray-500">
              Page Not Found
            </div>
          }
        />

      </Routes>
    </AnimatePresence>
  );
}

export default App;
