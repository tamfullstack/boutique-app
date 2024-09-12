import React from "react";
import classes from "./MoreInfo.module.css";

export default function MoreInfo() {
  return (
    <>
      <div className={`${classes["more-info"]} app-background`}>
        <div className="row">
          <div className="col-4">
            <div className={classes["more-info-item"]}>
              <div>
                <h4>FREE SHIPPING</h4>
                <h6 className="app-sub-color">Free shipping worldwide</h6>
              </div>
            </div>
          </div>

          <div className="col-4">
            <div className={classes["more-info-item"]}>
              <div>
                <h4>24 X 7 SERVICE</h4>
                <h6 className="app-sub-color">Free shipping worldwide</h6>
              </div>
            </div>
          </div>

          <div className="col-4">
            <div className={classes["more-info-item"]}>
              <div>
                <h4>FESTIVAL OFFER</h4>
                <h6 className="app-sub-color">Free shipping worldwide</h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={classes["subscribe-form"]}>
        <div className="row">
          <div className="col-6">
            <h4>LET'S BE FRIENDS!</h4>
            <h6 className="app-sub-color">
              Nisi nisi tempor consequat laboris nisi.
            </h6>
          </div>
          <form className="col-6">
            <input
              className="app-input"
              type="email"
              placeholder="Enter your email address"
            />
            <button className="app-button">Subscribe</button>
          </form>
        </div>
      </div>
    </>
  );
}
