import React from "react";
import { Link, redirect, useLoaderData, useSubmit } from "react-router-dom";
import classes from "./Sidebar.module.css";
import { removeToken } from "../../../utils/token";

export default function Sidebar() {
  const currentUser = useLoaderData();
  const submit = useSubmit();

  const handleLogout = () => {
    submit(null, { method: "post", action: "/logout" });
  };

  return (
    <>
      <h3 className={classes["sidebar-title"]}>Admin Page</h3>
      {currentUser && (
        <ul className={classes["sidebar-lists"]}>
          {currentUser.role === "admin" && (
            <li className={classes["sidebar-lists-item"]}>
              <h5>Admin</h5>
              <ul className={classes["sidebar-list"]}>
                <li className={classes["sidebar-item"]}>
                  <Link to="/">Dashboard</Link>
                </li>
                <li className={classes["sidebar-item"]}>
                  <Link to="/products">Products</Link>
                </li>
                <li className={classes["sidebar-item"]}>
                  <Link to="/new-product">New Product</Link>
                </li>
              </ul>
            </li>
          )}
          <li className={classes["sidebar-lists-item"]}>
            <h5>Consultant</h5>
            <ul className={classes["sidebar-list"]}>
              <li className={classes["sidebar-item"]}>
                <Link to="/chat">Chat</Link>
              </li>
            </ul>
          </li>
          <li className={classes["sidebar-lists-item"]}>
            <h5>Logout</h5>
            <ul className={classes["sidebar-list"]}>
              <li className={classes["sidebar-item"]}>
                <div className={classes["logout-btn"]} onClick={handleLogout}>
                  Logout
                </div>
              </li>
            </ul>
          </li>
        </ul>
      )}
    </>
  );
}

export const logoutAction = () => {
  removeToken();
  return redirect("/login");
};
