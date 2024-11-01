import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import {
  getAllEvents,
  getEventStatus,
  getEventError,
  fetchEvents,
} from "../store/EventStore";

const EventsPage = () => {
  const dispatch = useDispatch();

  const events = useSelector(getAllEvents);
  const eventsStatus = useSelector(getEventStatus);
  const eventsError = useSelector(getEventError);

  useEffect(() => {
    if (eventsStatus === "idle") {
      dispatch(fetchEvents());
    }
  }, [eventsStatus, dispatch]);

  function handleDeleteEvent(id) {
    // Handle delete event logic
    console.log(id);
  }

  return (
    <div className="flex p-2 flex-col gap-1">
      <div className="flex justify-between items-center py-2">
        <h1 className="text-3xl capitalize font-medium">events</h1>
        <Link
          to="new"
          className="flex items-center justify-around bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
        >
          Add event
        </Link>
      </div>
      {/* Display error if exists */}
      {eventsError && <div>Error: {eventsError}</div>}{" "}
      <ul>
        {events.length > 0 ? (
          events.map((event) => (
            <li
              key={event.id}
              className="flex items-center justify-between max-w-96 gap-2 py-2"
            >
              <Link to={`${event.id}`} className="underline text-blue-500">
                {event.name}
              </Link>
              <div>
                <Link
                  to={`${event.id}/edit`}
                  className="ml-2 px-2 py-1 rounded bg-gray-900 text-white"
                >
                  Edit
                </Link>
                <button
                  className="ml-2 px-2 py-1 rounded capitalize bg-gray-900 text-white"
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <li>No events found.</li>
        )}
      </ul>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default EventsPage;
