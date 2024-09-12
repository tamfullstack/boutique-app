import React, { useEffect, useState } from "react";
import {
  Link,
  useActionData,
  redirect,
  useRouteLoaderData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { url } from "../../utils/url";

export default function Register() {
  const currentUser = useRouteLoaderData("root");
  const error = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const submit = useSubmit();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleChangeFullName = (e) => {
    setFullName(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { fullName, email, password, phoneNumber };
    submit(formData, { method: "post" });
    setPassword("");
  };

  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="account">
      <div className="account-form text-center">
        <h1 className="app-sub-color">Sign Up</h1>
        <form className="account-form-input" onSubmit={handleSubmit}>
          <p className="text-danger">{error}</p>
          <input
            className="app-input"
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={handleChangeFullName}
          />
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
          <input
            className="app-input"
            type="tel"
            placeholder="Phone"
            value={phoneNumber}
            onChange={handleChangePhoneNumber}
          />
          <button
            className={`app-button account-button ${
              isSubmitting ? "submitting" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "SUBMITTING..." : "SIGN UP"}
          </button>
        </form>
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

    const fullName = formData.get("fullName").trim();
    const email = formData.get("email");
    const password = formData.get("password");
    const phoneNumber = formData.get("phoneNumber").trim();

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
