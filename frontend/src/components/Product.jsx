import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { addToCart } from "../slices/cartSlice";
import { toast } from "react-toastify";

const Product = ({ product }) => {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Added to cart");
  };
  return (
    <div className="my-3 p-3 rounded-md shadow-md max-w-md">
      <Link className="flex justify-center" to={`/product/${product._id}`}>
        <img className="w-8/12" alt={product.name} src={product.image} />
      </Link>
      <div>
        <Link to={`/product/${product._id}`}>
          <span className="text-primary font-bold text-md 2xl:text-lg line-clamp-1">
            {product.name}
          </span>
        </Link>
        <h3 className="text-secondary font-bold text-lg">
          {product.price} points
        </h3>
        <h4 className="my-2 pt-2 text-primary font-semibold border-t-2 break-keep line-clamp-3">
          {product.description}
        </h4>
        <div className="border-b-2 py-2 items-center flex gap-4 justify-center">
          <form
            className="grid w-[60px] rounded-lg items-center"
            value={qty}
            onChange={(e) => {
              setQty(Number(e.target.value));
            }}
          >
            <select className="border rounded-md w-[px] h-8 p-1 bg-gray-200">
              {[...Array(10).keys()].map((x) => (
                <option className="mx-auto" key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
          </form>
          <div className="my-6">
            <Button
              type="button"
              background="primary"
              text="Add To Basket"
              additionalClasses="flex items-center text-sm lg:text-md py-1 px-2 xl:p-2"
              onClick={addToCartHandler}
            >
              <FaPlus className="text-secondary" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
