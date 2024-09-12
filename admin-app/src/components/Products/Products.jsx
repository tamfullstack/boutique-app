import React, { useEffect, useState } from "react";
import {
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
  useSubmit,
  redirect,
} from "react-router-dom";
import { getToken } from "../../utils/token";
import { url } from "../../utils/url";
import { convertNumber } from "../../utils/convertNumber";

export default function Products() {
  const currentUser = useRouteLoaderData("root");
  const products = useLoaderData();
  const navigate = useNavigate();
  const [productQuery, setProductQuery] = useState("");
  const submit = useSubmit();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      if (currentUser.role !== "admin") {
        navigate("/chat");
      }
    }
  }, [currentUser, navigate]);

  const handleChangeProductQuery = (e) => {
    setProductQuery(e.target.value);
  };

  const hadleNavigateEditProduct = (productId) => {
    navigate("/edit-product/" + productId);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure?")) {
      submit({ productId }, { method: "delete" });
    }
  };

  const renderProducts = () => {
    return products
      ?.filter((product) =>
        product.name
          .trim()
          .toLowerCase()
          .includes(productQuery.trim().toLowerCase())
      )
      .map((product) => {
        return (
          <tr key={product._id}>
            <td>{product._id}</td>
            <td>{product.name}</td>
            <td>{convertNumber(product.price)} VND</td>
            <td>
              <img src={product.img1} alt={product.name} width={50} />
            </td>
            <td>{product.category}</td>
            <td>
              <button
                className="app-btn app-green-bg"
                onClick={() => {
                  hadleNavigateEditProduct(product._id);
                }}
              >
                Update
              </button>
              <span> </span>
              <button
                className="app-btn app-red-bg"
                onClick={() => {
                  handleDeleteProduct(product._id);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      });
  };

  return (
    <>
      <h5>Products</h5>
      <input
        type="text"
        placeholder="Enter Search!"
        className="app-search-input"
        style={{ width: 300 }}
        value={productQuery}
        onChange={handleChangeProductQuery}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Category</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>{renderProducts()}</tbody>
      </table>
    </>
  );
}

export const productsLoader = async () => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error("Not found token");
    }

    const res = await fetch(url + "/admin/product", {
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

export const deleteProductAction = async ({ request }) => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error("Not found token.");
    }

    const { method } = request;
    const formData = await request.formData();
    const productId = formData.get("productId");

    const res = await fetch(url + "/admin/product/" + productId, {
      method,
      headers: { Authorization: "Bearer " + token },
    });

    if (res.status === 201) {
      return redirect("/products");
    } else {
      const resData = await res.json();
      throw new Error(resData.message);
    }
  } catch (error) {
    alert(error.message);
    return error;
  }
};
