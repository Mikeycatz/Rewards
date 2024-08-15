import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import ProductsScreen from "./screens/ProductsScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OrderListScreen from "./screens/Admin/OrderListScreen";
import ProductListScreen from "./screens/Admin/ProductListScreen";
import ProductEditScreen from "./screens/Admin/ProductEditScreen";
import UserListScreen from "./screens/Admin/UserListScreen";
import UserEditScreen from "./screens/Admin/UserEditScreen";
import MyOrdersScreen from "./screens/MyOrdersScreen";
import NotFoundScreen from "./screens/NotFoundScreen";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/products/" element={<ProductsScreen />} />
        <Route path="/product/:id" element={<ProductScreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/users/profile" element={<ProfileScreen />} />
        <Route path="/users/myorders" element={<MyOrdersScreen />} />
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderListScreen />} />
        <Route path="/admin/productlist" element={<ProductListScreen />} />
        <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
        <Route path="/admin/userlist" element={<UserListScreen />} />
        <Route path="/admin/userlist/:id/edit" element={<UserEditScreen />} />
      </Route>
      <Route path="*" element={<NotFoundScreen />} />
    </Route>
  )
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
