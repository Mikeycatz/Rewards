import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { useGetOrderDetailsQuery } from "../slices/ordersApiSlice";
import Message from "../components/Message";
import { FaChevronRight } from "react-icons/fa";
import RewardsNavbar from "../components/rewardsNavbar";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    isLoading,
    refetch,
    error,
  } = useGetOrderDetailsQuery(orderId);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <div className="h-[100%]">
      <Message>{error?.data?.message || error.error}</Message>
    </div>
  ) : (
    <div>
      <RewardsNavbar />
      <div className="grid justify-center text-primary h-[100%]">
        <h1 className="font-semibold text-secondary text-lg lg:text-xl justify-self-center mx-2 border-y-2 py-4 w-full text-center">
          <span className="text-primary">Order ID:</span>
          {` ${order._id}`}
        </h1>
        <div className="grid justify-center m-4">
          <div className="text-center border-b-2 py-4 mb-4">
            <h2 className="text-xl text-primary font-semibold">Delivery To:</h2>
            <p className="text-lg font-semibold">
              Name:{" "}
              <span className="text-secondary ">{order.userDetails.name}</span>
            </p>
            <p className="text-lg font-semibold">
              Email:{" "}
              <span className="text-secondary ">{order.userDetails.email}</span>
            </p>
            <p className="text-lg font-semibold">
              Address:{" "}
              <span className="text-secondary ">
                {order.shippingAddress.address1}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </span>
            </p>
          </div>

          <ul>
            {order.orderItems.map((item, index) => (
              <li
                key={index}
                className="flex p-2 text-xl gap-10 items-center lg:justify-center border-b-2 mt-4 pb-4 rounded-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-1/12 rounded-md"
                />
                <Link to={`/product/${item.product}`}>
                  {item.qty} x {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-center text-primary text-xl md:text-3xl p-4">
            Thank for your loyalty, enjoy your rewards!
          </p>

          <a
            href="https://www.anchorsafety.co.uk"
            target="_blank"
            className="mx-auto my-4 rounded-full flex text-center items-center gap-2 cursor-pointer p-3 font-semibold text-white lg:text-xl bg-secondary w-fit mb-10"
          >
            www.anchorsafety.co.uk
            <FaChevronRight className="text-primary" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
