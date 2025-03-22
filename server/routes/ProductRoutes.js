import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleWare.js";
import {
  createOrder,
  createProductController,
  deleteController,
  getProductController,
  getSingleProductController,
  ProductCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  UpdateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

// Create Product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// Update Product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  UpdateProductController
);

// Get All Products
router.get("/get-product", getProductController);

// Get Single Product
router.get("/get-product/:slug", getSingleProductController);

// Get Product Photo
router.get("/product-photo/:pid", productPhotoController);

// Delete Product
router.delete("/delete-product/:pid", deleteController);

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", ProductCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product4
router.get("/search/:keyword", searchProductController);

//similar products
router.get("/related-product/:pid/:cid", relatedProductController);

router.post("/create-order", requireSignIn, createOrder);

export default router;
