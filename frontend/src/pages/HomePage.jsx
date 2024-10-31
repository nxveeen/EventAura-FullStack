import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllEvents } from "../store/EventStore";

const HomePage = () => {
  const allEvents = useSelector(getAllEvents);

  return (
    <div className="flex flex-col justify-center items-center">
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
    </div>
  );
};

export default HomePage;
