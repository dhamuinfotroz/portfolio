import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function NaveBar2() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const indicatorRef = useRef(null);
  const menuRef = useRef(null);

  // Scroll blur + shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Move indicator bar
  useEffect(() => {
    const activeLink = menuRef.current?.querySelector(".nav-active");
    if (activeLink && indicatorRef.current) {
      indicatorRef.current.style.width = `${activeLink.offsetWidth}px`;
      indicatorRef.current.style.transform = `translateX(${activeLink.offsetLeft}px)`;
    }
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `relative px-1 font-medium transition-colors duration-200
     ${isActive ? "text-black nav-active" : "text-gray-700 hover:text-black"}`;

  return (
    <nav
      className={`sticky top-0 z-50 border-b transition-all duration-300
        ${scrolled ? "bg-white/70 backdrop-blur-lg shadow-md" : "bg-white"}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
            I
          </div>
          <h1 className="text-xl font-bold tracking-wide">
            Info<span className="text-orange-500">Cloud</span>
          </h1>
        </div>

        {/* Menu */}
        <div className="relative hidden md:flex items-center gap-8" ref={menuRef}>
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/categories" className={navLinkClass}>
            Subscriptions
          </NavLink>

          <NavLink to="/profile" className={navLinkClass}>
            Profile
          </NavLink>

          {/* Animated Indicator */}
          <span
            ref={indicatorRef}
            className="absolute -bottom-3 left-0 h[2px] bg-orange-500 rounded-full
                       transition-all duration-300"
          />
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
