import React from "react";
import classes from "./Layout.module.css";
import Sidebar from "./Sidebar/Sidebar";
import { getToken } from "../../utils/token";
import { url } from "../../utils/url";
import { useNavigation } from "react-router-dom";
import Loading from "./Loading/Loading";

export default function Layout({ children }) {
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className={`col-10 ${classes["layout-content"]}`}>{children}</div>
      </div>
      {isLoading && <Loading />}
    </div>
  );
}

export const currentUserLoader = async () => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error("Not found token");
    }

    const res = await fetch(url + "/admin/auth", {
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
