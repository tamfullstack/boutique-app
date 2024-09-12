import React, { useEffect } from "react";
import {
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import { url } from "../../utils/url";
import { getToken } from "../../utils/token";
import { convertNumber } from "../../utils/convertNumber";

export default function Order() {
  const currentUser = useRouteLoaderData("root");
  const navigate = useNavigate();
  const order = useLoaderData();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      if (currentUser.role !== "admin") {
        navigate("/chat");
      }
    }
  }, [currentUser, navigate]);

  const renderOrderItems = () => {
    return order?.items.map((item) => {
      return (
        <tr key={item.product._id}>
          <td>{item.product._id}</td>
          <td>
            <img src={item.product.img1} alt={item.product.name} height={100} />
          </td>
          <td>{item.product.name}</td>
          <td>{convertNumber(item.product.price)} VND</td>
          <td>{item.quantity}</td>
        </tr>
      );
    });
  };

  return (
    <>
      <h6>Information Order</h6>
      <div>
        <div>ID User: {order?.user}</div>
        <div>Full Name: {order?.fullName}</div>
        <div>Phone: {order?.phoneNumber}</div>
        <div>Address: {order?.address}</div>
        <div>Total: {convertNumber(order?.total)} VND</div>
      </div>
      <table>
        <thead>
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
    </>
  );
}

export const orderLoader = async ({ params }) => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error("Not found token.");
    }

    const res = await fetch(url + "/admin/order/" + params.orderId, {
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
