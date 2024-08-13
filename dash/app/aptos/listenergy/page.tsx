"use client";

import React from "react";
import Move from "./Move";
import Navbar from "@/app/components/Navbar";
const page = () => {
  return (
    <>
      {" "}
      <div>
        <Navbar/>
      </div>
      <div>
        <Move />
      </div>
    </>
  );
};

export default page;
