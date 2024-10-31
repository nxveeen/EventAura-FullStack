import React from "react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-xl font-bold">AboutPage</p>
      <p>
        Go to
        <Link to="/" className="text-blue-400 underline">
          home page
        </Link>
      </p>
    </div>
  );
};

export default AboutPage;
