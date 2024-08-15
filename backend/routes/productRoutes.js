import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

const router = express.Router();

router.route("/").get(protect, getProducts).post(protect, admin, createProduct);
router
  .route("/:id")
  .get(protect, getProductById)
  .put(protect, admin, checkObjectId, updateProduct);

export default router;
