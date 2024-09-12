import React from "react";
import classes from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={classes.loading}>
      <img
        src={require("../../../assets/img/loading/loading.gif")}
        alt="loading"
      />
    </div>
  );
}
