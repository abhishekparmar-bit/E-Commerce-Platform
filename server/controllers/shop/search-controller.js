const Product = require("../../models/Product");

// 🔍 Search Products
const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.query;

    // if no keyword
    if (!keyword) {
      return res.status(400).json({
        success: false,
        message: "Keyword is required",
      });
    }

    // case-insensitive search
    const products = await Product.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { category: { $regex: keyword, $options: "i" } },
        { brand: { $regex: keyword, $options: "i" } },
      ],
    });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = { searchProducts };