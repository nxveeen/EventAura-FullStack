import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import EventsPage from "./pages/EventsPage";
import EventDetails from "./pages/EventDetails";
import NewEvent from "./pages/NewEvent";
import EventEdit from "./pages/EventEdit";
import LoginPage from "./pages/auth/LoginPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "about", element: <AboutPage /> },
        { path: "auth", element: <LoginPage /> },
        {
          path: "events",
          element: <EventsPage />,
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
