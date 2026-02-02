import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaList,
  FaBook,
  FaClipboardList,
  FaUser,
} from "react-icons/fa";

const menu = [
  { path: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
  { path: "/categories", label: "Categories", icon: <FaList /> },
  { path: "/exams", label: "Exams", icon: <FaBook /> },
  { path: "/syllabus", label: "Syllabus", icon: <FaClipboardList /> },
  { path: "/profile", label: "Profile", icon: <FaUser /> },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-6 space-y-4">
      {menu.map((m) => {
        const active = location.pathname === m.path;
        return (
          <Link
            key={m.path}
            to={m.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              active
                ? "bg-indigo-600 text-white"
                : "hover:bg-indigo-700 hover:text-white text-gray-300"
            }`}
          >
            <span className="text-lg">{m.icon}</span>
            <span className="font-medium">{m.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
