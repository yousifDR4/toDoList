import { createSlice } from "@reduxjs/toolkit";
import { taskList } from "../models/TaskList";
const initialState = {
  tasksList: taskList,
};

const tasksListSlice = createSlice({
  name: "tasksList",
  initialState,
  reducers: {
    setTasksList: (state, action) => {
      state.tasksList = action.payload;
    },
    addTasksList: (state, action) => {
      const arr = state.tasksList;
      arr.push(action.payload);
      state.tasksList = [...arr];
    },
    editTasksList: (state, action) => {
      const arr = [];
      console.log(action.payload);

      const temp = state.tasksList;
      for (let i = 0; i < temp.length; i++) {
        if (i !== action.payload.index) {
          arr.push(temp[i]);
        } else {
          arr.push(action.payload.item);
        }
      }
      state.tasksList = [...arr];
    },
    removeTasksList: (state, action) => {
      const arr = [];
      const temp = state.tasksList;
      for (let i = 0; i < temp.length; i++) {
        if (i !== action.payload.index) {
          arr.push(temp[i]);
        }
      }
      state.tasksList = [...arr];
    },
    clearTasksList: () => {
      return { tasksList: [] };
    },
  },
});
export const {
  clearTasksList,
  removeTasksList,
  setTasksList,
  addTasksList,
  editTasksList,
} = tasksListSlice.actions;
export default tasksListSlice.reducer;
