import React from "react";
import Product from "../../Layout/Product/Product";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import classes from "./Products.module.css";

export default function Products() {
  const { selectedCategory } = useSelector((state) => state.category);
  const products = useLoaderData();
  const navigate = useNavigate();

  const selectedProducts =
    selectedCategory === "all"
      ? products
      : products?.filter((product) => product.category === selectedCategory);

  const handleBrowseProduct = (product) => {
    navigate(`/detail/${product._id}`);
  };

  const renderProducts = () => {
    return selectedProducts?.map((product) => {
      return (
        <div className="col-4" key={product._id}>
          <Product product={product} onBrowseProduct={handleBrowseProduct} />
        </div>
      );
    });
  };

  return (
    <>
      <form className={classes["products-form"]}>
        <input
          className="app-input"
          style={{ padding: "10px 15px" }}
          type="text"
          placeholder="Enter Search Here!"
        />
        <select>
          <option value="">Default sorting</option>
        </select>
      </form>
      <div className="row">{renderProducts()}</div>
      <div className={classes["results-control"]}>
        <div className={classes["results-buttons"]}>
          <button className={classes["results-button"]}>
            <i className="fa-solid fa-angles-left" />
          </button>
          <div
            className={`${classes["results-page-number"]} app-dark-background`}
          >
            1
          </div>
          <button className={classes["results-button"]}>
            <i className="fa-solid fa-angles-right" />
          </button>
        </div>
        <div className={`${classes["results-detail"]} app-sub-color`}>
          Showing 1 - 9 of {selectedProducts?.length} results
        </div>
      </div>
    </>
  );
}
