import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import RewardsNavbar from "../components/rewardsNavbar";
import { useGetProfileQuery } from "../slices/usersApiSlice";
import { updatePoints } from "../slices/authSlice";
import { useDispatch } from "react-redux";

const HomeScreen = () => {
  const userInfo = useSelector((state) => state.auth);
  const { data: profile, isLoading, error, refetch } = useGetProfileQuery();
  const dispatch = useDispatch();

  const [userPoints, setUserPoints] = useState(0);
  useEffect(() => {
    if (!isLoading) {
      dispatch(updatePoints(profile.points));
      setUserPoints(userInfo.userInfo.points);
      refetch();
    } else {
      setUserPoints(0);
    }
  }, [isLoading]);

  return (
    <div className="md:pb-4 h-[100%]">
      <RewardsNavbar />
      <div className="bg-gray-200 grid justify-center  text-center p-4">
        <h2 className="text-4xl text-primary font-semibold my-4">
          Anchor Safety Rewards -{" "}
          <span className=" text-secondary">Order PPE to earn points</span>
          <p className="mt-6 text-xl lg:w-3/4 mx-auto">
            Welcome to the all-new Anchor Safety Rewards program - where you can
            earn <span className="text-secondary">Reward Points</span> every
            time you buy PPE. Surprise your team with a gift or save up your
            points and treat yourself, with something special from our exciting
            range.
          </p>
          <p className="mt-6 text-xl lg:w-3/4 mx-auto">
            Spending your rewards points is quick and easy. If you wish to
            redeem now, click through to the online range and get spending. What
            will you choose?
          </p>
        </h2>
      </div>
      <div className="grid md:grid-cols-2 md:gap-1 mx-auto justify-items-center text-primary lg:gap-10 lg:mt-6 lg:px-4 h-fit max-w-[1500px]">
        <div className="text-center w-full bg-gray-200 md:rounded-lg">
          <h2 className="bg-secondary p-4 text-md lg:text-2xl text-primary font-semibold md:rounded-tr-lg md:rounded-tl-lg">
            How many reward points do I have?
          </h2>
          <div className="grid justify-center items-center h-3/4 lg:my-6 border-secondary ">
            <p className="text-lg lg:text-2xl font-semibold">
              You have earned:
            </p>
            <p className="text-9xl text-secondary font-bold">
              {!isLoading && profile.points}
            </p>
            <p className="text-lg lg:text-xl font-semibold">
              Anchor Safety Reward Points
            </p>
            <Link
              className="bg-primary flex justify-self-center my-3 md:my-6 lg:my-0 gap-2 p-2 items-center justify-center text-white font-semibold w-fit text-center rounded-full text-lg lg:text-xl"
              to="/users/myorders"
            >
              View order history
              <FaChevronRight className="text-secondary" size={22} />
            </Link>
          </div>
        </div>

        <div className="text-center w-full  bg-gray-200 md:rounded-lg">
          <h2 className="bg-secondary p-4 text-md lg:text-2xl text-primary font-semibold md:rounded-tr-lg md:rounded-tl-lg">
            How can I spend my reward points?
          </h2>
          <div className="grid justify-center items-center h-3/4 lg:my-8 lg:px-4 border-secondary ">
            <p className="text-lg lg:text-2xl font-semibold mb-2 w-11/12 justify-self-center">
              Take a look at our range!
            </p>
            <div className=" lg:grid relative p-12 mt-8 w-[300px] mb-8  lg:w-[400px] justify-self-center items-center">
              <div className="flex absolute -bottom-6 left-[25%] gap-4 lg:-left-10">
                <div className="w-[150px] h-[150px] bg-secondary p-2 rounded-full">
                  <img
                    alt="family circle biscuits"
                    src="/images/cadbury_chocolate_and_sweets_gift.webp"
                  />
                </div>

                <div className="w-[150px] h-[150px] hidden lg:block bg-secondary p-2 rounded-full">
                  <img
                    alt="256pc tool socket set"
                    src="/images/256pc-tool-socket-set.png"
                  />
                </div>
                <div className="w-[150px] h-[150px] hidden lg:block bg-secondary p-2 rounded-full">
                  <img alt="Amazon gift card" src="/images/amazon.png" />
                </div>
              </div>
            </div>

            <Link
              className="bg-primary flex items-center justify-evenly text-white font-semibold w-fit justify-self-center text-center my-[11px] p-2 lg:px-4  rounded-full mx-4 text-lg lg:text-xl"
              to="/products"
            >
              View range and redeem points
              <FaChevronRight className="text-secondary" size={22} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
