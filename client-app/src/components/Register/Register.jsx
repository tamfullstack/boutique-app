import React, { useEffect } from "react";
import {
  Form,
  Link,
  useActionData,
  redirect,
  useRouteLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { url } from "../../utils/url";

export default function Register() {
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
    <div className="account">
      <div className="account-form text-center">
        <h1 className="app-sub-color">Sign Up</h1>
        <Form method="post" className="account-form-input">
          <p className="text-danger">{error}</p>
          <input
            className="app-input"
            type="text"
            name="full-name"
            placeholder="Full Name"
          />
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
          <input
            className="app-input"
            type="tel"
            name="phone-number"
            placeholder="Phone"
          />
          <button
            className={`app-button account-button ${
              isSubmitting ? "submitting" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "SUBMITTING..." : "SIGN UP"}
          </button>
        </Form>
        <div>
          <span className="app-sub-color">Login? </span>
          <Link style={{ textDecoration: "none" }} to="/login">
            Click
          </Link>
        </div>
      </div>
    </div>
  );
}

export const registerAction = async ({ request }) => {
  try {
    const { method } = request;
    const formData = await request.formData();

    const fullName = formData.get("full-name").trim();
    const email = formData.get("email");
    const password = formData.get("password");
    const phoneNumber = formData.get("phone-number").trim();

    const user = { fullName, password, email, phoneNumber };

    const res = await fetch(url + "/client/auth/signup", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (res.status === 201) {
      return redirect("/login");
    } else {
      const resData = await res.json();
      throw new Error(resData.message);
    }
  } catch (error) {
    return error.message;
  }
};
