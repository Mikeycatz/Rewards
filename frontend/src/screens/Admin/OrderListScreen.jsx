import { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";
import { Link } from "react-router-dom";
import Button from "../../components/Button";

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  const [search, setSearch] = useState("");

  return (
    <div className="h-[100vh] overflow-auto">
      <h1 className="text-primary text-xl font-semibold pb-4">Orders</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message></Message>
      ) : (
        <div>
          <div className="flex gap-4 items-center">
            <label
              htmlFor="order filter"
              className="text-primary text-xl font-semibold"
            >
              Filter
            </label>
            <input
              type="text"
              id="order filter"
              placeholder="Enter email"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="border-2 text-black border-primary rounded-md p-2 focus:bg-blue-100/50"
            />
          </div>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message>{error?.data?.message || error.error}</Message>
          ) : (
            <div>
              <div className="border-b-2 grid grid-cols-[.75fr,1fr,.5fr,.5fr,.5fr] justify-items-center ">
                <div className="font-semibold hidden md:block">ID</div>
                <div className="font-semibold hidden md:block">EMAIL</div>
                <div className="font-semibold hidden md:block">DATE</div>
                <div className="font-semibold hidden md:block">TOTAL</div>
                <div className="font-semibold hidden md:block">DETAILS</div>
              </div>
              <div>
                {orders
                  .filter((order) => {
                    return search.toLowerCase() === ""
                      ? order
                      : order.userDetails.email.includes(search);
                  })
                  .map((order) => (
                    <div
                      className="even:bg-slate-300 py-4 md:py-0 grid items-center md:grid-cols-[.75fr,1fr,.5fr,.5fr,.5fr] justify-items-center"
                      key={order._id}
                    >
                      <div className="py-2 px-2 font-semibold">{order._id}</div>
                      <div className="py-2 font-semibold">
                        {order.userDetails.email}
                      </div>
                      <div className="py-2">
                        {order.createdAt.substring(0, 10)}
                      </div>
                      <div className="py-2 hidden md:block">
                        {order.totalPrice}
                      </div>
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
      )}
    </div>
  );
};

export default OrderListScreen;
