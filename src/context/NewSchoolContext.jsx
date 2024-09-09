import React, { useState, createContext, useContext, useEffect } from "react";

const NewSchoolContext = createContext();

export const NewSchoolContextProvider = ({ children }) => {
  const [schoolId, setSchoolId] = useState(() => {
    // Try to get the schoolId from localStorage when the component mounts
    const savedSchoolId = localStorage.getItem("school_admin_id");
    return savedSchoolId ? JSON.parse(savedSchoolId) : null;
  });

  useEffect(() => {
    // Save schoolId to localStorage whenever it changes
    localStorage.setItem("school_admin_id", JSON.stringify(schoolId));
  }, [schoolId]);

  return (
    <NewSchoolContext.Provider value={{ schoolId, setSchoolId }}>
      {children}
    </NewSchoolContext.Provider>
  );
};

export const useNewSchoolContext = () => useContext(NewSchoolContext);
