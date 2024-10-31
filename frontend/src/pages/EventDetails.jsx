import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getEventStatus,
  getEventError,
  fetchEventById,
  getSelectedEvent,
} from "../store/EventStore";

const EventDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const currEvent = useSelector(getSelectedEvent);
  const eventStatus = useSelector(getEventStatus);
  const eventError = useSelector(getEventError);

  useEffect(() => {
    dispatch(fetchEventById(params.eventid));
  }, [dispatch, params.eventid]);

  if (eventStatus === "loading") {
    return <p>Loading event details...</p>;
  }

  if (eventError) {
    return <p>Error loading event: {eventError}</p>;
  }

  return (
    <div>
      <p className="text-3xl font-bold">
        Event {currEvent ? currEvent.name : "Not Found"} Details
      </p>
      {currEvent ? (
        <div>
          <p>{currEvent.description}</p>
          <p>Date: {currEvent.date}</p>
          <p>Location: {currEvent.location}</p>
        </div>
      ) : (
        <p>Event not found.</p>
      )}
      <Link to=".." className="underline text-blue-400">
        back
      </Link>
    </div>
  );
};

export default EventDetails;
