const Product = require("../../models/Product");

// � Create Product
const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      category,
      brand,
      image,
      totalStock,
    } = req.body;

    // Validate required fields
    if (!title || !price) {
      return res.status(400).json({
        success: false,
        message: "Title and price are required",
      });
    }

    // Create new product
    const product = new Product({
      title,
      description,
      price: Number(price),
      category,
      brand,
      image,
      stock: totalStock ? Number(totalStock) : 0,
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error creating product",
    });
  }
};

// �🏪 Get Filtered Products
const getFilteredProducts = async (req, res) => {
  try {
    const { category, brand, sortBy, page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    let filter = {};

    if (category) {
      filter.category = category;
    }

    if (brand) {
      filter.brand = brand;
    }

    let sortOption = {};
    if (sortBy === "price-low") {
      sortOption.price = 1;
    } else if (sortBy === "price-high") {
      sortOption.price = -1;
    } else if (sortBy === "newest") {
      sortOption.createdAt = -1;
    }

    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    const totalProducts = await Product.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limitNum),
      currentPage: pageNum,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error fetching products",
    });
  }
};

// 📋 Get Product Details
const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error fetching product details",
    });
  }
};

module.exports = { createProduct, getFilteredProducts, getProductDetails };