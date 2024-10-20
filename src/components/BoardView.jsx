import React from "react";
import Card from "./Card";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
const BoardView = () => {
  const [taskList] =   useOutletContext();

  return (
    <div
      style={{
        height: "calc(100vh - 124px)",
      }}
      className="overflow-y-auto py-6  px-1  gap-y-3 grid gap-x-4 grid-cols-[repeat(auto-fit,minmax(min(100%,26ch),1fr))] lg:grid-cols-[repeat(auto-fill,minmax(321px,1fr))]"
    >
      {taskList.length > 0 &&
        taskList.map((item, index) => (
          <Card index={index} item={item} key={index} />
        ))}
    </div>
  );
};
export default BoardView;
