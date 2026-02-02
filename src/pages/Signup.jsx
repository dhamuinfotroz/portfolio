import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Simple auth service directly in this file
const authService = {
  async signup(email, password) {
    try {
      // FastAPI backend running on port 8000
      const response = await fetch('http://localhost:8000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }
};

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await authService.signup(email, password);
      // Navigate to login page after successful signup
      navigate("/");
    } catch (err) {
      setError("Signup failed. Try another email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg gradient-to-br from-indigo-700 via-purple-700 to-pink-600">
      
      {/* Floating gradient blobs */}
      <motion.div
        animate={{ x: [0, 80, 0], y: [0, -60, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute top-20 left-20 w-72 h-72 bg-indigo-400 rounded-full blur-3xl opacity-40"
      />
      <motion.div
        animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
        className="absolute bottom-20 right-20 w-72 h-72 bg-pink-400 rounded-full blur-3xl opacity-40"
      />

      {/* Glass card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md p-8 rounded-2xl 
                   bg-white/15 backdrop-blur-xl border border-white/30 
                   shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Create Account ✨
        </h1>
        <p className="text-center text-white/80 mb-6">
          Start your exam preparation journey
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

        <form onSubmit={handleSignup} className="space-y-4">
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
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white 
                       placeholder-white/70 border border-white/30 
                       focus:ring-2 focus:ring-white outline-none"
          />

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            disabled={loading}
            className="w-full py-3 rounded-lg bg-white text-indigo-700 
                       font-bold shadow-lg hover:bg-gray-100 transition
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </motion.button>
        </form>

        <p className="text-center text-sm text-white/80 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="font-semibold underline cursor-pointer hover:text-white"
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
}