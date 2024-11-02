import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import the layouts
import RootLayout from "./layouts/RootLayout";

// import components
import NewEvent from "./components/NewEvent";
import EventEdit from "./components/EventEdit";

// Import the routes
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ErrorPage from "./pages/ErrorPage";
import EventsPage from "./pages/EventsPage";
import EventDetails from "./pages/EventDetails";
import LoginPage from "./pages/auth/LoginPage";

function App() {
  // react-router object for routing
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
