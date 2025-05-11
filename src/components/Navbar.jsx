import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiMoon } from "react-icons/bi";
import { BiSun } from "react-icons/bi";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      return savedTheme === "dark";
    } else {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="isolate">
      <div className="flex flex-row justify-between items-center p-4 md:px-6 lg:py-4 text-neutral-700 dark:text-neutral-300 xl:max-w-[70%] mx-auto transition-colors duration-300">
        <div className="">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium tracking-tight">
            <Link to="/">FLIGHT INCIDENT</Link>
          </h1>
        </div>
        <div className="relative flex flex-row items-center justify-center gap-4 sm:gap-5 md:gap-6 lg:gap-8 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <button
            onClick={toggleDarkMode}
            className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 ${
              darkMode
                ? "bg-neutral-100 hover:bg-neutral-300 text-neutral-900"
                : "bg-neutral-950 hover:bg-neutral-700 text-white"
            } rounded-full flex justify-center items-center z-10 shadow-lg cursor-pointer transition-colors duration-300`}
          >
            <i>{darkMode ? <BiSun /> : <BiMoon />}</i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
