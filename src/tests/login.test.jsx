import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../components/Login";
import { MemoryRouter } from "react-router-dom";
import store from "../store/store";
import userReducer, { clearUser, setUser } from "../store/userSlice";
const { Provider } = require("react-redux");
const TestLogin = (
  <Provider store={store}>
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  </Provider>
);
test("email input", () => {
  render(TestLogin);
  const email = screen.getByLabelText(/Email or mobile phone number/i);
  expect(email).toBeInTheDocument();
  const emailInput = screen.getByRole("textbox", {
    name: /Email or mobile phone number/i,
  });
  expect(emailInput).toHaveAttribute("id", "email");
});
test("email input changing", () => {
  render(TestLogin);
  const emailInput = screen.getByRole("textbox", {
    name: /Email or mobile phone number/i,
  });
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  expect(emailInput.value).toBe("test@example.com");
});
test("email input isvalied", () => {
  render(TestLogin);
  const emailInput = screen.getByRole("textbox", {
    name: /Email or mobile phone number/i,
  });
  fireEvent.change(emailInput, { target: { value: "r" } });
  screen.getByText(/Email is invalid/i);
});
test("email input is required", () => {
  render(TestLogin);
  const emailInput = screen.getByRole("textbox", {
    name: /Email or mobile phone number/i,
  });
  fireEvent.blur(emailInput);
  screen.getByText(/Email is required/i);
});

test("password input", () => {
  render(TestLogin);
  const password = screen.getByLabelText(/Your password/i);
  expect(password).toBeInTheDocument();
  expect(password).toHaveAttribute("type", "password");
  expect(password).toHaveAttribute("id", "password");
});
test("password input change", () => {
  render(TestLogin);
  const password = screen.getByLabelText(/Your password/i);
  fireEvent.change(password, { target: { value: "12345678" } });
});
test("password input valied", () => {
  render(TestLogin);
  const password = screen.getByLabelText(/Your password/i);
  fireEvent.change(password, { target: { value: "1234567" } });
  screen.getByText(/Password must be at least 8 characters/i);
});
test("Password input is required", () => {
  render(TestLogin);
  const password = screen.getByLabelText(/Your password/i);
  fireEvent.blur(password);
  screen.getByText(/Password is required/i);
});
test("submit button is disabled", () => {
  render(TestLogin);
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
  expect(button).toBeDisabled();
});
test("submit button is enabled", () => {
  render(TestLogin);
  const button = screen.getByRole("button");
  const password = screen.getByLabelText(/Your password/i);
  const emailInput = screen.getByRole("textbox", {
    name: /Email or mobile phone number/i,
  });
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  expect(emailInput.value).toBe("test@example.com");
  fireEvent.change(password, { target: { value: "12345678" } });
  expect(button).toBeInTheDocument();
  expect(button).toBeEnabled();
});
test("login action", () => {
  render(TestLogin);
  const user = { id: 1, name: "John Doe" };
  const expectedAction = {
    type: "user/setUser",
    payload: user,
  };
  expect(setUser(user)).toEqual(expectedAction);
});

describe("userSlice reducer", () => {
  render(TestLogin);
  const initialState = { user: {} };

  it("should return the initial state when passed an empty action", () => {
    expect(userReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle setUser action", () => {
    const user = { id: 1, name: "John Doe" };
    const nextState = userReducer(initialState, setUser(user));
    expect(nextState).toEqual({ user });
  });

  it("should handle clearUser action and reset the state", () => {
    const currentState = { user: { id: 1, name: "John Doe" } };
    const nextState = userReducer(currentState, clearUser());

    expect(nextState).toEqual(initialState);
  });
});
