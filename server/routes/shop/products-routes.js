const express = require("express");

const {
  createProduct,
  getFilteredProducts,
  getProductDetails,
} = require("../../controllers/shop/product-controller");

const router = express.Router();

;
router.get("/get", getFilteredProducts);
router.get("/get/:id", getProductDetails);
router.post("/", createProduct);

module.exports = router;