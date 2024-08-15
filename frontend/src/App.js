import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logout } from "./slices/authSlice";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const expirationTime = localStorage.getItem("expirationTime");
    if (expirationTime) {
      const currentTime = new Date().getTime();

      if (currentTime > expirationTime) {
        dispatch(logout());
        navigate("/login");
      }
    }
  }, [dispatch, navigate]);

  return (
    <>
      <Header />
      <main className="relative min-h-[60vh]">
        <Outlet />
      </main>
      <Footer />

      <ToastContainer autoClose={750} />
    </>
  );
};

export default App;
