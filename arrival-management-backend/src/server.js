require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const arrivalsRoutes = require("./routes/arrival.route");
const supplierRoutes = require("./routes/supplier.route");
const productRoutes = require("./routes/product.route");
app.use("/arrival", arrivalsRoutes);
app.use("/supplier", supplierRoutes);
app.use("/product", productRoutes);
// app.use("/", (req, res) => {
//   res.send("Welcome to Arrival Management API");
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
