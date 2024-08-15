import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc    FETCH ALL PRODUCTS
// @route   GET /api/products
// @acess   Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  if (products) {
    res.status(200);
    return res.json(products);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc    FETCH a PRODUCT
// @route   GET /api/products:id
// @acess   Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc    CREATE A PRODUCT
// @route   POST /api/products
// @acess   PRIVATE/ADMIN

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "SAMPLE NAME",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "SAMPLE BRAND",
    category: "SAMPLE CATEGORY",
    countInStock: 0,
    numReviews: 0,
    description: "SAMPLE DESCRIPTION",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @acess   PRIVATE/ADMIN
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(200);
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

export { getProducts, getProductById, createProduct, updateProduct };
