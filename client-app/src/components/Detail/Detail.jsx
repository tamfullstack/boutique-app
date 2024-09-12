import React from "react";
import { useLoaderData } from "react-router-dom";
import ProductDetail from "./ProductDetail/ProductDetail";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import { url } from "../../utils/url";

export default function Detail() {
  const product = useLoaderData();

  return (
    <div className="container">
      <ProductDetail selectedProduct={product?.selectedProduct} />
      <RelatedProducts relatedProducts={product?.relatedProducts} />
    </div>
  );
}

export const productLoader = async ({ params }) => {
  try {
    const res = await fetch(url + "/client/product/" + params.productId);

    if (res.status === 200) {
      return res;
    } else {
      throw new Error("Could not fetch product.");
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
