import { IoCartSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NavDropDown from "../components/NavDropDown";
import AdminDropDown from "./AdminDropDown";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

function Navbar() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const loggedIn = () => {
    if (userInfo != null) {
      navigate("/home");
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center mx-6 z-20 py-7">
        <Link to="https://www.anchorsafety.co.uk">
          <img src="/images/Anchor-Logo-C_t.png" alt="Anchor safety logo" />
        </Link>
        <div
          className="cursor-pointer"
          onClick={() => {
            loggedIn();
          }}
        >
          <img
            className="h-[100px] my-2"
            src="/images/rewards-logo-oct23.png"
            alt="Anchor rewards logo"
          />
        </div>
        {userInfo ? (
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex items-center gap-5 z-10">
              <div className="cursor-pointer">
                <NavDropDown name={userInfo.name} logout={logoutHandler} />
              </div>
              {userInfo && userInfo.isAdmin && (
                <div className="cursor-pointer">
                  <AdminDropDown name="Admin" logout={logoutHandler} />
                </div>
              )}
            </div>
            <div className="flex items-center">
              <Link to="/cart" className="">
                <IoCartSharp className="text-secondary" alt="Cart" size={36} />
              </Link>
              {cartItems.length > 0 && (
                <div className="rounded-full w-[25px] h-[25px] flex items-center font-semibold justify-center bg-secondary">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            {/* <Link to="/" className="flex border-2 rounded-lg p-2 w-fit">
              <BsPersonCircle className="text-secondary mx-2" size={28} />
              Sign In{" "}
            </Link> */}
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
