import React from "react";
import classes from "./Navbar.module.css";
import { NavLink, useLoaderData, useSubmit } from "react-router-dom";
import { getToken, removeToken } from "../../../utils/token";
import { url } from "../../../utils/url";

export default function Navbar() {
  const currentUser = useLoaderData();
  const submit = useSubmit();

  const activeClass = ({ isActive }) => {
    return isActive ? classes.active : "";
  };

  const handleLogout = () => {
    submit(null, { method: "post" });
  };

  const renderUser = () => {
    if (!currentUser) {
      return (
        <li className={classes["nav-item"]}>
          <NavLink to="/login" className={activeClass}>
            <i className="fa-solid fa-user" /> Login
          </NavLink>
        </li>
      );
    } else {
      return (
        <>
          <li className={classes["nav-item"]}>
            <NavLink to="/history" className={activeClass}>
              <i className="fa-solid fa-user" /> {currentUser.fullName}{" "}
              <i className="fa-solid fa-caret-down" />
            </NavLink>
          </li>
          <li className={classes["nav-item"]}>
            <div style={{ cursor: "pointer" }} onClick={handleLogout}>
              (Logout)
            </div>
          </li>
        </>
      );
    }
  };

  return (
    <header className="container">
      <nav className={classes.navbar}>
        <ul className={classes["nav-list"]}>
          <li className={classes["nav-item"]}>
            <NavLink to="/" className={activeClass}>
              Home
            </NavLink>
          </li>
          <li className={classes["nav-item"]}>
            <NavLink to="/shop" className={activeClass}>
              Shop
            </NavLink>
          </li>
        </ul>
        <h2 className={classes["nav-header"]}>BOUTIQUE</h2>
        <ul className={classes["nav-list"]}>
          <li className={classes["nav-item"]}>
            <NavLink to="/cart" className={activeClass}>
              <i className="fa-solid fa-cart-shopping" /> Cart
            </NavLink>
          </li>
          {renderUser()}
        </ul>
      </nav>
    </header>
  );
}

export const currentUserLoader = async () => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error("Not found token.");
    }

    const res = await fetch(url + "/client/auth", {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });

    if (res.status === 200) {
      return res;
    } else {
      const data = await res.json();
      throw new Error(data.message);
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const logoutAction = () => {
  removeToken();
  return null;
};
