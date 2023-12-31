"use client";

import { SignUp } from "@clerk/nextjs";
import React from "react";

function Page() {
  return (
    <div className="h-full flex items-center justify-center">
      <SignUp />
    </div>
  );
}

export default Page;
