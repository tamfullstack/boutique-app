import React, { useEffect } from "react";
import Header from "../Layout/Header/Header";
import {
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import { url } from "../../utils/url";
import { getToken } from "../../utils/token";
import { convertNumber } from "../../utils/convertNumber";
import classes from "./History.module.css";

export default function History() {
  const currentUser = useRouteLoaderData("root");
  const orders = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleNavigateOrder = (orderId) => {
    navigate("/order/" + orderId);
  };

  const renderOrders = () => {
    return orders?.map((order) => {
      return (
        <tr key={order._id}>
          <td>{order._id}</td>
          <td>{order.user}</td>
          <td>{order.fullName}</td>
          <td>{order.phoneNumber}</td>
          <td>{order.address}</td>
          <td>{convertNumber(order.total)} VND</td>
          <td>
            {order.isDelivered ? "Progressed" : "Waiting for progressing"}
          </td>
          <td>{order.isPaid ? "Paid" : "Waiting for pay"}</td>
          <td>
            <div
              style={{
                cursor: "pointer",
                color: "#000",
                padding: 10,
                border: "1px solid #000",
                minWidth: 80,
              }}
              onClick={() => {
                handleNavigateOrder(order._id);
              }}
            >
              View <i className="fa-solid fa-right-long" />
            </div>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className={`${classes.history} container`}>
      <Header pageName="History" />
      <table>
        <thead className="app-background">
          <tr>
            <th>ID ORDER</th>
            <th>ID USER</th>
            <th>NAME</th>
            <th>PHONE</th>
            <th>ADDRESS</th>
            <th>TOTAL</th>
            <th>DELIVERY</th>
            <th>STATUS</th>
            <th>DETAIL</th>
          </tr>
        </thead>
        <tbody className="app-sub-color">{renderOrders()}</tbody>
      </table>
    </div>
  );
}

export const ordersLoader = async () => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error("Not found token.");
    }

    const res = await fetch(url + "/client/order", {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });

    if (res.status === 200) {
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
