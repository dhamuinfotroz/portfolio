import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ExamCard({ title, icon, color }) {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={() => navigate(`/explore/${title.toLowerCase()}`)}
      className="
        group cursor-pointer rounded-xl border
        bg-white p-5 shadow-sm
        hover:shadow-md hover:border-indigo-500
        transition-all duration-200
      "
    >
      {/* Icon */}
      <div
        className={`
          text-3xl mb-3 ${color}
          group-hover:scale-110 transition-transform
        `}
      >
        {icon}
      </div>

      {/* Title */}
      <h3 className="font-semibold text-lg group-hover:text-indigo-600 transition-colors">
        {title}
      </h3>

      {/* Subtitle */}
      <p className="text-sm text-gray-500 mt-1">
        Full syllabus • Mock tests • Analysis
      </p>
    </motion.div>
  );
}

