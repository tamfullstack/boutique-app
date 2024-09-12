import React, { useEffect, useState } from "react";
import classes from "./Checkout.module.css";
import Header from "../Layout/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import { convertNumber } from "../../utils/convertNumber";
import { deleteCartAction, getCartAction } from "../../store/cart";
import { getToken } from "../../utils/token";
import { removeCart } from "../../utils/cart";
import { url } from "../../utils/url";

export default function Checkout() {
  const currentUser = useRouteLoaderData("root");
  const { cart } = useSelector((state) => state.cart);
  const products = useLoaderData();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(currentUser?.fullName);
  const [email, setEmail] = useState(currentUser?.email);
  const [phoneNumber, setPhoneNumber] = useState(currentUser?.phoneNumber);
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      cart.forEach((cartItem) => {
        const product = products.find((prod) => prod._id === cartItem.id);

        if (!product || product.count < cartItem.quantity) {
          dispatch(deleteCartAction(cartItem.id));
        }
      });
    }
  }, [currentUser, navigate, products, cart, dispatch]);

  const handleChangeFullName = (e) => {
    setFullName(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      setIsSubmitting(true);
      const token = getToken();
      e.preventDefault();
      setError(null);

      if (!token) {
        return new Error("Not found token.");
      }

      if (!cart) {
        return new Error("Empty cart.");
      }

      const items = cart.map((item) => {
        return { product: item.id, quantity: item.quantity };
      });

      const order = { fullName, email, phoneNumber, address, items, total };

      const res = await fetch(url + "/client/order", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });
      setIsSubmitting(false);

      if (res.status === 201) {
        removeCart();
        dispatch(getCartAction());
        navigate("/history");
      } else {
        const resData = await res.json();
        throw new Error(resData.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const total = cart.reduce(
    (total, item) => (total += item.price * item.quantity),
    0
  );

  const renderCart = () => {
    return cart.map((item) => {
      return (
        <div className={classes["order-item"]} key={item.id}>
          <h5 style={{ margin: 0, width: "50%" }}>{item.name}</h5>
          <div className="app-sub-color">
            {convertNumber(item.price)} VND x {item.quantity}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container">
      <Header pageName="Checkout" />
      <h3>BILLING DETAILS</h3>
      <div className={classes.checkout}>
        <div className="row">
          <div className="col-8">
            <form onSubmit={handleSubmit} className={classes["checkout-form"]}>
              <div className={classes["checkout-form-item"]}>
                <h5 className="app-sub-color">FULL NAME:</h5>
                <input
                  className={`${classes["checkout-form-input"]} app-input`}
                  type="text"
                  placeholder="Enter Your Full Name Here!"
                  value={fullName}
                  onChange={handleChangeFullName}
                />
              </div>
              <div className={classes["checkout-form-item"]}>
                <h5 className="app-sub-color">EMAIL:</h5>
                <input
                  className={`${classes["checkout-form-input"]} app-input`}
                  type="email"
                  placeholder="Enter Your Email Here!"
                  value={email}
                  onChange={handleChangeEmail}
                />
              </div>
              <div className={classes["checkout-form-item"]}>
                <h5 className="app-sub-color">PHONE NUMBER:</h5>
                <input
                  className={`${classes["checkout-form-input"]} app-input`}
                  type="tel"
                  placeholder="Enter Your Phone Number Here!"
                  value={phoneNumber}
                  onChange={handleChangePhoneNumber}
                />
              </div>
              <div className={classes["checkout-form-item"]}>
                <h5 className="app-sub-color">ADDRESS:</h5>
                <input
                  className={`${classes["checkout-form-input"]} app-input`}
                  type="text"
                  placeholder="Enter Your Address Here!"
                  value={address}
                  onChange={handleChangeAddress}
                />
              </div>
              {error && <p className="text-danger">{error}</p>}
              <button
                type="submit"
                className={`app-button ${isSubmitting ? "submitting" : ""}`}
                style={{ fontSize: "1.2rem" }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Place order"}
              </button>
            </form>
          </div>
          <div className="col-4">
            <div className={`${classes.order} app-background`}>
              <h3>YOUR ORDER</h3>
              {renderCart()}
              <div className={classes["order-total"]}>
                <h5 style={{ margin: 0 }}>TOTAL</h5>
                <div className={classes["order-total-value"]}>
                  {convertNumber(total)} VND
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
