const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const connectDB = require("./config/db");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const cartRoute = require("./routes/cartRoute");

dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

connectDB();


app.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// API Routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/cart", cartRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});