import React, { useState } from "react";
import { AlertCircle, Send } from "lucide-react";
import SubmitButton from "../../../assets/Submit.svg";
import apiClient from "config/apiClient";

const DailyReflection = () => {
  const teacherId = localStorage.getItem("teacher_id");
  const [reflection, setReflection] = useState({
    body: "",
    mentor_id: teacherId,
  });

  const handleReflectionChange = (e) => {
    setReflection({
      ...reflection,
      body: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const response = await apiClient.post("/journals", reflection);
    setReflection({
      body: "",
      mentor_id: teacherId,
    });
    console.log("Reflection submitted:", reflection);
  };

  return (
    <div className="h-full bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg">
      <div className="bg-none mt-5 relative p-6">
        <textarea
          className="w-full bg-transparent h-80 p-2 rounded-md resize-none placeholder:text-3xl placeholder:text-black placeholder:font-patrick text-3xl text-white font-patrick focus:outline-none"
          placeholder="Use me to reflect everyday"
          value={reflection.body}
          onChange={handleReflectionChange}
        />
        <div className="flex justify-between items-center mt-2">
          <p className="text-[#6C6C6C]">Complete by 8 PM Daily</p>
          <button
            onClick={handleSubmit}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <img src={SubmitButton} className="h-14 w-14" alt="Submit Button" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DailyReflection;
