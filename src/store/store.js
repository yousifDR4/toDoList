import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import tasksListSlice from "./TasksListSlice";
const store = configureStore({
  reducer: {
    user: userSlice,
    tasksList: tasksListSlice,
  },
});
export default store;
