import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes, css } from "styled-components";
import { editTasksList, removeTasksList } from "../store/TasksListSlice";
import { saveTaskList } from "../utlis/TaskListStorage";
import { useNavigate } from "react-router-dom";

// Define the fade-out animation
// Styled component for the card container
const CardContainer = styled.div`
  width: 320px;
  height: 172px;
  border-radius: 12px;
  border: 1px solid rgba(28, 29, 34, 0.15);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  anchor-name: ${(props) => `--anchor-el` + props.$index + props.$index};
`;
const Popover = styled.div`
  width: 200px;
  z-index: 1;
  height: 120px;
  padding: 10px;
  position-anchor: ${(props) => `--anchor-el` + props.$index + props.$index};
  top: anchor(bottom);
  left: anchor(center);
  border: 1px solid black;
  translate: -50%;
  margin-top: 10px;
`;
const DialogButton = styled.button`
  anchor-name: ${(props) => `--anchor-elD` + props.$index + props.$index};
`;
const Dialog = styled.div`
  width: 200px;
  z-index: 1;
  height: 120px;
  padding: 10px;
  top: anchor(bottom);
  left: anchor(center);
  position-try-fallback: --my-new-position;
  position-anchor: ${(props) => `--anchor-elD` + props.$index + props.$index};
  position-fallback: --top-to-bottom;
  border: 1px solid black;
  translate: -50%;
  margin-top: 10px;
`;
const Card = ({ index, item }) => {
  const dispatchRedux = useDispatch();
  const navgate = useNavigate();
  const taskList = useSelector((state) => state.tasksList.tasksList);
  const handleDelete = () => {
    dispatchRedux(removeTasksList({ index: index }));
    const arr = [];
    const temp = taskList;
    for (let i = 0; i < temp.length; i++) {
      if (i !== index) {
        arr.push(temp[i]);
      }
    }
    saveTaskList([...arr]);
  };
  const handleEdit = () => {
    navgate("EditTask", { state: { item: item, index: index } });
  };
  return (
    <>
      <CardContainer>
        <div className="flex justify-between pt-5 px-5 ">
          <p className="text-[#1C1D22] font-bold text-[16px] text-pretty">
            {item.name}
          </p>
          <Button
            $index={index}
            popovertarget={`mypopover${index}`}
            id={`btn${index}`}
          >
            <img src="/svg/cardmenu.svg" className="cursor-pointer" alt="" />
          </Button>
          <Popover $index={index} id={`mypopover${index}`} popover="auto">
            <div className="flex justify-center mb-2">
              <button
                className="rounded-md py-2 px-2 w-36 text-center text-white bg-[#1C1D22]"
                popovertargetaction="hide"
                popovertarget={`mypopover${index}`}
                onClick={() => {
                  const itemTemp = { ...item };

                  if (itemTemp.status === "completed") {
                    itemTemp.status = "pending";
                  } else {
                    itemTemp.status = "completed";
                  }
                  dispatchRedux(
                    editTasksList({ item: itemTemp, index: index })
                  );
                  const arr = [];
                  const temp = taskList;
                  for (let i = 0; i < temp.length; i++) {
                    if (i === index) {
                      arr.push(itemTemp);
                    } else {
                      arr.push(temp[i]);
                    }
                  }
                  saveTaskList([...arr]);
                }}
              >
                change status
              </button>
            </div>
            <div className="flex justify-center">
              <button
                className="rounded-md py-2 px-2 w-36 text-center text-white bg-[#1C1D22]"
                popovertargetaction="hide"
                popovertarget={`mypopover${index}`}
                onClick={handleEdit}
              >
                Edit Task
              </button>
            </div>
          </Popover>
        </div>
        <div className="flex justify-between pt-5 px-5 ">
          <p className="text-[#1C1D22] opacity-50 font-medium text-sm mt-[6px]  text-pretty">
            {item.description}
          </p>
          <DialogButton
            $index={index}
            popovertarget={`mydialog${index}`}
            id={`btnD${index}`}
          >
            <img
              src="/svg/delete.svg"
              className="w-6 h-6 mt-2 cursor-pointer"
              alt=""
            />
          </DialogButton>
          <Dialog
            className="shadow-md "
            $index={index}
            id={`mydialog${index}`}
            popover="auto"
          >
            <div className="flex flex-col gap-y-2">
              <p>are you sure you want to delete this task?</p>

              <div className="flex justify-center h-full">
                <button
                  className="rounded-md py-2 px-2 w-28 text-center text-white bg-[#1C1D22]"
                  popovertargetaction="hide"
                  popovertarget={`mydialog${index}`}
                  onClick={handleDelete}
                >
                  delete
                </button>
              </div>
            </div>
          </Dialog>
        </div>
        <div className="pl-5 flex items-center space-x-2 mt-2">
          <div
            className={`h-3 w-3 rounded-full transition-colors duration-500 ${
              item.status === "completed" ? "bg-green-500" : "bg-[#FFA048]"
            }`}
          ></div>
          <div>{item.status}</div>
        </div>
      </CardContainer>
    </>
  );
};

export default Card;
