import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";

const SideBasket = ({ additional }) => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const onClickHandler = () => {
    navigate("/cart");
  };
  let totalRemainingPoints = userInfo.points - cart.totalPrice;
  useEffect(() => {
    totalRemainingPoints = userInfo.points - cart.totalPrice;
  }, [userInfo.points, cart.totalPrice]);

  return (
    <div className={`rounded-lg mt-2 bg-gray-200 w-[250px]  ${additional}`}>
      <h2 className="font-semibold rounded-tl-lg rounded-tr-lg py-2 text-xl bg-primary text-white text-center">
        Rewards Basket
      </h2>
      <div className="grid gap-2 p-2">
        <p className="text-md font-semibold">
          Basket Items: {cart.cartItems.reduce((a, c) => a + c.qty, 0)}
        </p>
        <p className="text-md font-semibold">
          Redeemed:{" "}
          {`${cart.cartItems.reduce(
            (acc, item) => acc + item.qty * item.price,
            0
          )} points`}
        </p>
        <p className="text-md font-semibold">
          Points remaining: {totalRemainingPoints}
        </p>

        <Button
          text="Reedem points now"
          additionalClasses="flex items-center px-2 py-1"
          onClick={onClickHandler}
        >
          <FaChevronRight className="text-primary" size={18} />
        </Button>
      </div>
    </div>
  );
};

export default SideBasket;
