import { Link } from "react-router-dom";
const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className="grid md:flex justify-center md:gap-8 grid-cols-[1.25fr,.75fr,1fr] items-center text-nowrap font-semibold mb-4">
      <div className="w-fit">
        {step1 ? (
          <Link className="w-fit lg:text-2xl text-secondary" to="/cart">
            Rewards Basket
          </Link>
        ) : (
          <h3 className=" lg:text-2xl text-slate-400">step1</h3>
        )}
      </div>
      <div className="w-fit">
        {step2 ? (
          <Link className="w-fit lg:text-2xl text-secondary" to="/shipping">
            / Delivery
          </Link>
        ) : (
          <h3 className=" lg:text-2xl text-slate-400">/ Delivery</h3>
        )}
      </div>
      <div className="w-fit">
        {step3 ? (
          <Link className="w-fit lg:text-2xl text-secondary" to="/placeorder">
            / Place Order
          </Link>
        ) : (
          <h3 className=" lg:text-2xl text-slate-400">/ Place Order</h3>
        )}
      </div>
    </nav>
  );
};

export default CheckoutSteps;
