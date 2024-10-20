import React, { useMemo, useState } from "react";
import { TabsContainer, TabScroll } from "./styledcomponents";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
const Button = styled.button`
  anchor-name: --anchor-filter;
`;
const Popover = styled.div`
  position-anchor: --anchor-filter;
  top: anchor(bottom);
  left: anchor(left);
  right: anchor(right);
  width: 200px;
  z-index: 1;
  height: 140px;
  padding: 10px;
  border: 1px solid black;
  translate: -85%;
  margin-top: 10px;
`;
const ToDoList = () => {
  const [tab, setTab] = useState(0);
  const [filter, setFilter] = useState("all");
  const navgate = useNavigate();
  const tabs = ["Board View", "Add View"];
  const tabsRoutes = ["BoardView", "AddTask"];
  const loaction = useLocation().pathname;
  const user = useSelector((state) => state.user.user);
  const taskList = useSelector((state) => state.tasksList.tasksList);
  console.log(taskList);

  const filteredTaskList = useMemo(() => {
    if (filter === "all") {
      return taskList;
    } else if (filter === "completed") {
      return taskList.filter((task) => task.status === "completed");
    } else {
      return taskList.filter((task) => task.status !== "completed");
    }
  }, [taskList, filter]);
  return (
    <section className="h-full px-8 overflow-y-hidden">
      <div className="h-[94px] flex items-center justify-between">
        <h1 className="text-[#1C1D22] text-xl font-bold h-fit">
          Welcome back ,{user.name} 👋
        </h1>
        <div className="mr-14 text-[#1C1D22] text-xl font-bold h-fit flex ">
          filter status{" "}
          <Button
            className="cursor-pointer ml-4"
            popovertarget="filter"
            id="fliterbtn"
          >
            <img src="/svg/cardmenu.svg" alt="" />
          </Button>
          <Popover id="filter" popover="auto">
            <div className="text-lg border-solid  border-b-2 py-1  font-normal">
              <button onClick={() => setFilter("all")}>All</button>
            </div>
            <div className="text-lg border-solid  border-b-2 py-1  font-normal">
              <button onClick={() => setFilter("pending")}>pending</button>
            </div>
            <div className="text-lg font-normal py-1">
              <button onClick={() => setFilter("completed")}>completed</button>
            </div>
          </Popover>
        </div>
      </div>
      <div className="flex flex-col mt">
        <TabScroll>
          <TabsContainer $count={7} $active={tab}>
            {tabs.map((value, index) => {
              if (loaction.includes(tabsRoutes[index]) && tab !== index) {
                setTab(index);
              }
              return (
                <button
                  key={index}
                  className={`  ${
                    index === tab
                      ? "text-[#1C1D22] "
                      : "text-[#1C1D22] opacity-50"
                  }`}
                  onClick={() => {
                    setTab(index);
                    console.log(tabsRoutes[index]);

                    navgate(tabsRoutes[index]);
                  }}
                >
                  {value}
                </button>
              );
            })}
          </TabsContainer>
          <hr className="border-[#1C1D22] opacity-15" />
        </TabScroll>
      </div>
      <Outlet context={[filteredTaskList]} />
    </section>
  );
};

export default ToDoList;
