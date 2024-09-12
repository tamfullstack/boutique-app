import React from "react";
import classes from "./TrendingProducts.module.css";
import Product from "../../Layout/Product/Product";
import { showPopup } from "../../../store/popup";
import { useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function TrendingProducts() {
  const products = useLoaderData();
  const dispatch = useDispatch();

  const handleBrowseTrendingProduct = (product) => {
    dispatch(showPopup({ product }));
  };

  const renderTrendingProducts = () => {
    return products?.map((product) => {
      return (
        <div className="col-3" key={product._id}>
          <Product
            product={product}
            onBrowseProduct={() => {
              handleBrowseTrendingProduct(product);
            }}
          />
        </div>
      );
    });
  };

  return (
    <div className={classes["trending-products"]}>
      <h6 className="app-sub-color">MADE THE HARD WAY</h6>
      <h4 className="app-title">TOP TRENDING PRODUCTS</h4>
      <div className="row">{renderTrendingProducts()}</div>
    </div>
  );
}
