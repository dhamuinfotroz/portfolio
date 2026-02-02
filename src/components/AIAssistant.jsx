import { useState } from "react";
import { motion } from "framer-motion";

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "ai", text: "Hi 👋 I can help you with syllabus & exams." },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input) return;

    setMessages([
      ...messages,
      { from: "user", text: input },
      { from: "ai", text: "I'll help you with that! 🚀 (API next)" },
    ]);
    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-6 right-6 bg-black text-white px-4 py-3 rounded-full shadow-lg"
        onClick={() => setOpen(!open)}
      >
        🤖 AI
      </motion.button>

      {/* Chat Window */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-20 right-6 w-80 bg-white rounded-xl shadow-xl flex flex-col"
        >
          <div className="p-3 font-semibold border-b">AI Assistant</div>

          <div className="flex-1 p-3 space-y-2 overflow-y-auto text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg ${
                  m.from === "user"
                    ? "bg-indigo-100 self-end"
                    : "bg-gray-100"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="flex border-t">
            <input
              className="flex-1 p-2 text-sm outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
            />
            <button
              onClick={sendMessage}
              className="px-3 text-indigo-600 font-semibold"
            >
              Send
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}
