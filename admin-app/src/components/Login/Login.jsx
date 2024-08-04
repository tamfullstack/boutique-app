import React, { useEffect } from "react";
import classes from "./Login.module.css";
import {
  Form,
  redirect,
  useActionData,
  useNavigate,
  useRouteLoaderData,
  useNavigation,
} from "react-router-dom";
import { url } from "../../utils/url";
import { setToken } from "../../utils/token";

export default function Login() {
  const currentUser = useRouteLoaderData("root");
  const error = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const isSubmitting = navigation.state === "submitting";

  return (
    <div className={classes.login}>
      <h1 className={classes["login-title"]}>Login</h1>
      {error && <p className="text-danger">{error}</p>}
      <Form method="post" className={classes["login-form"]}>
        <input type="text" placeholder="Email" name="email" />
        <input type="password" placeholder="Password" name="password" />
        <button
          className={`app-btn app-blue-bg ${isSubmitting ? "submitting" : ""}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Login"}
        </button>
      </Form>
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
