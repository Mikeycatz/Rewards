import { useState, useEffect } from "react";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [recaptcha, setRecaptcha] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();

  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!recaptcha) {
      toast.error("reCaptcha failed");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        console.log(res);
        dispatch(setCredentials({ ...res }));
        // navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const recaptchaOnChange = () => {
    setRecaptcha(true);
  };

  return (
    <FormContainer>
      <h1 className="text-2xl text-primary py-3">Sign Up</h1>
      <form
        className="grid gap-4 text-primary text-xl"
        onSubmit={submitHandler}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-2 border-primary rounded-md p-2 focus:bg-blue-100/50"
        />
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          name="email"
          autoComplete="true"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 border-primary rounded-md p-2 focus:bg-blue-100/50"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 border-primary rounded-md p-2 focus:bg-blue-100/50"
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border-2 border-primary rounded-md p-2 focus:bg-blue-100/50"
        />
        <ReCAPTCHA
          sitekey="6Le0fykpAAAAANQZDTID7mheMjr-AEWkKRTbrOkl"
          onChange={recaptchaOnChange}
        />
        <Button
          type="submit"
          background="secondary"
          className="mt-2"
          onClick={null}
          disabled={isLoading}
        >
          Register
        </Button>
        {isLoading && <Loader />}
        <div>
          Have an account?{" "}
          <Link
            className="underline text-primary"
            to={redirect ? `/?redirect=${redirect}` : "/"}
          >
            Login
          </Link>
        </div>
      </form>
    </FormContainer>
  );
};

export default RegisterScreen;
