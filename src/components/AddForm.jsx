import React, { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTasksList } from "../store/TasksListSlice";
import { saveTaskList } from "../utlis/TaskListStorage";
function validation(value, name) {
  if (name === "description") return false;
  if (name === "status") {
    if (!value) {
      console.log("status is required");

      return "status is required";
    }
    return false;
  }
  if (name === "name") {
    if (!value) {
      return "Name is required";
    }
    return false;
  }
}
function reducer(state, action) {
  if (
    (action.type.name && action.type.value) ||
    (action.type.name && action.type.value === "")
  ) {
    console.log(validation(action.type.value, action.type.name));

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
  name: "",
  status: "",
  description: "",
  isSubmitting: false,
  errorname: false,
  errorstatus: false,
  errordescription: false,
  touchname: false,
  touchstatus: false,
  touchdescription: false,
  touchpassword: false,
  touchemail: false,
};
const AddForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const dispatchRedux = useDispatch();
  const taskList = useSelector((state) => state.tasksList.tasksList);
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: { name, value } });
  };
  const handleSubmite = async (e) => {
    e.preventDefault();
    if (state.errorname || state.errordescription) {
      return;
    }
    dispatch({ type: { name: "isSubmitting", value: true } });

    dispatchRedux(
      addTasksList({
        name: state.name,
        status: state.status,
        description: state.description,
      })
    );
    saveTaskList([...taskList, { name: state.name, status: state.status }]);
    navigate("/");
  };
  return (
    <form
      className="pl-5 px-28 mt-9"
      encType="multipart/form-data"
      onSubmit={handleSubmite}
    >
      <section className=" grid grid-cols-2 gap-x-10 gap-y-5">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            <span className="text-red-500"> *</span> Task Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter category name"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={handleChange}
            onBlur={handleChange}
            value={state.name}
          />
          <span className="text-red-500 text-sm mt-1">
            {state.errorname ? state.errorname : ""}
          </span>
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            description
          </label>
          <input
            type="description"
            id="description"
            name="description"
            placeholder="Enter Dish price"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={handleChange}
            onBlur={handleChange}
            value={state.description}
          />
          <span className="text-red-500 text-sm mt-1">
            {state.errordescription ? state.errordescription : ""}
          </span>
        </div>
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            <span className="text-red-500"> *</span> status
          </label>
          <select
            id="status"
            name="status"
            placeholder="Enter Task status"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={state.status}
            onChange={handleChange}
            onBlur={handleChange}
          >
            <option value="">Select status</option>
            <option value="pending">pending</option>
            <option value="completed">completed</option>
          </select>
          <span className="text-red-500 text-sm mt-1">
            {state.errorstatus ? state.errorstatus : ""}
          </span>
        </div>
      </section>
      <div className="flex justify-center">
        <button
          type="submit"
          className=" max-w[440px] w-[440px] mt-8  bg-[#1C1D22] text-white py-2 rounded-md hover:bg-[#1C1D22]  disabled:bg-gray-400 transition-colors"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default AddForm;
