"use client";

import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import themes from "./themes";
import toast from "react-hot-toast";
import { currentUser } from "@clerk/nextjs";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();
export const GlobalProvider = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const theme = themes[selectedTheme];

  const getAllTasks = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get("/api/tasks");
      setTasks(result.data);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong while getting your tasks.");
    }
  };

  useEffect(() => {
    getAllTasks();
    getCurrentUser();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        tasks,
      }}
    >
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
