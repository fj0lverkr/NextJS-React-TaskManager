"use client";

import React from "react";
import { useGlobalState } from "@/app/context/globalProvider";
import Tasks from "../Components/Tasks/Tasks";

function Page() {
  const { completedTasks } = useGlobalState();
  return <Tasks title="Completed Tasks" tasks={completedTasks} />;
}

export default Page;
