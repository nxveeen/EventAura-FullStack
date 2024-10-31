import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import EventsPage from "./pages/EventsPage";
import EventDetails from "./pages/EventDetails";
import NewEvent from "./pages/NewEvent";
import EventEdit from "./pages/EventEdit";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "about", element: <AboutPage /> },
        {
          path: "events",
          element: <EventsPage />,
          loader: eventLoader,
          children: [
            { path: ":eventid", element: <EventDetails /> },
            { path: "new", element: <NewEvent /> },
            {
              path: ":eventid/edit",
              element: <EventEdit />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

const eventLoader = async () => {
  const res = await fetch("http://127.0.0.1:5000/events");
  const data = await res.json();
  return data;
};
