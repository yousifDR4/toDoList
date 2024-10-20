import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";

import Main from "./main";
import { useSelector } from "react-redux";
import ToDoList from "./components/ToDoList";
import BoardView from "./components/BoardView";
import AddForm from "./components/AddForm";
import EditForm from "./components/EditForm";
import Error from "./utlis/Error";

function Router({ children }) {
  const router = createBrowserRouter([
    {
      element: <Main />,
      path: "/",
      errorElement: <Error />,
      children: [
        {
          element: <ToDoList />,
          path: "",
          children: [
            {
              element: <BoardView />,
              path: "",
            },
            {
              element: <BoardView />,
              path: "BoardView",
              children: [],
            },
            {
              element: <AddForm />,
              path: "AddTask",
            },
            {
              element: <EditForm />,
              path: "BoardView/EditTask",
            },
            {
              element: <EditForm />,
              path: "EditTask",
            },
          ],
        },
        {
          element: <ToDoList />,
          path: "/ToDoList",
          children: [
            {
              element: <BoardView />,
              path: "BoardView",
            },
            {
              element: <AddForm />,
              path: "AddTask",
            },
            {
              element: <EditForm />,
              path: "/ToDoList/BoardView/EditTask",
            },
          ],
        },
      ],
    },
    {
      path: "/Login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router}>{children}</RouterProvider>;
}

export default Router;
