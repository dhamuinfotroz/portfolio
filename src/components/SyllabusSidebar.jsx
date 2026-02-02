import { useNavigate, useLocation } from "react-router-dom";
import sidebarData from "../data/historySidebar.json";

export default function SyllabusSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="w-72 pr-6 border-r">
      <h3 className="font-semibold mb-4">Syllabus</h3>

      <ul className="space-y-2">
        {sidebarData.map((item, index) => {
          const active =
            location.pathname === item.path ||
            location.pathname.startsWith(item.path + "/");

          return (
            <li
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`p-3 rounded cursor-pointer flex justify-between items-center
                ${active ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"}
              `}
            >
              <div>
                <div className="text-sm">
                  {String(index + 1).padStart(2, "0")} {item.title}
                </div>
                <div className="text-xs text-gray-500">
                  {item.count} subtopics
                </div>
              </div>

              <span className="text-gray-400">›</span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
