import React from "react";
import classes from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className="app-dark-background" style={{ padding: 70 }}>
      <div className="container">
        <div className={`row ${classes.links}`}>
          <div className="col-4">
            <h5>CUSTOMER SERVICES</h5>
            <ul className={classes["links-list"]}>
              <li className={classes["link-item"]}>
                <a href="#" className={classes.link}>
                  Help & Contact Us
                </a>
              </li>
              <li className={classes["link-item"]}>
                <a href="#" className={classes.link}>
                  Returns & Refunds
                </a>
              </li>
              <li className={classes["link-item"]}>
                <a href="#" className={classes.link}>
                  Online Stores
                </a>
              </li>
              <li className={classes["link-item"]}>
                <a href="#" className={classes.link}>
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
          <div className="col-4">
            <h5>COMPANY</h5>
            <ul className={classes["links-list"]}>
              <li className={classes["link-item"]}>
                <a href="#" className={classes.link}>
                  What We Do
                </a>
              </li>
              <li className={classes["link-item"]}>
                <a href="#" className={classes.link}>
                  Availabel Services
                </a>
              </li>
              <li className={classes["link-item"]}>
                <a href="#" className={classes.link}>
                  Latest Posts
                </a>
              </li>
              <li className={classes["link-item"]}>
                <a href="#" className={classes.link}>
                  FAQs
                </a>
              </li>
            </ul>
          </div>
          <div className="col-4">
            <h5>SOCIAL MEDIA</h5>
            <ul className={classes["links-list"]}>
              <li className={classes["link-item"]}>
                <a href="#" className={classes.link}>
                  Twitter
                </a>
              </li>
              <li className={classes["link-item"]}>
                <a href="#" className={classes.link}>
                  Instagram
                </a>
              </li>
              <li className={classes["link-item"]}>
                <a href="#" className={classes.link}>
                  Facebook
                </a>
              </li>
              <li className={classes["link-item"]}>
                <a href="#" className={classes.link}>
                  Pinterest
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
