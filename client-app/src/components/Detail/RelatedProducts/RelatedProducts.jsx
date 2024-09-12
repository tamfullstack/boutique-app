import React from "react";
import classes from "./RelatedProducts.module.css";
import { useNavigate } from "react-router-dom";
import Product from "../../Layout/Product/Product";

export default function RelatedProducts({ relatedProducts }) {
  const navigate = useNavigate();

  const handleBrowseProduct = (product) => {
    navigate(`/detail/${product._id}`);
  };

  const renderRelatedProducts = () => {
    return relatedProducts?.map((product) => {
      return (
        <div className="col-3" key={product._id}>
          <Product product={product} onBrowseProduct={handleBrowseProduct} />
        </div>
      );
    });
  };

  return (
    <div className={classes["related-products"]}>
      <h4>RELATED PRODUCTS</h4>
      <div className="row">{renderRelatedProducts()}</div>
    </div>
  );
}
