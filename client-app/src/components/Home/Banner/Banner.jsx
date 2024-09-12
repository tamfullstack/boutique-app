import React from "react";
import classes from "./Banner.module.css";
import { useNavigate } from "react-router-dom";

export default function Banner() {
  const navigate = useNavigate();

  const handleBrowseCollection = () => {
    navigate("/shop");
  };

  return (
    <div className={classes.banner}>
      <div className={classes["banner-content"]}>
        <h6 className={classes["banner-opening"]}>NEW INSPIRATION 2020</h6>
        <h2 className={classes["banner-title"]}>20% OF ON NEW SEASON</h2>
        <button
          className={`app-button ${classes["banner-button"]}`}
          onClick={handleBrowseCollection}
        >
          Browse collections
        </button>
      </div>
    </div>
  );
}
