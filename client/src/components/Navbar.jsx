import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useStateContext } from "../context";
import { BsBrightnessLowFill, BsFillSunFill } from "react-icons/bs";

import { CustomButton } from "./";
import { menu, profile, roar } from "../assets";
import { navlinks } from "../constants";

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useStateContext();
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
    <div className="md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="sm:flex hidden flex-row justify-end gap-4">
        <Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-full dark:bg-[#4c566a] bg-[#3e3c87] flex justify-center items-center cursor-pointer">
            <img
              src={profile}
              alt="user"
              className="w-[90%] h-[90%] object-contain"
            />
          </div>
        </Link>

        <CustomButton
          btnType="button"
          title={address ? "Create a campaign" : "Connect Wallet"}
          styles={
            address
              ? "bg-gradient-to-r from-[#3e3c87] to-indigo-500 dark:bg-gradient-to-r dark:from-[#4c566a] dark:to-zinc-500"
              : "bg-gradient-to-r from-[#3e3c87] to-indigo-500 dark:bg-gradient-to-r dark:from-[#4c566a] dark:to-zinc-500"
          }
          handleClick={() => {
            if (address) navigate("create-campaign");
            else connect();
          }}
        />
      </div>

      {/* Small screen navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] dark:bg-[#4c566a] bg-[#3e3c87] flex justify-center items-center cursor-pointer">
          <img
            src={roar}
            alt="user"
            className="w-[60%] h-[60%] object-contain"
          />
        </div>

        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div
          className={`rounded-[20px] absolute top-[60px] right-0 left-0 dark:bg-[#4c566a] bg-[#3e3c87] z-10 shadow-secondary py-4 ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700"`}>
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${
                  isActive === link.name && "bg-indigo-500 dark:bg-zinc-500"
                }`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}>
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${
                    isActive === link.name ? "grayscale-0" : "grayscale"
                  }`}
                />
                <p
                  className={`ml-[20px] mt-1 font-epilogue font-semibold text-[14px] ${
                    isActive === link.name ? "text-[#e1d5d5]" : "text-[#e1d5d5]"
                  }`}>
                  {link.name}
                </p>
              </li>
            ))}
          </ul>

          <div className="justify-start flex flex-col m-3 ml-3">
            {theme === "dark" ? (
              <BsFillSunFill
                className="dark:bg-[#4c566a] bg-[#3e3c87] w-[35px] h-[35px] mb-2 ease-in duration-200 text-white"
                onClick={handleThemeSwitch}
              />
            ) : (
              <BsBrightnessLowFill
                className="dark:bg-[#4c566a] bg-[#3e3c87] w-[35px] h-[35px] mb-2 ease-in duration-200 text-white"
                onClick={handleThemeSwitch}
              />
            )}
          </div>

          <div className="flex mx-4">
            <CustomButton
              btnType="button"
              title={address ? "Create a campaign" : "Connect"}
              styles={
                address
                  ? "bg-gradient-to-r from-[#3e3c87] to-indigo-500 dark:bg-gradient-to-r dark:from-[#4c566a] dark:to-zinc-500"
                  : "bg-gradient-to-r from-[#3e3c87] to-indigo-500 dark:bg-gradient-to-r dark:from-[#4c566a] dark:to-zinc-500"
              }
              handleClick={() => {
                if (address) navigate("create-campaign");
                else connect();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
