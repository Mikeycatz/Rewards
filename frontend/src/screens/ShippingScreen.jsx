import { useState } from "react";
import FormContainer from "../components/FormContainer";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import { FaChevronRight } from "react-icons/fa";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address1, setAddress1] = useState(shippingAddress.address1 || "");
  const [address2, setAddress2] = useState(shippingAddress.address2 || "");
  const [address3, setAddress3] = useState(shippingAddress.address3 || "");
  const [address4, setAddress4] = useState(shippingAddress.address4 || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");
  const [email, setEmail] = useState(shippingAddress.email || "");
  const [phone, setPhone] = useState(shippingAddress.phone || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      saveShippingAddress({
        address1,
        address2,
        address3,
        address4,
        city,
        postalCode,
        country,
        email,
        phone,
      })
    );
    navigate("/placeorder");
  };
  return (
    <div className="flex flex-col mx-auto center items-center h-[100%]">
      <CheckoutSteps step1 step2 />

      <form
        onSubmit={submitHandler}
        className="lg:w-1/2 flex flex-col lg:grid lg:grid-cols-2 gap-5 md:gap-10 text-primary text-xl border-t-2  pt-6 my-4"
      >
        <div className="flex flex-col font-semibold">
          <label htmlFor="address1">Address Line 1</label>
          <input
            type="text"
            id="address1"
            required
            placeholder="Enter Address"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            className="border-2 border-primary/40 rounded-md p-2 h-fit"
          />
        </div>
        <div className="flex flex-col font-semibold">
          <label htmlFor="address2">Address Line 2</label>
          <input
            type="text"
            id="address2"
            placeholder="Enter Address"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            className="border-2 border-primary/40 rounded-md p-2 h-fit"
          />
        </div>
        <div className="flex flex-col font-semibold">
          <label htmlFor="address3">Address Line 3</label>
          <input
            type="text"
            id="address3"
            placeholder="Enter Address"
            value={address3}
            onChange={(e) => setAddress3(e.target.value)}
            className="border-2 border-primary/40 rounded-md p-2 h-fit"
          />
        </div>
        <div className="flex flex-col font-semibold">
          <label htmlFor="address4">Address Line 4</label>
          <input
            type="text"
            id="address4"
            placeholder="Enter Address"
            value={address4}
            onChange={(e) => setAddress4(e.target.value)}
            className="border-2 border-primary/40 rounded-md p-2 h-fit"
          />
        </div>

        <div className="flex flex-col font-semibold">
          <label htmlFor="city">Town/City</label>
          <input
            type="text"
            id="city"
            required
            placeholder="Enter Town/City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border-2 border-primary/40 rounded-md p-2"
          />
        </div>

        <div className="flex flex-col font-semibold">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            required
            placeholder="Enter Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="border-2 border-primary/40 rounded-md p-2"
          />
        </div>

        <div className="flex flex-col font-semibold">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            required
            placeholder="Enter Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="border-2 border-primary/40 rounded-md p-2"
          />
        </div>
        <div className="grid font-semibold">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            required
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-primary/40 rounded-md p-2"
          />
        </div>
        <div className="flex flex-col font-semibold">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            required
            placeholder="Enter phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border-2 border-primary/40 rounded-md p-2"
          />
        </div>

        <Button
          type="submit"
          background="secondary"
          className="mt-2"
          additionalClasses="col-span-2 my-2 p-2 row-span-3 justify-self-end flex items-center md:mb-40"
          onClick={null}
        >
          Continue <FaChevronRight className="text-primary" />
        </Button>
      </form>
    </div>
  );
};

export default ShippingScreen;
