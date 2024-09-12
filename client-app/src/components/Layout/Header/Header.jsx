import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";

export default function Header({ pageName }) {
  const activeClass = ({ isActive }) => {
    return isActive ? "app-sub-color" : undefined;
  };

  return (
    <div className={`${classes["header"]} app-background`}>
      <h1>{pageName}</h1>
      <nav className={classes["header-nav"]}>
        <NavLink className={activeClass} to="/">
          Home
        </NavLink>
        <span> / </span>
        <NavLink className={activeClass} to="/shop">
          Shop
        </NavLink>
        <span> / </span>
        <NavLink className={activeClass} to="/cart">
          Cart
        </NavLink>
        <span> / </span>
        <NavLink className={activeClass} to="/checkout">
          Checkout
        </NavLink>
        <span> / </span>
        <NavLink className={activeClass} to="/history">
          History
        </NavLink>
      </nav>
    </div>
  );
}
