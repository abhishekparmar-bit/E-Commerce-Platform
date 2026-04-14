require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// ✅ Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// ✅ Import Routes (SHOP)
const cartRoutes = require("./routes/shop/cart-routes");
const addressRoutes = require("./routes/shop/address-routes");
const orderRoutes = require("./routes/shop/order-routes");
const productRoutes = require("./routes/shop/products-routes");
const reviewRoutes = require("./routes/shop/review-routes");
const searchRoutes = require("./routes/shop/search-routes");

// ✅ Use Routes
app.use("/api/shop/cart", cartRoutes);
app.use("/api/shop/address", addressRoutes);
app.use("/api/shop/order", orderRoutes);
app.use("/api/shop/products", productRoutes);
app.use("/api/shop/review", reviewRoutes);
app.use("/api/shop/search", searchRoutes);


app.get("/", (req, res) => {
  res.send("API is running...");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected "))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} `);
});
