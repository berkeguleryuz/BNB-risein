import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { useStateContext } from "../context";
import { CustomButton, FormField, Loader } from "../components";
import { checkIfImage } from "../utils";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exist) => {
      if (exist) {
        setIsLoading(true);
        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        });
        setIsLoading(false);
        navigate("/");
      } else {
        alert("Provide valid image URL for your campaign");
        setForm({ ...form, image: "" });
      }
    });
  };

  return (
    <div className="flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] dark:bg-[#4c566a] bg-[#3e3c87] rounded-full">
        <h1 className="font-sans items-center justify-center font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          New Campaign
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Campaign Title"
            placeholder="Write your campaign title"
            inputType="text"
            value={form.title}
            handleChange={(e) => {
              handleFormFieldChange("title", e);
            }}
          />
        </div>

        <FormField
          labelName="Story"
          inputType="textarea"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => {
            handleFormFieldChange("description", e);
          }}
        />
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal"
            placeholder="BNB - 4.9"
            inputType="text"
            value={form.target}
            handleChange={(e) => {
              handleFormFieldChange("target", e);
            }}
          />
          <FormField
            labelName="End Date"
            placeholder="End Date"
            isDateArea
            inputType="date"
            value={form.deadline}
            handleChange={(e) => {
              handleFormFieldChange("deadline", e);
            }}
          />
        </div>
        <FormField
          labelName="Campaign Image"
          placeholder="Place image URL of your campaign"
          inputType="url"
          value={form.image}
          handleChange={(e) => {
            handleFormFieldChange("image", e);
          }}
        />
        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Send the Campaign"
            styles="dark:bg-[#4c566a] bg-[#3e3c87]"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
