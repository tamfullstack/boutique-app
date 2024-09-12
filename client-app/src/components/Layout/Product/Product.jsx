import React from "react";
import classes from "./Product.module.css";
import { convertNumber } from "../../../utils/convertNumber";

export default function Product({ product, onBrowseProduct }) {
  return (
    <div>
      <div
        className={classes["product-image"]}
        style={{ backgroundImage: `url(${product.img1})` }}
        onClick={() => {
          onBrowseProduct(product);
        }}
      >
        <div className={classes.hover}></div>
      </div>
      <div className={`text-center ${classes["product-content"]}`}>
        <p className={classes["product-name"]}>{product.name}</p>
        <p className={`${classes["product-price"]} app-sub-color`}>
          {convertNumber(product.price)} VND
        </p>
      </div>
    </div>
  );
}
