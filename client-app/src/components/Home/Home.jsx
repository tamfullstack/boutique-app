import React from "react";
import Banner from "./Banner/Banner";
import Categories from "./Categories/Categories";
import TrendingProducts from "./TrendingProduct/TrendingProducts";
import MoreInfo from "./MoreInfo/MoreInfo";
import { useSelector } from "react-redux";
import Popup from "./Popup/Popup";
import { url } from "../../utils/url";

export default function Home() {
  const { selectedTrendingProduct } = useSelector((state) => state.popup);

  return (
    <div className="container">
      <Banner />
      <Categories />
      <TrendingProducts />
      <MoreInfo />
      {selectedTrendingProduct && (
        <Popup selectedTrendingProduct={selectedTrendingProduct} />
      )}
    </div>
  );
}

export const productsLoader = async () => {
  try {
    const res = await fetch(url + "/client/product");

    if (res.ok) {
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
