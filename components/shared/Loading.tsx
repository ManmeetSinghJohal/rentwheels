"use client";
import React from "react";
import { Rings } from "react-loader-spinner";

const Loading = () => {
  return (
    <div>
      <Rings height="80" width="80" color="#833eff" radius="6" wrapperStyle={{}} wrapperClass="" visible={true} ariaLabel="rings-loading" />
    </div>
  );
};

export default Loading;
