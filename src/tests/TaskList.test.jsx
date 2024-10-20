import { render, screen, fireEvent } from "@testing-library/react";
import store from "../store/store";
import { Provider } from "react-redux"; // Import Provider
import { setTasksList } from "../store/TasksListSlice";
import { taskListTestData } from "../models/TaskList";
import Router from "./../Router";
import { storeUser } from "../utlis/auth";
const TestTaskList = () => <Router></Router>;
const renderWithRedux = (component) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe("if user signed in render Task List page", () => {
  it("renders TaskList", () => {
    const user = {
      id: 1,
      name: "Test User",
      email: "hi@example.com",
      password: "123",
    };
    storeUser(user);
    renderWithRedux(<TestTaskList />);
    const login = screen.getByText(/Welcome back ,Test User/i);
    expect(login).toBeInTheDocument();
  });

  it("sets TaskList", () => {
    const tasksList = taskListTestData;

    store.dispatch(setTasksList(tasksList));
    const state = store.getState().tasksList.tasksList;
    expect(store.getState().tasksList.tasksList).toEqual(tasksList);
  });

  it("filters TaskList", () => {
    const tasksList = taskListTestData;
    store.dispatch(setTasksList(tasksList));
    renderWithRedux(<TestTaskList />);
    const filterBtn = screen.getByText(/filter status/i);
    fireEvent.click(filterBtn);
    const clickBtn = screen.getByRole("button", { name: "completed" });
    fireEvent.click(clickBtn);
    const items = screen.getAllByText(/pending/i);
    expect(items.length).toBe(1);
    
  });
});
