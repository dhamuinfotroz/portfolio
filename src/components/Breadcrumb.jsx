import { Link, useLocation } from "react-router-dom";

export default function Breadcrumb() {
  const location = useLocation();

  const segments = location.pathname
    ?.split("/")
    ?.filter(Boolean) || [];

  if (!segments.length) return null;

  return (
    <nav className="text-sm text-gray-500 mb-6">
      {segments.map((segment, index) => {
        const path = "/" + segments.slice(0, index + 1).join("/");

        return (
          <span key={path}>
            <Link to={path} className="hover:underline capitalize">
              {segment.replace("-", " ")}
            </Link>
            {index < segments.length - 1 && " > "}
          </span>
        );
      })}
    </nav>
  );
}
