import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import FormContainer from "../../components/FormContainer";
import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    };

    const result = await updateProduct(updatedProduct);
    if (result) {
      refetch();
      toast.success("Product updated");
      navigate("/admin/productlist");
    } else {
      toast.error(result.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    console.log(formData);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      console.log(err?.data?.message || err.error);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="p-4">
      <Link to={"/admin/productlist"}>
        <Button text="Go Back" onClick={null} />
      </Link>

      {loadingUpdate && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error?.data?.message || error.error}</Message>
      ) : (
        <div>
          <h1 className="text-2xl text-primary py-3">Edit Product</h1>
          <form className="grid text-primary text-xl" onSubmit={submitHandler}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-primary rounded-md p-2 focus:bg-blue-100/50 w-fit focus:w-1/2"
            />
            <label htmlFor="points">Points</label>
            <input
              type="number"
              id="points"
              placeholder="Enter Points"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-primary rounded-md p-2 focus:bg-blue-100/50 w-fit focus:w-1/2"
            />

            <label htmlFor="image">Image</label>
            <input
              type="text"
              id="image"
              placeholder="Enter image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="border border-primary rounded-md p-2 focus:bg-blue-100/50 w-fit focus:w-1/2"
            />
            <label htmlFor="imageFile">Choose file</label>
            <input
              type="file"
              id="imageFile"
              onChange={uploadFileHandler}
              className="border border-primary rounded-md p-2 focus:bg-blue-100/50 w-fit focus:w-1/2"
            />

            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              id="brand"
              placeholder="Enter brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="border border-primary rounded-md p-2 focus:bg-blue-100/50 w-fit focus:w-1/2"
            />
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-primary rounded-md p-2 focus:bg-blue-100/50 w-fit focus:w-1/2"
            />
            <label htmlFor="count">Count In Stock</label>
            <input
              type="text"
              id="count"
              placeholder="Enter Stock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              className="border border-primary rounded-md p-2 focus:bg-blue-100/50 w-fit focus:w-1/2"
            />
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-primary rounded-md p-2 focus:bg-blue-100/50 w-fit focus:w-1/2"
            />
            <Button
              text="Update"
              additionalClasses="my-2"
              type="submit"
              onClick={null}
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductEditScreen;
