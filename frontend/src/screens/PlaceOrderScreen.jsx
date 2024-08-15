import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import Button from "../components/Button";
import { updatePoints } from "../slices/authSlice";
import { FaChevronRight } from "react-icons/fa";
import RewardsNavbar from "../components/rewardsNavbar";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [createOrder, { isLoading }, error] = useCreateOrderMutation();
  const [canOrder, setCanOrder] = useState(true);
  const enoughPoints = userInfo.points - cart.totalPrice >= 0;

  const placeOrderHandler = async () => {
    try {
      setCanOrder(false);
      console.log(canOrder);
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        itemsPrice: cart.itemsPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(updatePoints(res.totalRemainingPoints));
      dispatch(clearCartItems());
      navigate(`/order/${res.createdOrder._id}`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
      setCanOrder(true);
    }
  };

  useEffect(() => {
    if (!cart.shippingAddress.address1) {
      navigate("/shipping");
    }
  }, [cart.shippingAddress.address1, navigate]);
  console.log(cart.shippingAddress);
  return (
    <div className="h-[100%]">
      <RewardsNavbar />
      <div className="w-full lg:w-8/12 mx-auto pt-4">
        <CheckoutSteps step1 step2 step3 />
        <ul className="grid text-primary">
          <div>
            <li
              key="shopping-cart"
              className="grid grid-cols-[1fr,2fr,1fr] lg:grid-cols-[.5fr,1fr,1fr,1fr] mb-4 py-4 border-b-2 items-center"
            >
              <h2 className="text-xl font-semibold justify-self-center"></h2>
              <h2 className="md:text-xl font-semibold justify-self-center  lg:block">
                ITEM
              </h2>
              <h2 className="md:text-xl font-semibold justify-self-center  lg:block">
                POINTS
              </h2>
              <h2 className="md:text-xl font-semibold justify-self-center hidden lg:block">
                QTY
              </h2>
            </li>
            {cart.cartItems.map((item) => (
              <div>
                <li
                  key={item._id}
                  className="grid grid-cols-[1fr,2fr,1fr] lg:grid-cols-[.5fr,1fr,1fr,1fr] font-bold mb-4 py-4 border-b-2 items-center lg:text-lg"
                >
                  <img
                    className="rounded-md w-1/2 justify-self-center"
                    src={item.image}
                    alt={item.name}
                  />
                  <Link
                    to={`/product/${item._id}`}
                    className="underline text-center font-bold"
                  >
                    {item.qty}x {item.name}
                  </Link>

                  <div className="justify-self-center hidden lg:block">
                    {item.price * item.qty}
                  </div>
                  <div className="justify-self-center  lg:block">
                    {item.qty}
                  </div>
                </li>

                <div className=" mb-4 py-4 border-b-2 grid md:justify-start justify-center">
                  <span className="font-semibold text-primary mb-10">
                    DELIVERY TO:
                    <br />
                    <p>
                      {cart.shippingAddress.address1}
                      <br></br>
                      {cart.shippingAddress.city}
                      <br></br>
                      {cart.shippingAddress.country}
                      <br></br>
                      {cart.shippingAddress.postalCode}
                    </p>
                  </span>

                  <div className="font-semibold text-2xl mt-6 text-primary flex items-center gap-5">
                    <h2 className="text-2xl">
                      Subtotal:{" "}
                      {cart.cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </h2>
                    {`Points: ${cart.cartItems.reduce(
                      (acc, item) => acc + item.qty * item.price,
                      0
                    )} `}
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-center">
              {error && <Message background="rose-400">{error}</Message>}
            </div>

            <div
              onClick={placeOrderHandler}
              className="mx-auto rounded-full flex items-center gap-2 cursor-pointer p-3 font-semibold text-white lg:text-xl bg-secondary w-fit mb-10"
            >
              Place Order
              <FaChevronRight className="text-primary" />
              {isLoading && <Loader />}
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
