import React from "react";
import classes from "./Categories.module.css";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const navigate = useNavigate();

  const handleBrowseCategory = () => {
    navigate("/shop");
  };

  return (
    <div className={classes.categories}>
      <div className="text-center">
        <h6 className="app-sub-color">CAREFULLY CREATED COLLECTIONS</h6>
        <h4 className="app-title">BROWSE OUR CATEGORIES</h4>
      </div>
      <div className={classes["categories-list"]}>
        <div className="row">
          <div className="col-6">
            <div
              className={classes.category}
              style={{
                backgroundImage: `url(${require("../../../assets/img/products/product_1.png")})`,
              }}
              onClick={handleBrowseCategory}
            >
              <div className={classes.hover}></div>
            </div>
          </div>
          <div className="col-6">
            <div
              className={classes.category}
              style={{
                backgroundImage: `url(${require("../../../assets/img/products/product_2.png")})`,
              }}
              onClick={handleBrowseCategory}
            >
              <div className={classes.hover}></div>
            </div>
          </div>
          <div className="col-4">
            <div
              className={classes.category}
              style={{
                backgroundImage: `url(${require("../../../assets/img/products/product_3.png")})`,
              }}
              onClick={handleBrowseCategory}
            >
              <div className={classes.hover}></div>
            </div>
          </div>
          <div className="col-4">
            <div
              className={classes.category}
              style={{
                backgroundImage: `url(${require("../../../assets/img/products/product_4.png")})`,
              }}
              onClick={handleBrowseCategory}
            >
              <div className={classes.hover}></div>
            </div>
          </div>
          <div className="col-4">
            <div
              className={classes.category}
              style={{
                backgroundImage: `url(${require("../../../assets/img/products/product_5.png")})`,
              }}
              onClick={handleBrowseCategory}
            >
              <div className={classes.hover}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
