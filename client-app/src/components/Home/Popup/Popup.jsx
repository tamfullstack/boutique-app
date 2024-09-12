import React from "react";
import classes from "./Popup.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hidePopup } from "../../../store/popup";
import { convertNumber } from "../../../utils/convertNumber";

export default function Popup({ selectedTrendingProduct }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleViewDetail = (productId) => {
    dispatch(hidePopup());
    navigate(`/detail/${productId}`);
  };

  const handleHidePopup = () => {
    dispatch(hidePopup());
  };

  return (
    <div className={classes.popup}>
      <div className={classes["popup-content"]}>
        <div className="row">
          <div className="col-6">
            <img
              src={selectedTrendingProduct?.img1}
              alt={selectedTrendingProduct?.name}
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-6">
            <div className={classes["product-content"]}>
              <div className={classes["product-summary"]}>
                <h4>{selectedTrendingProduct?.name}</h4>
                <h5>{convertNumber(selectedTrendingProduct?.price)} VND</h5>
                <p>{selectedTrendingProduct?.short_desc}</p>
              </div>
              <button
                className="app-button"
                onClick={() => {
                  handleViewDetail(selectedTrendingProduct?._id);
                }}
              >
                <i className="fa-solid fa-cart-shopping" /> View detail
              </button>
              <div
                className={classes["hide-popup-button"]}
                onClick={handleHidePopup}
              >
                <i className="fa-solid fa-xmark" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
