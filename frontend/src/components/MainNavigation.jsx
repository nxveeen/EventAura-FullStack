import { NavLink } from "react-router-dom";

const MainNavigation = () => {
  return (
    <header>
      <nav className="flex justify-center text-slate-100 bg-slate-700 p-2">
        <ul className="flex">
          <li className="mx-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? "underline" : undefined)}
            >
              Home
            </NavLink>
          </li>
          <li className="mx-2">
            <NavLink
              to="about"
              className={({ isActive }) => (isActive ? "underline" : undefined)}
            >
              About
            </NavLink>
          </li>
          <li className="mx-2">
            <NavLink
              to="events"
              className={({ isActive }) => (isActive ? "underline" : undefined)}
            >
              Events
            </NavLink>
          </li>
          <li className="mx-2">
            <NavLink
              to="auth?mode=login"
              className={({ isActive }) => (isActive ? "underline" : undefined)}
            >
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
