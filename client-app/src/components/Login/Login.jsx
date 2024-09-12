import React, { useEffect, useState } from "react";
import {
  Link,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
  useRouteLoaderData,
  useSubmit,
} from "react-router-dom";
import { setToken } from "../../utils/token";
import { url } from "../../utils/url";

export default function Login() {
  const currentUser = useRouteLoaderData("root");
  const error = useActionData();
  const navigate = useNavigate("");
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
    <div className="account">
      <div className="account-form text-center">
        <h1 className="app-sub-color">Sign In</h1>
        <form className="account-form-input" onSubmit={handleSubmit}>
          <p className="text-danger">{error}</p>
          <input
            className="app-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleChangeEmail}
          />
          <input
            className="app-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleChangePassword}
          />
          <button
            className={`app-button account-button ${
              isSubmitting ? "submitting" : ""
            }`}
            disabled={isSubmitting}
          >
            {!isSubmitting ? "SIGN IN" : "SUBMITTING..."}
          </button>
        </form>
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
