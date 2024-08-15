import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useState } from "react";
import { addToCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import RewardsNavbar from "../components/rewardsNavbar";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Added to cart");
  };

  return (
    <div>
      <RewardsNavbar />

      <div className="flex justify-center p-6 max-w-[2000px]">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="red">{error?.data?.message || error.error}</Message>
        ) : (
          <div>
            <div className="py-2 flex justify-center">
              <div className="grid md:grid-cols-2">
                <div className="justify-self-center">
                  <img
                    className="rounded-lg shadow-md w-2/3"
                    src={product.image}
                    alt={product.name}
                  />
                </div>
                <div className="md:w-1/2">
                  <ul>
                    <li className="text-2xl border-b-2 py-2">{product.name}</li>
                    <li className="border-b-2 py-2">{product.description}</li>
                    <li className="border-b-2 py-2 text-xl text-primary font-semibold">
                      {product.price} points
                    </li>
                  </ul>

                  <div className="border-b-2 py-2 items-center">
                    <form
                      className="grid grid-cols-2 rounded-lg w-1/2 items-center"
                      value={qty}
                      onChange={(e) => {
                        setQty(Number(e.target.value));
                      }}
                    >
                      <label className="mr-4">Quantity</label>
                      <select className="border rounded-md p-1">
                        {[...Array(10).keys()].map((x) => (
                          <option className="mx-auto" key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </form>
                  </div>

                  <div className="my-6">
                    <ul className="flex flex-col w-full">
                      {/* <li className="border-b-2 border-t-2 p-4 font-semibold text-primary mx-auto">
                      {product.countInStock > 0 ? "IN STOCK" : "OUT OF STOCK"}
                    </li> */}
                      <li className="p-2 mx-auto">
                        <Button
                          type="button"
                          text="Add To Cart"
                          onClick={addToCartHandler}
                        ></Button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductScreen;
