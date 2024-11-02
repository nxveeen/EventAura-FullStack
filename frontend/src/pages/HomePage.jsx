import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllEvents } from "../store/EventStore";
import { getUser, getUserAuthenticated, logout } from "../store/AuthStore";
import { User } from "lucide-react";

const HomePage = () => {
  const allEvents = useSelector(getAllEvents);
  const isAuthenticated = useSelector(getUserAuthenticated);
  const currentUser = useSelector(getUser);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
    dispatch({ type: "RESET" });
  }

  return (
    <div className="flex flex-col justify-center items-center">
      {isAuthenticated ? (
        <div className="flex items-center my-2">
          <p>
            Welcome {currentUser.username} {currentUser.email}
          </p>
          <div className="group bg-slate-200 rounded-full p-1 ml-1 hover:cursor-pointer hover:bg-slate-300 ">
            <User size={24} strokeWidth={2} absoluteStrokeWidth />
          </div>
        </div>
      ) : (
        <p>not Welcome</p>
      )}
      <p className="text-xl font-bold">HomePage</p>
      <p>
        Go to{" "}
        <Link to="about" className="text-blue-400 underline">
          about page
        </Link>
      </p>
      {allEvents.map((event) => {
        return <p key={event.id}>{event.name}</p>;
      })}
      <button
        onClick={() => handleLogout()}
        className="bg-slate-200 rounded-md px-2 py-1 mt-2 hover:cursor-pointer hover:bg-slate-300 font-semibold"
      >
        Logout
      </button>
    </div>
  );
};

export default HomePage;
