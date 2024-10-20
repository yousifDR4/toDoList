import React, { useEffect, useReducer } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { login } from "../models/users";
import { storeUser } from "../utlis/auth";
const validation = (value, type) => {
  if (type === "email") {
    if (!value) {
      return "Email is required";
    }
    if (!/\S+@\S+\.\S+/.test(value)) {
      return "Email is invalid";
    }
    return false;
  }
  if (type === "password") {
    if (!value) {
      return "Password is required";
    }
    if (value.length < 8) {
      return "Password must be at least 8 characters";
    }
    return false;
  }
};
function reducer(state, action) {
  if (
    (action.type.name && action.type.value) ||
    (action.type.name && action.type.value === "")
  ) {
    return {
      ...state,
      [action.type.name]: action.type.value,
      ["touch" + action.type.name]: true,
      ["error" + action.type.name]: validation(
        action.type.value,
        action.type.name
      ),
    };
  }
  return state;
}
const initialState = {
  email: "",
  password: "",
  isSubmitting: false,
  errorpassword: false,
  erroremail: false,
  touchpassword: false,
  touchemail: false,
};
function Login() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const dispatchRedux = useDispatch();
  const handlelogin = async (e) => {
    e.preventDefault();
    if (state.errorpassword || state.erroremail) {
      return;
    }
    dispatch({ type: { name: "isSubmitting", value: true } });
    const response = login(state.email, state.password);
    console.log(response);

    if (response.status === 200) {
      dispatchRedux(setUser(response.data));
      storeUser(response.data);
      navigate("/");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: { name, value } });
  };
  console.log(state);

  return (
    <main className="flex px-1 items-center place-content-center h-[100vh]">
      <div
        className="bg-white h-fit rounded-3xl border-2 border-[#C8CBD9] shadow-sm flex-grow md:grow-[0.2]
        md:py-10 md:px-14 py-5 px-3 w-[250px] "
      >
        <div className="text-2xl font-bold text-center mb-12 ">Sign in</div>
        <div>
          <form className="flex flex-col w" onSubmit={handlelogin}>
            <section className="flex justify-center">
              <label className="max-w-[528px] flex-1 mb-1" htmlFor="email">
                Email or mobile phone number
              </label>
            </section>
            <div className="flex justify-center">
              <input
                className="p-1 pl-3 max-w-[528px] border-2 border-[#C8CBD9] flex-1 h-14 rounded-xl outline-none"
                type="text"
                name="email"
                id="email"
                placeholder="Email@example.com"
                autoComplete="email"
                onChange={handleChange}
                onBlur={handleChange}
                value={state.email}
              />
            </div>
            <section className="flex justify-center">
              <span
                name="email"
                component="div"
                className="text-red-600 pl-3 text-sm mt-1 max-w-[528px] flex-1"
              >
                {state.erroremail ? state.erroremail : ""}
              </span>
            </section>
            <section className="flex justify-center">
              <label
                className="max-w-[528px] flex-1 mt-6 mb-1"
                htmlFor="password"
              >
                Your password
              </label>
            </section>
            <div className="flex justify-center">
              <input
                className="p-1 pl-3 max-w-[528px] flex-1 h-14 rounded-xl border-2 border-[#C8CBD9] outline-none"
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                placeholder="12345678"
                onChange={handleChange}
                onBlur={handleChange}
                value={state.password}
              />
            </div>
            <section className="flex justify-center mb-6">
              <span
                name="password"
                component="div"
                className="text-red-600 text-sm pl-3 mt-1 max-w-[528px] flex-1"
              >
                {state.errorpassword ? state.errorpassword : ""}
              </span>
            </section>
            <section className="flex justify-center">
              <button
                type="submit"
                disabled={
                  (state.isSubmitting,
                  !state.touchemail ||
                    !state.touchpassword ||
                    state.errorpassword ||
                    state.erroremail)
                }
                className="h-14 duration-200 transition-all text-white font-medium text-xl rounded-3xl disabled:bg-[#C3C3C3] bg-[# bg-[#1C1D22]] max-w-[528px] flex-1"
              >
                Submit
              </button>
            </section>
            <section className="flex justify-center mb-14 mt-10">
              <p className="pl-3 max-w-[528px] flex-1 text-center">
                By continuing, you agree to the{" "}
                <Link className="underline-offset-1">Terms of use</Link> and{" "}
                <Link>Privacy Policy.</Link>
              </p>
            </section>
          </form>
        </div>
      </div>
    </main>
  );
}
export default Login;
