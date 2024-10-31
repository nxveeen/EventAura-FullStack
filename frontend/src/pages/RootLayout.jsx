import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

const RootLayout = () => {
  return (
    <>
      <div>
        <MainNavigation />
      </div>
      <Outlet />
    </>
  );
};

export default RootLayout;
