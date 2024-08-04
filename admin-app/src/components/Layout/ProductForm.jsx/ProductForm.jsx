import React from "react";
import classes from "./ProductForm.module.css";
import { useState } from "react";
import { useSubmit, redirect, useNavigation } from "react-router-dom";
import { url } from "../../../utils/url";
import { getToken } from "../../../utils/token";

export default function ProductForm(props) {
  const [name, setName] = useState(props.product?.name);
  const [category, setCategory] = useState(props.product?.category);
  const [price, setPrice] = useState(props.product?.price || 0);
  const [count, setCount] = useState(props.product?.count || 0);
  const [shortDesc, setShortDesc] = useState(props.product?.short_desc);
  const [longDesc, setLongDesc] = useState(props.product?.long_desc);
  const [files, setFiles] = useState(null);
  const submit = useSubmit();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleChangeCount = (e) => {
    setCount(e.target.value);
  };

  const handleChangeShortDesc = (e) => {
    setShortDesc(e.target.value);
  };

  const handleChangeLongDesc = (e) => {
    setLongDesc(e.target.value);
  };

  const handleChangeFiles = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      window.alert("Please enter product name.");
      return;
    }

    if (!category) {
      window.alert("Please enter category.");
      return;
    }

    if (price <= 0) {
      window.alert("Price is invalid.");
      return;
    }

    if ((!props.product && count <= 0) || (props.product && count < 0)) {
      window.alert("Count is invalid.");
      return;
    }

    if (!shortDesc) {
      window.alert("Please enter short description.");
      return;
    }

    if (!longDesc) {
      window.alert("Please enter long description.");
      return;
    }

    const formData = new FormData();

    if (!props.product) {
      const images = [];

      for (let key in files) {
        images.push(files[key]);
      }

      if (images.length !== 6) {
        window.alert("The quantity of files is invalid.");
        return;
      }

      images.forEach((image) => {
        formData.append("images", image);
      });
    }

    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("count", count);
    formData.append("shortDesc", shortDesc);
    formData.append("longDesc", longDesc);

    submit(formData, {
      method: props.product ? "put" : "post",
      encType: "multipart/form-data",
    });
  };

  return (
    <form onSubmit={handleSubmit} className={classes["product-form"]}>
      <div className={classes["product-form-item"]}>
        <label>Product Name</label>
        <input
          type="text"
          placeholder="Enter Product Name"
          value={name}
          onChange={handleChangeName}
        />
      </div>
      <div className={classes["product-form-item"]}>
        <label>Category</label>
        <input
          type="text"
          placeholder="Enter Category"
          value={category}
          onChange={handleChangeCategory}
        />
      </div>
      <div className={classes["product-form-item"]}>
        <label>Price</label>
        <input
          type="number"
          placeholder="Enter Price"
          value={price}
          onChange={handleChangePrice}
        />
      </div>
      <div className={classes["product-form-item"]}>
        <label>Count</label>
        <input
          type="number"
          placeholder="Enter Count"
          value={count}
          onChange={handleChangeCount}
        />
      </div>
      <div className={classes["product-form-item"]}>
        <label>Short Description</label>
        <textarea
          placeholder="Enter Short Description"
          value={shortDesc}
          onChange={handleChangeShortDesc}
        />
      </div>
      <div className={classes["product-form-item"]}>
        <label>Long Description</label>
        <textarea
          className={classes.large}
          placeholder="Enter Long Description"
          value={longDesc}
          onChange={handleChangeLongDesc}
        />
      </div>
      {!props.product && (
        <div className={classes["product-form-item"]}>
          <label>Upload images (4 images)</label>
          <input
            className={classes.image}
            type="file"
            multiple
            onChange={handleChangeFiles}
          />
        </div>
      )}
      <button
        className={`app-btn app-blue-bg ${isSubmitting ? "submitting" : ""}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

export const updateProductAction = async ({ params, request }) => {
  try {
    const { method } = request;
    const formData = await request.formData();

    const token = getToken();

    let fetchingUrl = url + "/admin/product/";

    if (method === "PUT") {
      fetchingUrl += params.productId;
    }

    const res = await fetch(fetchingUrl, {
      method,
      headers: { Authorization: "Bearer " + token },
      body: formData,
    });
    const data = await res.json();

    if (res.status === 201) {
      alert(data.message);
      return redirect("/products");
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    alert(error.message);
    return error;
  }
};
