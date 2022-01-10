import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "reactstrap";
import { logout } from "../../actions/authActions";

const Logout = () => {
  const dispatch = useDispatch();

  return (
    <>
      <NavLink href="#" onClick={() => dispatch(logout())}>
        Logout
      </NavLink>
    </>
  );
};

export default Logout;
