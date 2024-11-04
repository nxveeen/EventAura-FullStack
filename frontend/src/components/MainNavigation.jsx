import { useState, useEffect } from "react";
import { useNavigate, NavLink, redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { User, Menu, X } from "lucide-react";

import { getUser, getUserAuthenticated, logout } from "../store/AuthStore";

const MainNavigation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const navItems = [
    { to: "/", name: "Home" },
    { to: "movies", name: "Movies" },
    { to: "shows", name: "Shows" },
    { to: "events", name: "Events" },
    { to: "concerts", name: "Concerts" },
  ];

  const isAuthenticated = useSelector(getUserAuthenticated);
  const currentUser = useSelector(getUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    dispatch({ type: "RESET" });
  }
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsAnimating(true);
  };

  useEffect(() => {
    // Handle clicking outside to close sidebar
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById("mobile-sidebar");
      const menuButton = document.getElementById("menu-button");

      if (
        sidebar &&
        !sidebar.contains(event.target) &&
        !menuButton?.contains(event.target) &&
        isSidebarOpen
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <header className="fixed z-50 w-full h-auto ">
      <nav className="flex items-center justify-between bg-slate-100 p-2 h-[50px] min-h-[50px] shadow-md">
        {/* Mobile menu button */}
        <button
          id="menu-button"
          onClick={toggleSidebar}
          className="md:hidden text-gray-600 focus:outline-none p-2 transition-transform duration-200 ease-in-out hover:scale-110"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Links - Desktop */}
        <ul className="hidden md:flex">
          {navItems.map((item, index) => {
            if (isAuthenticated && item.name === "Auth") return null;
            return (
              <li key={index} className="mx-2 text-gray-600 font-semibold">
                <NavLink
                  to={item.to}
                  end
                  className={({ isActive }) =>
                    `transition-all duration-200 hover:text-gray-900 font-medium text-lg ${
                      isActive ? "underline underline-offset-2" : ""
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            );
          })}
        </ul>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search shows, events, plays, activities and more"
            className="outline-1 outline-gray-400 p-1 w-[240px] rounded-sm text-ellipsis text-sm"
          />

          <select
            name="city_select"
            id="city_select"
            className="p-1 text-sm text-gray-400 text-ellipsis outline-gray-400 rounded-sm w-24"
          >
            <option value="">Select your city</option>
            <option value="Ujjain">Ujjain</option>
          </select>

          {/* User icon for authenticated user */}
          {isAuthenticated ? (
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:cursor-pointer">
                <User
                  size={20}
                  strokeWidth={2}
                  absoluteStrokeWidth
                  className="text-white"
                />
              </div>
              <button
                onClick={() => handleLogout()}
                className="bg-slate-200 rounded-md px-2 py-1 hover:cursor-pointer hover:bg-slate-300 font-semibold"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => {
                  navigate("auth?mode=login");
                }}
                className="bg-slate-200 rounded-md px-2 py-1 hover:cursor-pointer hover:bg-slate-300 font-semibold"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed h-screen inset-0 bg-black/30 transition-opacity duration-300 md:hidden ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar - Mobile */}
      <aside
        id="mobile-sidebar"
        className={`fixed h-screen inset-y-0 left-0 w-64 bg-slate-200 shadow-lg z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={toggleSidebar}
            className="text-gray-600 transition-transform duration-200 hover:scale-110"
          >
            <X size={24} />
          </button>
        </div>
        <ul className="flex flex-col space-y-4 p-4">
          {navItems.map((item, index) => {
            if (isAuthenticated && item.name === "Auth") return null;
            return (
              <li
                key={index}
                className="text-gray-600 font-semibold transform transition-transform duration-200 hover:translate-x-2"
              >
                <NavLink
                  to={item.to}
                  end
                  onClick={toggleSidebar}
                  className={({ isActive }) =>
                    `block transition-colors duration-200 hover:text-gray-900 ${
                      isActive ? "underline underline-offset-2" : ""
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </aside>
    </header>
  );
};

export default MainNavigation;
