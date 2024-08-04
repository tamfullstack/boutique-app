import React, { useEffect } from "react";
import Header from "../Layout/Header/Header";
import classes from "./Cart.module.css";
import { convertNumber } from "../../utils/convertNumber";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartAction, updateCartAction } from "../../store/cart";

export default function Cart() {
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const products = useLoaderData();
  const dispatch = useDispatch();

  // Kiểm tra giỏ hàng nếu số lượng trong giỏ quá số lượng còn lại trong kho thì xóa sản phẩm khỏi giỏ
  useEffect(() => {
    cart.forEach((cartItem) => {
      const product = products.find((prod) => prod._id === cartItem.id);

      if (!product || product.count < cartItem.quantity) {
        dispatch(deleteCartAction(cartItem.id));
      }
    });
  }, [products, dispatch, cart]);

  const cartTotal = cart.reduce(
    (total, item) => (total += item.price * item.quantity),
    0
  );

  const handleNavigateShop = () => {
    navigate("/shop");
  };

  const handleNavigateCheckout = () => {
    navigate("/checkout");
  };

  const handleUpdateCart = (productId, incQuantity) => {
    const cartItem = cart.find((item) => item.id === productId);

    if (incQuantity === -1) {
      if (cartItem?.quantity > 1) {
        dispatch(updateCartAction(productId, incQuantity));
      }
    } else {
      const product = products.find((prod) => prod._id === productId);

      if (product?.count > cartItem?.quantity) {
        dispatch(updateCartAction(productId, incQuantity));
      }
    }
  };

  const handleDeleteCart = (productId) => {
    dispatch(deleteCartAction(productId));
  };

  const renderCart = () => {
    return cart.map((item) => {
      return (
        <div className={classes["cart-item"]} key={item.id}>
          <div
            className="row text-center"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div className="col-2">
              <img src={item.image} alt={item.name} style={{ width: "100%" }} />
            </div>
            <div className="col-2">
              <h5>{item.name}</h5>
            </div>
            <div className="col-2 app-sub-color">
              {convertNumber(item.price)} VND
            </div>
            <div className="col-2">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className={classes["cart-item-update"]}>
                  <i
                    className={`fa-solid fa-caret-left ${classes["cart-button"]}`}
                    onClick={() => {
                      handleUpdateCart(item.id, -1);
                    }}
                  />
                  <span>{item.quantity}</span>
                  <i
                    className={`fa-solid fa-caret-right ${classes["cart-button"]}`}
                    onClick={() => {
                      handleUpdateCart(item.id, 1);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-2 app-sub-color">
              {convertNumber((Number(item.price) * item.quantity).toString())}{" "}
              VND
            </div>
            <div className="col-2">
              <i
                className={`fa-regular fa-trash-can ${classes["cart-button"]}`}
                onClick={() => {
                  handleDeleteCart(item.id);
                }}
              />
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container">
      <Header pageName="Cart" />
      <h3>SHOPPING CART</h3>
      <div className={classes.cart}>
        <div className="row">
          <div className="col-8">
            <div className={`app-background ${classes["cart-list-header"]}`}>
              <div className="row text-center">
                <div className="col-2">IMAGE</div>
                <div className="col-2">PRODUCT</div>
                <div className="col-2">PRICE</div>
                <div className="col-2">QUANTITY</div>
                <div className="col-2">TOTAL</div>
                <div className="col-2">REMOVE</div>
              </div>
            </div>
            {renderCart()}
            <div className={`app-background ${classes["cart-list-footer"]}`}>
              <div
                className={classes["cart-button"]}
                onClick={handleNavigateShop}
              >
                <i className="fa-solid fa-left-long" /> Continue shopping
              </div>
              <div
                className={classes["cart-button"]}
                style={{ padding: 10, border: "1px solid #000" }}
                onClick={handleNavigateCheckout}
              >
                Proceed to checkout <i className="fa-solid fa-right-long" />
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className={`${classes["cart-total"]} app-background`}>
              <h3>CART TOTAL</h3>
              <div className={classes["cart-total-subtotal"]}>
                <h5 style={{ margin: 0 }}>SUBTOTAL</h5>
                <div className="app-sub-color">
                  {convertNumber(cartTotal)} VND
                </div>
              </div>
              <div className={classes["cart-total-total"]}>
                <h5 style={{ margin: 0 }}>TOTAL</h5>
                <div className={classes["cart-total-total-value"]}>
                  {convertNumber(cartTotal)} VND
                </div>
              </div>
              <form className={classes["coupon-form"]}>
                <input
                  type="text"
                  className="app-input"
                  placeholder="Enter your coupon"
                  style={{ padding: 10 }}
                />
                <button className="app-button" style={{ padding: 10 }}>
                  <i className="fa-solid fa-gift" /> Apply coupon
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
