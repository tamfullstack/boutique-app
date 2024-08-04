import React from "react";
import classes from "./History.module.css";
import { convertNumber } from "../../../utils/convertNumber";
import { useNavigate } from "react-router-dom";

export default function History(props) {
  const navigate = useNavigate();

  const handleNavigateOrder = (orderId) => {
    navigate("/order/" + orderId);
  };

  const renderNewOrders = () => {
    return props.newOrders?.map((order) => {
      return (
        <tr key={order._id}>
          <td>{order.user}</td>
          <td>{order.fullName}</td>
          <td>{order.phoneNumber}</td>
          <td>{order.address}</td>
          <td>{convertNumber(order.total)}</td>
          <td>{order.isDelivered ? "Đã Vận Chuyển" : "Chưa Vận Chuyển"}</td>
          <td>{order.isPaid ? "Đã Thanh Toán" : "Chưa Thanh Toán"}</td>
          <td>
            <button
              className="app-btn app-green-bg"
              onClick={() => {
                handleNavigateOrder(order._id);
              }}
            >
              View
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className={classes.history}>
      <h6>History</h6>
      <table>
        <thead>
          <tr>
            <th>ID User</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Total</th>
            <th>Delivery</th>
            <th>Status</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>{renderNewOrders()}</tbody>
      </table>
    </div>
  );
}
