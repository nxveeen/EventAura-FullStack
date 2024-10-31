import React from "react";
import MainNavigation from "../components/MainNavigation";

const ErrorPage = () => {
  return (
    <>
      <MainNavigation />
      <div className="flex flex-col justify-center items-center">
        <p className="text-3xl font-bold text-red-500">
          Error!! Could not find the Page!
        </p>
      </div>
    </>
  );
};

export default ErrorPage;
