import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import DetailPage from "./pages/DetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import "./App.css";
import { registerAction } from "./components/Register/Register";
import { loginAction } from "./components/Login/Login";
import {
  currentUserLoader,
  logoutAction,
} from "./components/Layout/Navbar/Navbar";
import { productLoader } from "./components/Detail/Detail";
import { productsLoader } from "./components/Home/Home";
import HistoryPage from "./pages/HistoryPage";
import { ordersLoader } from "./components/History/History";
import OrderPage from "./pages/OrderPage";
import { orderLoader } from "./components/Order/Order";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    loader: currentUserLoader,
    action: logoutAction,
    children: [
      { index: true, element: <HomePage />, loader: productsLoader },
      {
        path: "shop",
        element: <ShopPage />,
        loader: productsLoader,
      },
      {
        path: "detail/:productId",
        element: <DetailPage />,
        loader: productLoader,
      },
      { path: "cart", element: <CartPage />, loader: productsLoader },
      { path: "checkout", element: <CheckoutPage />, loader: productsLoader },
      { path: "login", element: <LoginPage />, action: loginAction },
      { path: "register", element: <RegisterPage />, action: registerAction },
      { path: "history", element: <HistoryPage />, loader: ordersLoader },
      { path: "order/:orderId", element: <OrderPage />, loader: orderLoader },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
