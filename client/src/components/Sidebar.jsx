import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

import { roar } from "../assets";
import { navlinks } from "../constants";
import { BsFillSunFill, BsBrightnessLowFill } from "react-icons/bs";

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${
      isActive && isActive === name && "bg-[#4c4992] dark:bg-[#4b5264]"
    } flex justify-center items-center ${
      !disabled && "cursor-pointer"
    } ${styles}`}
    onClick={handleClick}>
    {!isActive ? (
      <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
    ) : (
      <img
        src={imgUrl}
        alt="fund_logo"
        className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
      />
    )}
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[76vh]">
      <Link to="/">
        <Icon
          styles="w-[76px] h-[76px] dark:bg-[#4c566a] bg-[#3e3c87]"
          imgUrl={roar}
        />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center dark:bg-[#4c566a] bg-[#3e3c87] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-7 ">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>
        {theme === "dark" ? (
          <BsFillSunFill
            className="dark:bg-[#4c566a] bg-[#3e3c87] w-[24px] h-[24px] mb-2 ease-in duration-200 text-white"
            onClick={handleThemeSwitch}
          />
        ) : (
          <BsBrightnessLowFill
            className="dark:bg-[#4c566a] bg-[#3e3c87] w-[24px] h-[24px] mb-2 ease-in duration-200 text-white"
            onClick={handleThemeSwitch}
          />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
