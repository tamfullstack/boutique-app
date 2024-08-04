import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/ProductsPage";
import NewProductPage from "./pages/NewProductPage";
import EditProductPage from "./pages/EditProductPage";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import { loginAction } from "./components/Login/Login";
import { currentUserLoader } from "./components/Layout/Layout";
import { logoutAction } from "./components/Layout/Sidebar/Sidebar";
import {
  deleteProductAction,
  productsLoader,
} from "./components/Products/Products";
import { dashboardLoader } from "./components/Dashboard/Dashboard";
import OrderPage from "./pages/OrderPage";
import { orderLoader } from "./components/Order/Order";
import { updateProductAction } from "./components/Layout/ProductForm.jsx/ProductForm";
import { productLoader } from "./components/EditProduct/EditProduct";

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    loader: currentUserLoader,
    element: <RootLayout />,
    children: [
      { index: true, element: <DashboardPage />, loader: dashboardLoader },
      {
        path: "products",
        element: <ProductsPage />,
        loader: productsLoader,
        action: deleteProductAction,
      },
      {
        path: "new-product",
        element: <NewProductPage />,
        action: updateProductAction,
      },
      {
        path: "edit-product/:productId",
        element: <EditProductPage />,
        loader: productLoader,
        action: updateProductAction,
      },
      { path: "order/:orderId", element: <OrderPage />, loader: orderLoader },
      { path: "chat", element: <ChatPage /> },
      { path: "login", element: <LoginPage />, action: loginAction },
      { path: "logout", action: logoutAction },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
