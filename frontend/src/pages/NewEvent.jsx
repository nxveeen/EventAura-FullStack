import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllEvents, uploadEvent } from "../store/EventStore";

const NewEvent = ({ onSubmit }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allEvents = useSelector(getAllEvents);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    date: "",
    location: "",
    description: "",
    organizerName: "",
    organizerEmail: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      id: "e" + (allEvents.length + 1),
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Event name is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.organizerName)
      newErrors.organizerName = "Organizer name is required";
    if (
      !formData.organizerEmail ||
      !/\S+@\S+\.\S+/.test(formData.organizerEmail)
    ) {
      newErrors.organizerEmail = "Valid email is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // dispatch(addEvent(formData));
      dispatch(uploadEvent(formData));

      setFormData({
        name: "",
        date: "",
        location: "",
        description: "",
        organizerName: "",
        organizerEmail: "",
      });
      setErrors({});

      handleNavigation();
    }
  };

  function handleNavigation() {
    navigate("..", { relative: "path" });
  }

  return (
    <div className="p-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-4 border rounded-lg shadow-md bg-slate-100"
      >
        <h2 className="text-2xl font-bold mb-4">Create New Event</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Event Name</label>
          <input
            type="text"
            autoComplete="off"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            name="date"
            autoComplete="off"
            value={formData.date}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            autoComplete="off"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Organizer Name</label>
          <input
            type="text"
            autoComplete="off"
            name="organizerName"
            value={formData.organizerName}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          {errors.organizerName && (
            <p className="text-red-500 text-sm">{errors.organizerName}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Organizer Email</label>
          <input
            type="email"
            name="organizerEmail"
            autoComplete="off"
            value={formData.organizerEmail}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          {errors.organizerEmail && (
            <p className="text-red-500 text-sm">{errors.organizerEmail}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit Event
        </button>
        <Link to=".." relative="path" className="ml-4 underline text-blue-400">
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default NewEvent;
