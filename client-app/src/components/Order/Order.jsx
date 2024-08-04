import React, { useEffect } from "react";
import { getToken } from "../../utils/token";
import { url } from "../../utils/url";
import {
  redirect,
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import { convertNumber } from "../../utils/convertNumber";

export default function Order() {
  const currentUser = useRouteLoaderData("root");
  const order = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const renderOrderItems = () => {
    return order?.items.map((item) => {
      return (
        <tr key={item.product._id}>
          <td>{item.product._id}</td>
          <td>
            <img src={item.product.img1} alt={item.product.name} height={200} />
          </td>
          <td>{item.product.name}</td>
          <td>{convertNumber(item.product.price)} VND</td>
          <td>{item.quantity}</td>
        </tr>
      );
    });
  };

  return (
    <div className="container" style={{ marginTop: 40 }}>
      <h1>INFORMATION ORDER</h1>
      <div className="app-sub-color" style={{ marginBottom: 80 }}>
        <div>ID User: {order?.user}</div>
        <div>Full Name: {order?.fullName}</div>
        <div>Phone: {order?.phoneNumber}</div>
        <div>Address: {order?.address}</div>
        <div>Total: {convertNumber(order?.total)} VND</div>
      </div>
      <table>
        <thead className="app-background">
          <tr>
            <th>ID PRODUCT</th>
            <th>IMAGE</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>COUNT</th>
          </tr>
        </thead>
        <tbody>{renderOrderItems()}</tbody>
      </table>
    </div>
  );
}

export const orderLoader = async ({ params }) => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error("Not found token.");
    }

    const res = await fetch(url + "/client/order/" + params.orderId, {
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
    return redirect("/");
  }
};
