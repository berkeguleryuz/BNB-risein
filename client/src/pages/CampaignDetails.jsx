import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { useStateContext } from "../context";
import { CountBox, CustomButton, Loader } from "../components";
import { calculateBarPercentage, daysLeft } from "../utils";
import { roar } from "../assets";

const CampaignDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { donate, getDonations, contract, address } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);

  const remainingDays = daysLeft(state.deadline);
  const expired = new Date().getTime() > state.deadline;

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);

    setDonators(data);
  };

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);

  const handleDonate = async () => {
    setIsLoading(true);

    await donate(state.pId, amount);

    navigate("/");
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && <Loader />}
      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img
            src={state.image}
            alt="campaign"
            className="w-full h-[410px] object-cover rounded-xl"
          />
          <div className="relative w-full h-[5px] dark:bg-[#4c566a] bg-[#3e3c87] mt-2">
            <div
              className="absolute h-full bg-[#eed543]"
              style={{
                width: `${calculateBarPercentage(
                  state.target,
                  state.amountCollected,
                )}%`,
                maxWidth: "100%",
              }}></div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox
            title={expired ? "Finished" : "Active"}
            value={expired ? "-" : `${remainingDays}`}
          />
          <CountBox
            title={`Raised of ${state.target}`}
            value={state.amountCollected}
          />
          <CountBox title="Total Backers" value={donators.length} />
        </div>
      </div>

      <div className="mt-[20px] flex lg:flex-row gap-5">
        <div className="flex-[2] flex flex-col">
          <div>
            <h4 className="font-sans font-semibold text-[18px] text-gray-800 dark:text-orange-300 uppercase">
              Creator
            </h4>

            <div className="my-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div>
                <h4 className="font-sans font-italic text-[14px] text-gray-600 dark:text-orange-200 break-all">
                  {state.owner}
                </h4>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-sans font-semibold text-[18px] text-gray-800 dark:text-orange-300 uppercase">
              Story
            </h4>

            <div className="mt-[10px]">
              <p className="font-sans font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                {state.description}
              </p>
            </div>
          </div>

          <div className="mt-[20px]">
            <h4 className="font-sans font-semibold text-[18px] text-gray-800 dark:text-orange-300 uppercase">
              Donators
            </h4>

            <div className="mt-[0px] flex flex-col gap-4">
              {donators.length > 0 ? (
                donators.map((item, index) => (
                  <div
                    key={`${item.donator}-${index}`}
                    className="flex justify-between items-center gap-4">
                    <p className="font-sans font-normal text-[16px] text-[#808191] leading-[26px] break-all">
                      {index + 1}. {item.donator}
                    </p>
                    <p className="font-sans font-normal text-[16px] text-[#808191] leading-[26px] break-all">
                      {item.donation}
                    </p>
                  </div>
                ))
              ) : (
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                  No donators yet. Be there first one!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 mt-[20px]">
        <h4 className="font-epilogue font-semibold text-[18px] text-gray-800 dark:text-orange-300 uppercase">
          Fund
        </h4>
        <div className="mt-[20px] flex flex-col p-4 dark:bg-[#4c566a] bg-[#3e3c87] rounded-[10px]">
          <div className="mt-[10px] p-3 dark:bg-[#697792] bg-[#5451b5] rounded-full w-[250px] items-center justify-center self-center">
            <h4 className="font-sans font-semibold text-[14px] leading-[22px] justify-center items-center self-center text-center text-white">
              Fund the vision.
            </h4>
          </div>
          <div className="mt-[10px]">
            <input
              type="number"
              placeholder="5 BNB"
              step="0.1"
              className="w-full my-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#2a2a42] bg-gray-200 font-sans text-black text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <CustomButton
              btnType="button"
              title="Fund Campaign"
              styles="w-full bg-gradient-to-r from-amber-300 to-rose-500 dark:bg-gradient-to-r dark:from-blue-300 dark:to-gray-800 mt-3"
              handleClick={handleDonate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
