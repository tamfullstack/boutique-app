import React from "react";
import { useRouteLoaderData, useNavigate } from "react-router-dom";
import ProductForm from "../Layout/ProductForm.jsx/ProductForm";
import { useEffect } from "react";

export default function NewProduct() {
  const currentUser = useRouteLoaderData("root");
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      if (currentUser.role !== "admin") {
        navigate("/chat");
      }
    }
  }, [currentUser, navigate]);

  return <ProductForm />;
}
