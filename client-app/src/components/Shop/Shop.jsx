import React, { useEffect } from "react";
import Header from "../Layout/Header/Header";
import classes from "./Shop.module.css";
import Category from "./Category/Category";
import Products from "./Products/Products";
import { useDispatch } from "react-redux";
import { selectCategory } from "../../store/category";

export default function Shop() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(selectCategory({ category: "all" }));
  });

  return (
    <div className="container">
      <Header pageName="Shop" />
      <div className="row">
        <div className="col-3">
          <h3>CATEGORIES</h3>
          <ul className={classes.categories}>
            <li>
              <h5
                className={`app-dark-background ${classes["categories-title"]}`}
              >
                APPLE
              </h5>
              <ul className={classes["categories-list"]}>
                <Category category="All" />
              </ul>
            </li>
            <li>
              <h5 className={`app-background ${classes["categories-title"]}`}>
                IPHONE & MAC
              </h5>
              <ul className={classes["categories-list"]}>
                <Category category="iPhone" />
                <Category category="iPad" />
                <Category category="MacBook" />
              </ul>
            </li>
            <li>
              <h5 className={`app-background ${classes["categories-title"]}`}>
                WIRELESS
              </h5>
              <ul className={classes["categories-list"]}>
                <Category category="Airpod" />
                <Category category="Watch" />
              </ul>
            </li>
            <li>
              <h5 className={`app-background ${classes["categories-title"]}`}>
                OTHER
              </h5>
              <ul className={classes["categories-list"]}>
                <Category category="Mouse" />
                <Category category="Keyboard" />
                <Category category="Other" />
              </ul>
            </li>
          </ul>
        </div>
        <div className="col-9">
          <Products />
        </div>
      </div>
    </div>
  );
}
