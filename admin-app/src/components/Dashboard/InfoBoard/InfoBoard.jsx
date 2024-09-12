import React from "react";
import classes from "./InfoBoard.module.css";
import { convertNumber } from "../../../utils/convertNumber";

export default function InfoBoard(props) {
  return (
    <div className={classes["info-board"]}>
      <div className={classes["info-item"]}>
        <div className={classes["info-item-content"]}>
          <h2>{props.userCount}</h2>
          <p>Clients</p>
        </div>
        <i className="fa-solid fa-user-plus" />
      </div>
      <div className={classes["info-item"]}>
        <div className={classes["info-item-content"]}>
          <h2>{convertNumber(props.earningsOfMonth)} VND</h2>
          <p>Earnings of Month</p>
        </div>
        <i className="fa-solid fa-dollar-sign" />
      </div>
      <div className={classes["info-item"]}>
        <div className={classes["info-item-content"]}>
          <h2>{props.newOrderCount}</h2>
          <p>New Orders</p>
        </div>
        <i className="fa-solid fa-file-circle-plus" />
      </div>
    </div>
  );
}
