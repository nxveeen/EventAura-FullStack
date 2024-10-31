import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { editEvent, getAllEvents } from "../store/EventStore";

const EventEdit = () => {
  const { eventid } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const event = useSelector((state) =>
  //   state.events.find((event) => event.id === eventid)
  // );

  const allevents = useSelector(getAllEvents);
  const eventToEdit = allevents.find((event) => event.id === eventid);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    organizerName: "",
    organizerEmail: "",
  });

  useEffect(() => {
    if (eventToEdit) {
      setFormData({
        name: eventToEdit.name || "",
        description: eventToEdit.description || "",
        date: eventToEdit.date || "",
        location: eventToEdit.location || "",
        organizerName: eventToEdit.organizerName || "",
        organizerEmail: eventToEdit.organizerEmail || "",
      });
    }
  }, [eventToEdit]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editEvent({ id: eventid, updates: formData }));
    navigate(`/events/${eventid}`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Edit Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Event Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Organizer Name</label>
          <input
            type="text"
            name="organizerName"
            value={formData.organizerName}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Organizer Email</label>
          <input
            type="email"
            name="organizerEmail"
            value={formData.organizerEmail}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
        >
          Save Changes
        </button>
        <Link
          to={`/events/${eventid}`}
          className="ml-4 underline text-blue-400"
        >
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default EventEdit;
