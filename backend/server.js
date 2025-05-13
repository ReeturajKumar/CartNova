const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const connectDB = require("./config/db");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const cartRoute = require("./routes/cartRoute");
const checkoutRoute = require("./routes/checkOutRoute");
const orderRoute = require("./routes/orderRoute");
const uploadRoute = require("./routes/uploadRoute");
const subscribeRoute = require("./routes/subscriberRoute");
const adminRoute = require("./routes/adminRoute");
const adminproductRoute = require("./routes/productAdminRoute");
const adminOrderRoute = require("./routes/adminOrderRoute");
const chatRoute = require("./routes/chatRoute");

dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

connectDB();


app.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// API Routes
app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/cart", cartRoute);
app.use("/checkout", checkoutRoute);
app.use("/orders", orderRoute);
app.use("/upload", uploadRoute);
app.use("/subscribe", subscribeRoute);
app.use('/chat', chatRoute);



// Admin Routes
app.use("/admin/users", adminRoute);
app.use("/admin/products", adminproductRoute);
app.use("/admin/orders", adminOrderRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});