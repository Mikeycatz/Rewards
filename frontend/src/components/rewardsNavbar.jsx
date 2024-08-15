import { Link } from "react-router-dom";

const RewardsNavbar = () => {
  return (
    <div className="flex flex-col w-full items-center mx-auto bg-primary py-1 lg:py-2 align-middle">
      <div className="w-full">
        <div className="grid sm:grid-cols-3 items-center justify-center sm:justify-between">
          <Link
            className="bg-primary text-white font-semibold w-full justify-self-center text-center p-4"
            to="/home"
          >
            CURRENT REWARDS POINTS
          </Link>

          <Link
            className="bg-primary text-white sm:border-x-2 font-semibold w-full text-center p-4 border-white border-y-2 sm:border-y-0  lg:mx-4"
            to="/products"
          >
            VIEW REWARD RANGE & REDEEM POINTS
          </Link>
          <Link
            className="bg-primary text-white font-semibold w-fit justify-self-center text-center p-4"
            to="/users/profile"
          >
            REWARD POINTS REDEEM HISTORY
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RewardsNavbar;
