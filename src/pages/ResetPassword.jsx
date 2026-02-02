import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const token = params.get("token");

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://127.0.0.1:8000/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          new_password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.detail || "Invalid or expired token");
      } else {
        setMessage("Password reset successful 🎉");
        setTimeout(() => navigate("/"), 1500);
      }
    } catch (err) {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Invalid reset link
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg gradient to  br from-purple-700 to-pink-700">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/30 shadow-xl"
      >
        <h1 className="text-2xl font-bold text-white text-center mb-4">
          Reset Password 🔑
        </h1>

        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="password"
            placeholder="New password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 outline-none"
          />

          <button
            disabled={loading}
            className="w-full py-3 rounded-lg bg-white text-purple-700 font-semibold"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {message && (
          <p className="text-center text-white/90 mt-4 text-sm">{message}</p>
        )}
      </motion.div>
    </div>
  );
}
