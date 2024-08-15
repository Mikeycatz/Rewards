import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import SideBasket from "../components/SideBasket";
import { useEffect, useState } from "react";
import RewardsNavbar from "../components/rewardsNavbar";

const ProductsScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const { userInfo } = useSelector((state) => state.auth);

  const [sortedProducts, setSortedProducts] = useState([]);

  // const cities = [
  //   { name: "china", lat: 4 },
  //   { name: "france", lat: 3 },
  //   { name: "england", lat: 2 },
  //   { name: "spain", lat: 1 },
  // ];
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      let temp = products.map((prod) => {
        return prod;
      });
      temp.sort((a, b) => {
        a = a.price;
        b = b.price;

        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        return 0;
      });
      setSortedProducts(temp);
    }
  }, [isLoading]);

  return (
    <>
      <RewardsNavbar />
      <div className="grid px-2 lg:px-0 lg:grid-cols-[5fr,1.5fr]  xl:grid-cols-[5fr,1fr] gap-4 justify-items-center">
        {userInfo ? (
          <div>
            {isLoading ? (
              <Loader />
            ) : error ? (
              <div>{error?.data?.message || error.error}</div>
            ) : (
              <div>
                <h1 className="text-secondary px-2 font-semibold text-2xl border-b-2 text-center lg:text-start py-4">
                  View Reward Range & Redeem Points
                </h1>
                <div className="grid  justify-items-center md:grid-cols-2 xl:grid-cols-3 lg:gap-4 relative">
                  {sortedProducts.map((prod) => (
                    <Product key={prod._id} product={prod} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>{error?.data?.message}</div>
        )}
        <SideBasket additional="justify-items-start h-fit hidden lg:block fixed right-0 2xl:right-10" />
      </div>
    </>
  );
};

export default ProductsScreen;
