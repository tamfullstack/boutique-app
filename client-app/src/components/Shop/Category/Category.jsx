import React from "react";
import classes from "./Category.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectCategory } from "../../../store/category";

export default function Category({ category }) {
  const { selectedCategory } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const handleSelectCategory = () => {
    dispatch(selectCategory({ category }));
  };

  const categoryClass =
    classes.category +
    (selectedCategory === category.toLowerCase() ? "" : " app-sub-color");

  return (
    <li className={categoryClass} onClick={handleSelectCategory}>
      {category}
    </li>
  );
}
