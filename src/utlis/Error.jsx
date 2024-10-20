import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navgate = useNavigate();
  return (
    <div className="h-full flex-col justify-center items-center">
      <h1 className="font-bold text-3xl">404 page not found</h1>
      <button
        onClick={() => {
          navgate("/");
        }}
      >
        click me
      </button>
    </div>
  );
};

export default Error;
