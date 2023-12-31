"use client";

import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import themes from "./themes";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();
export const GlobalProvider = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [modal, setModal] = useState(false);
  const theme = themes[selectedTheme];
  const { user } = useUser();

  const toggleModal = () => {
    setModal(!modal);
  };
  const getAllTasks = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get("/api/tasks");
      const sortedTasks = result.data.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });

      setTasks(sortedTasks);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong while getting your tasks.");
      setIsLoading(false);
    }
  };

  const completedTasks = tasks.filter((task) => task.isCompleted === true);
  const incompleteTasks = tasks.filter((task) => task.isCompleted === false);
  const importantTasks = tasks.filter((task) => task.isImportant === true);

  const createTask = async (task) => {
    setIsLoading(true);
    setModal(false);
    try {
      const res = await axios.post("/api/tasks", task);
      if (!res.data.error) {
        toast.success("Task created.");
        getAllTasks();
      } else {
        toast.error(res.data.error);
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong while creating the task.");
      setIsLoading(false);
    }
  };

  const deleteTask = async (id) => {
    setIsLoading(true);
    try {
      const res = await axios.delete(`/api/tasks/${id}`);
      if (!res.data.error) {
        toast.success("Task deleted.");
        getAllTasks();
      } else {
        toast.error(res.data.error);
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong while deleting the task.");
      setIsLoading(false);
    }
  };

  const updateTask = async (id, task) => {
    setIsLoading(true);
    try {
      const res = await axios.put(`/api/tasks/${id}`, task);
      console.log(res);
      if (!res.data.error) {
        toast.success("Task updated.");
        getAllTasks();
      } else {
        toast.error(res.data.error);
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong while updating the task.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) getAllTasks();
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        tasks,
        createTask,
        deleteTask,
        updateTask,
        isLoading,
        completedTasks,
        incompleteTasks,
        importantTasks,
        modal,
        toggleModal,
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
