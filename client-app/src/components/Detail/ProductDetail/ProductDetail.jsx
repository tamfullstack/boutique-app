import React, { useEffect, useState } from "react";
import classes from "./ProductDetail.module.css";
import { convertNumber } from "../../../utils/convertNumber";
import { useDispatch } from "react-redux";
import { addCartAction } from "../../../store/cart";
import { useNavigate } from "react-router-dom";

export default function ProductDetail({ selectedProduct }) {
  const [selectedProductImage, setSelectedProductImage] = useState("img1");
  const [quantity, setQuantity] = useState(1);
  const [isShowingDescription, setIsShowingDescription] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedProductImage("img1");
    setQuantity(1);
    setIsShowingDescription(false);
  }, [selectedProduct]);

  const handleAddCart = (productQuantity) => {
    const id = selectedProduct?._id;
    const image = selectedProduct?.img1;
    const name = selectedProduct?.name;
    const price = selectedProduct?.price;

    const product = { id, image, name, price, quantity: productQuantity };
    dispatch(addCartAction(product));
    navigate("/cart");
  };

  const renderProductImages = () => {
    const render = [];

    for (let i = 1; i <= 4; i++) {
      render.push(
        <img
          key={i}
          src={selectedProduct && selectedProduct[`img${i}`]}
          alt={selectedProduct?.name}
          style={{ width: "100%", marginBottom: 10 }}
          onClick={() => {
            setSelectedProductImage(`img${i}`);
          }}
        />
      );
    }

    return render;
  };

  const renderProductDescription = () => {
    return selectedProduct?.long_desc.split("\n").map((item, index) => {
      return (
        <span key={index}>
          {item}
          <br />
        </span>
      );
    });
  };

  return (
    <>
      <div className={classes["product-info"]}>
        <div className="row">
          <div className="col-6">
            <div className="row">
              <div style={{ width: "20%" }}>{renderProductImages()}</div>
              <div style={{ width: "80%" }}>
                <img
                  src={selectedProduct && selectedProduct[selectedProductImage]}
                  alt={selectedProduct?.name}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className={classes["product-info-content"]}>
              <h1>{selectedProduct?.name}</h1>
              <p className={`${classes["product-price"]} app-sub-color`}>
                {convertNumber(selectedProduct?.price)} VND
              </p>
              <p className="app-sub-color">{selectedProduct?.short_desc}</p>
              <p>
                <b>CATEGORY: </b>
                <span className="app-sub-color">
                  {selectedProduct?.category}
                </span>
              </p>
              <p>
                <b>COUNT: </b>
                <span className="app-sub-color">{selectedProduct?.count}</span>
              </p>
              {selectedProduct?.count > 0 && (
                <div className={classes["product-quantity"]}>
                  <div
                    className={`app-input ${classes["product-quantity-input"]}`}
                  >
                    <span className="app-sub-color">QUANTITY</span>
                    <div className={classes["product-quantity-buttons"]}>
                      <i
                        className={`fa-solid fa-caret-left ${classes["product-quantity-button"]}`}
                        onClick={() => {
                          setQuantity(quantity > 1 ? quantity - 1 : quantity);
                        }}
                      />
                      <span>{quantity}</span>
                      <i
                        className={`fa-solid fa-caret-right ${classes["product-quantity-button"]}`}
                        onClick={() => {
                          setQuantity(
                            quantity < selectedProduct?.count
                              ? quantity + 1
                              : quantity
                          );
                        }}
                      />
                    </div>
                  </div>
                  <button
                    className="app-button"
                    onClick={() => {
                      handleAddCart(quantity);
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              )}
              {selectedProduct?.count === 0 && (
                <h4 className="text-danger">SOLD OUT</h4>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={classes["product-description"]}>
        <button
          className="app-button"
          onClick={() => {
            setIsShowingDescription(!isShowingDescription);
          }}
        >
          DESCRIPTION
        </button>
        {isShowingDescription && (
          <div>
            <h5>PRODUCT DESCRIPTION</h5>
            <div className="app-sub-color">{renderProductDescription()}</div>
          </div>
        )}
      </div>
    </>
  );
}
