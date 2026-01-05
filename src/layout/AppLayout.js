import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";

function AppLayout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
