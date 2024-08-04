import React, { useEffect } from "react";
import {
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import InfoBoard from "./InfoBoard/InfoBoard";
import History from "./History/History";
import { getToken } from "../../utils/token";
import { url } from "../../utils/url";

export default function Dashboard() {
  const currentUser = useRouteLoaderData("root");
  const navigate = useNavigate();
  const dashboardData = useLoaderData();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      if (currentUser.role !== "admin") {
        navigate("/chat");
      }
    }
  }, [currentUser, navigate]);

  return (
    <>
      <p>Dashboard</p>
      <InfoBoard
        userCount={dashboardData?.userCount}
        earningsOfMonth={dashboardData?.earningsOfMonth}
        newOrderCount={dashboardData?.newOrders.length}
      />
      <History newOrders={dashboardData?.newOrders} />
    </>
  );
}

export const dashboardLoader = async () => {
  try {
    const token = getToken();

    if (!token) {
      return null;
    }

    const res = await fetch(url + "/admin/order", {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });

    if (res.status === 200) {
      return res;
    }

    return null;
  } catch (error) {
    console.log(error);
  }
};
