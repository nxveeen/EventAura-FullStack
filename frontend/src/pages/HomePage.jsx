import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllEvents } from "../store/EventStore";
import { getUser, getUserAuthenticated, logout } from "../store/AuthStore";

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
        <p>
          Welcome {currentUser.username} {currentUser.email}
        </p>
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
      <button onClick={() => handleLogout()}>logout</button>
    </div>
  );
};

export default HomePage;
