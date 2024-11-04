import React, { useState } from "react";

export const DarkMode = () => {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  return (
    <div className="">
      <button onClick={toggleTheme}></button>
    </div>
  );
};
