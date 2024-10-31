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
  // const events = useSelector((state) => state.events);
  // const events = useLoaderData();
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
    // dispatch(deleteEvent({ id }));
    console.log(id);
  }

  return (
    <div className="flex p-2 flex-col gap-1">
      <div className="flex justify-between items-center py-2">
        <h1 className="text-3xl capitalize font-medium">events</h1>
        <Link
          to="new"
          className="flex items-center justify-around w-[120px] bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-calendar-plus"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12.5 21h-6.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v5" />
            <path d="M16 3v4" />
            <path d="M8 3v4" />
            <path d="M4 11h16" />
            <path d="M16 19h6" />
            <path d="M19 16v6" />
          </svg>
          Add event
        </Link>
      </div>

      <ul>
        {events.map((event) => {
          return (
            <li
              key={event.id}
              className="flex items-center justify-between max-w-96 gap-2 py-2 "
            >
              <Link to={`${event.id}`} className="underline text-blue-500">
                {event.name}
              </Link>
              <div>
                <Link
                  to={`${event.id}/edit`}
                  className="ml-2 px-2 py-1 rounded bg-gray-900  text-white"
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
          );
        })}
      </ul>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default EventsPage;
