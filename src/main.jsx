import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { getUser } from "./utlis/auth";
import { setUser } from "./store/userSlice";
const Main = () => {
  const loaclUser = getUser();
  const navigate = useNavigate();
  const dispatchRedux = useDispatch();
  useEffect(() => {
    
    if (loaclUser?.email ? false : true) {
      console.log(loaclUser);

      navigate("/login");
    } else dispatchRedux(setUser(loaclUser));
  }, [loaclUser]);
  return <Outlet />;
};

export default Main;
