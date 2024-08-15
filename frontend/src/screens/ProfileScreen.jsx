import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Button from "../components/Button";
import FormContainer from "../components/FormContainer";
import { useProfileMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import RewardsNavbar from "../components/rewardsNavbar";
const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userPoints, setUserPoints] = useState(0);

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      if (userInfo) {
        setUserPoints(userInfo.points);
      } else {
        setUserPoints(0);
      }
    }
  }, [userInfo, userInfo.points, userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err.error);
      }
    }
  };

  return (
    <>
      <RewardsNavbar />
      <div className="grid lg:grid-cols-[2fr,5fr] my-2 max-w-[1800px] overflow-auto h-[100%] md:h-[100vh]">
        <FormContainer>
          <h1 className="text-3xl text-primary">Profile</h1>
          <h3 className="text-secondary font-bold text-2xl py-3">
            Change Password
          </h3>
          <form
            className="grid gap-4 text-primary text-xl"
            onSubmit={submitHandler}
          >
            {/* <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          autoComplete="true"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 border-primary rounded-md p-2 focus:bg-blue-100/50"
        /> */}

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-primary rounded-md p-2 focus:bg-blue-100/50"
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border-2 border-primary rounded-md p-2 focus:bg-blue-100/50"
            />

            <Button
              type="submit"
              background="secondary"
              className="mt-2"
              onClick={null}
              disabled={loadingUpdateProfile}
            >
              Update password
            </Button>
            {loadingUpdateProfile && <Loader />}
          </form>
        </FormContainer>
        <div className="text-center w-full lg:w-3/4 xl:w-1/2 lg:h-fit lg:m-4 bg-gray-200 rounded-lg">
          <h2 className="bg-secondary p-4 text-md lg:text-2xl text-primary font-semibold rounded-tr-lg rounded-tl-lg">
            How many reward points do I have?
          </h2>
          <div className="grid justify-center items-center h-3/4 lg:my-6 border-secondary ">
            <p className="text-lg lg:text-2xl font-semibold">
              You have earned:
            </p>
            <p className="text-9xl text-secondary font-bold my-2">
              {userInfo !== null && userPoints}
            </p>
            <p className="text-lg lg:text-2xl font-semibold">
              Anchor Safety Reward Points
            </p>
            <Link
              className="bg-primary flex items-center justify-evenly text-white font-semibold w-full text-center p-2 my-6 rounded-full lg:mx-4 text-lg lg:text-xl"
              to="/users/myorders"
            >
              View order history
              <FaChevronRight className="text-secondary" size={22} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
