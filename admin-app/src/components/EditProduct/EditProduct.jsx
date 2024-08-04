import React from "react";
import {
  useRouteLoaderData,
  useNavigate,
  redirect,
  useLoaderData,
} from "react-router-dom";
import ProductForm from "../Layout/ProductForm.jsx/ProductForm";
import { useEffect } from "react";
import { url } from "../../utils/url";
import { getToken } from "../../utils/token";

export default function EditProduct() {
  const currentUser = useRouteLoaderData("root");
  const navigate = useNavigate();
  const product = useLoaderData();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      if (currentUser.role !== "admin") {
        navigate("/chat");
      }
    }
  }, [currentUser, navigate]);

  return <ProductForm product={product} />;
}

export const productLoader = async ({ params }) => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error("Not found token.");
    }

    const res = await fetch(url + "/admin/product/" + params.productId, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });

    if (res.status === 200) {
      return res;
    } else {
      throw new Error("Could not fetch product.");
    }
  } catch (error) {
    console.log(error);
    return redirect("/");
  }
};
