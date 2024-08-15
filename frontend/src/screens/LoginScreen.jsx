import { useState, useEffect } from "react";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();

  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/home";

  useEffect(() => {
    if (userInfo != null) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="grid grid-cols-[1fr,1fr] justify-items-center md:p-12 bg-primary py-10">
      <div className="hidden lg:grid bg-white rounded-full relative p-12 mt-12 w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] justify-self-center items-center">
        <div className="absolute top-10 left-3">
          <img
            className="justify-self-center"
            src="/images/rewards-logo-oct23.png"
            alt="Anchor rewards logo"
          />
        </div>
        <div className="flex absolute -bottom-8 gap-4 -left-10">
          <div className="w-[150px] h-[150px]  bg-secondary p-2 rounded-full">
            <img
              alt="family circle biscuits"
              src="/images/family-circle.webp"
            />
          </div>

          <div className="w-[150px] h-[150px]  bg-secondary p-2 rounded-full">
            <img
              alt="256pc tool socket set"
              src="/images/256pc-tool-socket-set.png"
            />
          </div>
          <div className="w-[150px] h-[150px]  bg-secondary p-2 rounded-full">
            <img alt="Amazon gift card" src="/images/amazon.png" />
          </div>
        </div>
      </div>
      <div className="justify-self-start">
        <FormContainer>
          <div className="text-white">
            <h2 className="text-secondary text-3xl">
              Welcome to <br />{" "}
              <span className="text-white">Anchor Safety Rewards</span>
            </h2>
            <p>
              Welcome to the all-new Anchor Safety Rewards program - where you
              can earn <span className="text-secondary">Reward Points</span>{" "}
              every time you buy PPE. Surprise your team with a gift or save up
              your points and treat yourself, with something special from our
              exciting range.
            </p>
          </div>
          <h1 className="text-2xl text-secondary py-3 mb-2 border-b-2">
            Sign in to get your rewards
          </h1>
          <form
            className="grid gap-4 text-white text-xl w-full sm:w-[600px]"
            onSubmit={submitHandler}
          >
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              autoComplete="true"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 text-black border-primary rounded-md p-2 focus:bg-blue-100/50"
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 text-black border-primary rounded-md p-2 focus:bg-blue-100/50"
            />

            <Button
              type="submit"
              background="secondary"
              className="mt-2"
              onClick={null}
              disabled={isLoading}
            >
              Sign In
            </Button>
            {isLoading && <Loader />}
            <div className="border-t-2 pt-2">
              New Customer?{" "}
              <Link
                className="text-secondary underline underline-offset-2"
                to={redirect ? `/register?redirect=${redirect}` : "register"}
              >
                Register here
              </Link>
            </div>
          </form>
        </FormContainer>
      </div>
    </div>
  );
};

export default LoginScreen;
