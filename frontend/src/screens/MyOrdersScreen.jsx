import React from "react";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Button from "../components/Button";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import RewardsNavbar from "../components/rewardsNavbar";
const MyOrdersScreen = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error?.data?.message || error.error}</Message>
      ) : (
        <div className="overflow-auto h-[100vh]">
          <RewardsNavbar />
          <div className="border-b-2 mt-2 lg:mt-8 grid grid-cols-[1fr,.5fr,.5fr,.5fr] justify-items-center text-primary">
            <div className="hidden font-semibold text-xl md:block">DATE</div>
            <div className="hidden font-semibold text-xl md:block">TOTAL</div>
            <div className="hidden font-semibold text-xl md:block">DETAILS</div>
          </div>
          <div>
            {orders.map((order) => (
              <div
                className="even:bg-slate-300 py-4 md:py-0 grid text-primary font-semibold  md:grid-cols-[1fr,.5fr,.5fr,.5fr] justify-items-center"
                key={order._id}
              >
                <div className="py-2">{order.createdAt.substring(0, 10)}</div>
                <div className="py-2 hidden md:block">{order.totalPrice}</div>
                <div className="py-2 flex justify-center">
                  <Link to={`/order/${order._id}`}>
                    <Button
                      text="Details"
                      additionalClasses="p-1"
                      onClick={null}
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrdersScreen;
