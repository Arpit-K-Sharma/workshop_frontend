import React, { useState, createContext, useContext, useEffect } from "react";

const SchoolContext = createContext();

export const SchoolContextProvider = ({ children }) => {
  const [schoolId, setSchoolId] = useState(() => {
    // Try to get the schoolId from localStorage when the component mounts
    const savedSchoolId = localStorage.getItem("schoolId");
    return savedSchoolId
      ? JSON.parse(savedSchoolId)
      : JSON.parse("66c0dae5f0965cf6f1bf21bb");
  });

  useEffect(() => {
    // Save schoolId to localStorage whenever it changes
    localStorage.setItem("schoolId", JSON.stringify(schoolId));
  }, [schoolId]);

  return (
    <SchoolContext.Provider value={{ schoolId, setSchoolId }}>
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchoolContext = () => useContext(SchoolContext);
