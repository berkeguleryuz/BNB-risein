import React from "react";
import { roar } from "../assets";
import { daysLeft } from "../utils";

const FundCard = ({
  owner,
  title,
  description,
  target,
  deadline,
  amountCollected,
  image,
  handleClick,
}) => {
  const remainingDays = daysLeft(deadline);
  const expired = new Date().getTime() > deadline;

  return (
    <div
      className="sm:w-[288px] w-full rounded-[15px] bg-[#3e3c87] dark:bg-[#4c566a] cursor-pointer"
      onClick={handleClick}>
      <img
        src={image}
        alt="fund"
        className="w-full h-[157px] object-cover rounded-[15px]"
      />

      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center mb-[18px]">
          <img
            src={roar}
            alt="tag"
            className="w-[19px] h-[19px] object-contain"
          />
          <p className="ml-[12px] mt-[5px] font-epilogue font-medium text-[12px] text-white">
            RoaR
          </p>
        </div>

        <div className="block">
          <h3 className="font-sans font-semibold text-[16px] text-white text-left leading-[26px] truncate">
            {title}
          </h3>
          <p className="mt-[5px] font-sans font-normal text-[#cdcee0] text-left leading-[18px] truncate">
            {description}
          </p>
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#cdcee0] leading-[22px]">
              {amountCollected}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#cbcdf2] sm:max-w-[120px] truncate">
              Raised of <span className="font-bold text-l ml-1">{target}</span>
            </p>
          </div>

          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#cdcee0] leading-[22px]">
              {expired ? "Ended" : `${remainingDays}`}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#cdcee0]  sm:max-w-[120px] truncate">
              {expired ? "Expired" : "Days Left"}
            </p>
          </div>
        </div>
        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <img
              src={roar}
              alt="user"
              className="w-1/2 h-1/2 object-contain"
            />
          </div>
          <p className="flex-1 font-epilogue font-normal text-[12px] text-[#cdcee0] truncate">
            by <span className="text-[#b2b3bd]">{owner}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
