import Button from "./Button";
import { Link } from "react-router-dom";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { useState } from "react";
import { USERS_URL } from "../constants";

const NavDropDown = ({ name, logout }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div onMouseLeave={() => setToggle(false)}>
      <Button
        background="primary"
        additionalClasses="px-3 py-2"
        onClick={() => setToggle(!toggle)}
      >
        {name}
        {toggle ? <HiChevronDown size={24} /> : <HiChevronUp size={24} />}
      </Button>
      {toggle && (
        <div className="w-[200px] absolute bg-white border-2">
          <Link to={`/users/profile`}>
            <div className="border-solid border-b-2 p-4 hover:bg-primary/70 hover:text-white">
              Profile
            </div>
          </Link>
          <Link to={`/users/myorders`}>
            <div className="border-solid border-b-2 p-4 hover:bg-primary/70 hover:text-white">
              Orders
            </div>
          </Link>
          <div
            onClick={logout}
            className="border-solid border-b-2 p-4 hover:bg-primary/70 hover:text-white"
          >
            Sign Out
          </div>
        </div>
      )}
    </div>
  );
};

export default NavDropDown;
