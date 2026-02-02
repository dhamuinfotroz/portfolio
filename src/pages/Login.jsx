import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Simple auth service directly in this file
const authService = {
  async login(email, password) {
    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Login failed");
    }

    return data;
  },
};

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await authService.login(email, password);

      // Store token if you add JWT later
      if (res.access_token) {
        localStorage.setItem("token", res.access_token);
      }

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden 
                 bg gradient-to-br from-indigo-700 via-purple-700 to-pink-600"
    >
      {/* Background blobs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-20 w-72 h-72 bg-pink-400 rounded-full blur-3xl opacity-30"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-20 w-72 h-72 bg-indigo-400 rounded-full blur-3xl opacity-30"
      />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md p-8 rounded-2xl 
                   bg-white/15 backdrop-blur-xl border border-white/30 
                   shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Welcome Back 👋
        </h1>

        <p className="text-center text-white/80 mb-6">
          Login to continue your exam prep
        </p>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-500/20 text-red-200 p-2 rounded mb-4 text-sm text-center"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white 
                       placeholder-white/70 border border-white/30 
                       focus:ring-2 focus:ring-white outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white 
                       placeholder-white/70 border border-white/30 
                       focus:ring-2 focus:ring-white outline-none"
          />

          {/* Forgot password */}
          <p
            onClick={() => navigate("/forgot-password")}
            className="text-right text-sm text-white/80 underline cursor-pointer hover:text-white"
          >
            Forgot password?
          </p>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            className="w-full py-3 rounded-lg bg-white text-indigo-700 
                       font-bold shadow-lg hover:bg-gray-100 transition 
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        <p className="text-center text-sm text-white/80 mt-6">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="font-semibold underline cursor-pointer hover:text-white"
          >
            Sign up
          </span>
        </p>
      </motion.div>
    </div>
  );
}
