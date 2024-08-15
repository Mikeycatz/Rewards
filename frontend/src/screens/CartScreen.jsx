import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PiTrashBold } from "react-icons/pi";
import Message from "../components/Message";
import Button from "../components/Button";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import { FaChevronRight } from "react-icons/fa";
import CheckoutSteps from "../components/CheckoutSteps";
import RewardsNavbar from "../components/rewardsNavbar";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/?redirect=/shipping");
  };

  return (
    <div className="h-[100%]">
      <h1 className="text-3xl my-4"></h1>
      <div className="grid sm:justify-items-center">
        {cartItems.length === 0 ? (
          <Message variant="slate-500">
            Your cart is empty{" "}
            <Link to="/" className="underline">
              Go Back
            </Link>
          </Message>
        ) : (
          <div>
            <RewardsNavbar />
            <br></br>
            <CheckoutSteps step1 />
            <ul className="grid w-full lg:w-8/12 mx-auto">
              <li
                key="shopping-cart"
                className="grid grid-cols-[,.5fr,1fr,,.5fr,.5fr,.5fr] mb-4 py-4 border-b-2 items-center"
              >
                <h2 className="text-xl font-semibold justify-self-center"></h2>
                <h2 className="text-xl font-semibold justify-self-start md:justify-self-center">
                  Item
                </h2>
                <h2 className="text-xl font-semibold justify-self-center">
                  Points
                </h2>
                <h2 className="text-xl font-semibold justify-self-center">
                  Qty
                </h2>
              </li>
              {cartItems.map((item) => (
                <li
                  key={item._id}
                  className="grid grid-cols-[,.5fr,1fr,,.5fr,.5fr,.5fr] mb-4 py-4 border-b-2 items-center lg:text-lg"
                >
                  <img
                    className="rounded-md w-1/2 justify-self-center"
                    src={item.image}
                    alt={item.name}
                  />
                  <Link
                    to={`/product/${item._id}`}
                    className="underline justify-self-center"
                  >
                    {item.name}
                  </Link>

                  <div className="justify-self-center">{item.price}</div>
                  <div className="w-full">
                    <form
                      className="rounded-lg grid"
                      onChange={(e) => {
                        addToCartHandler(item, Number(e.target.value));
                      }}
                    >
                      <select className="border rounded-md p-1 w-fit justify-self-center bg-gray-200">
                        {[...Array(10).keys()].map((x) => (
                          <option
                            selected={x === item.qty - 1 ? "selected" : ""}
                            className="mx-auto"
                            key={x + 1}
                            value={x + 1}
                          >
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </form>
                  </div>

                  <PiTrashBold
                    className="text-secondary"
                    size={30}
                    onClick={() => removeFromCartHandler(item._id)}
                  />
                </li>
              ))}
              <div className="grid rounded w-full md:w-fit h-full md:mx-10 p-4 items-center md:justify-self-end justify-center my-4">
                <div className="font-semibold w-full text-2xl text-primary flex items-center justify-center gap-5">
                  <h2 className="text-2xl">
                    Subtotal:{" "}
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  </h2>
                  {`Points: ${cartItems.reduce(
                    (acc, item) => acc + item.qty * item.price,
                    0
                  )} `}
                </div>
                <Button
                  text="Proceed To Checkout"
                  additionalClasses="flex items-center p-2 my-5 lg:mb-20"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  <FaChevronRight className="text-primary" size={20} />
                </Button>
              </div>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartScreen;
