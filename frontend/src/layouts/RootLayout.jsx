import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

const RootLayout = () => {
  return (
    <>
      <MainNavigation />
      <div className="pt-20">
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
