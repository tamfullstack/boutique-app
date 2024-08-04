import React, { useEffect } from "react";
import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
  useRouteLoaderData,
} from "react-router-dom";
import { setToken } from "../../utils/token";
import { url } from "../../utils/url";

export default function Login() {
  const currentUser = useRouteLoaderData("root");
  const error = useActionData();
  const navigate = useNavigate("");
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  return (
    <div className="account">
      <div className="account-form text-center">
        <h1 className="app-sub-color">Sign In</h1>
        <Form method="post" className="account-form-input">
          <p className="text-danger">{error}</p>
          <input
            className="app-input"
            type="email"
            name="email"
            placeholder="Email"
          />
          <input
            className="app-input"
            type="password"
            name="password"
            placeholder="Password"
          />
          <button
            className={`app-button account-button ${
              isSubmitting ? "submitting" : ""
            }`}
            disabled={isSubmitting}
          >
            {!isSubmitting ? "SIGN IN" : "SUBMITTING..."}
          </button>
        </Form>
        <div>
          <span className="app-sub-color">Create an account? </span>
          <Link style={{ textDecoration: "none" }} to="/register">
            Click
          </Link>
        </div>
      </div>
    </div>
  );
}

export const loginAction = async ({ request }) => {
  try {
    const { method } = request;
    const formData = await request.formData();

    const email = formData.get("email");
    const password = formData.get("password");

    const res = await fetch(url + "/client/auth/login", {
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
