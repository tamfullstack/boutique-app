import React, { useEffect } from "react";
import classes from "./Login.module.css";
import {
  redirect,
  useActionData,
  useNavigate,
  useRouteLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { url } from "../../utils/url";
import { setToken } from "../../utils/token";
import { useState } from "react";

export default function Login() {
  const currentUser = useRouteLoaderData("root");
  const error = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const submit = useSubmit();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { email, password };
    submit(formData, { method: "post" });
    setPassword("");
  };

  const isSubmitting = navigation.state === "submitting";

  return (
    <div className={classes.login}>
      <h1 className={classes["login-title"]}>Login</h1>
      {error && <p className="text-danger">{error}</p>}
      <form className={classes["login-form"]} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleChangeEmail}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleChangePassword}
        />
        <button
          className={`app-btn app-blue-bg ${isSubmitting ? "submitting" : ""}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export const loginAction = async ({ request }) => {
  try {
    const { method } = request;
    const formData = await request.formData();

    const email = formData.get("email");
    const password = formData.get("password");

    const res = await fetch(url + "/admin/auth", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const resData = await res.json();

    if (res.status === 201) {
      setToken(resData.token);
      return redirect("/");
    } else {
      throw new Error(resData.message);
    }
  } catch (error) {
    return error.message;
  }
};
