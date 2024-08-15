import { FaEdit } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useGetProductsQuery,
  useCreateProductMutation,
} from "../../slices/productsApiSlice";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ProductListScreen = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl">Products</h1>
      <div className="grid grid-cols-2 my-2">
        <div className=" justify-self-end mb-4">
          <Button
            onClick={createProductHandler}
            additionalClasses="flex items-center"
          >
            <FaEdit />
            Create Product
          </Button>
        </div>
      </div>
      {loadingCreate ? <Loader /> : null}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <table className="w-1/2 text-center border-collapse border-2 text-lg">
            <thead>
              <tr className="border-2">
                <th>ID</th>
                <th>NAME</th>
                <th>POINTS</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
              </tr>
            </thead>
            <tbody className="">
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border-collapse border-2 h-[40px] odd:bg-gray-300"
                >
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td className="bg-secondary h-full w-full flex justify-center py-3 px-2 rounded-sm">
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <FaEdit className="text-white" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ProductListScreen;
