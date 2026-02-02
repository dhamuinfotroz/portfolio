import heroImg from "../assets/Conference-amico.png";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            Crack Exams with <br />
            <span className="text-indigo-600">Less Effort</span>
          </h1>

          <p className="text-gray-600 mb-8 max-w-lg">
            Learn smarter with structured syllabus, exams & AI guidance —
            all in one place.
          </p>

          <button className="px-8 py-4 rounded-full bg-black text-white hover:scale-105 transition">
            Start Learning for Free
          </button>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center"
        >
          <img
            src={heroImg}
            alt="Learning illustration"
            className="w-[420px] drop-shadow-xl"
          />
        </motion.div>

      </div>
    </section>
  );
}
