require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const arrivalsRoutes = require("./routes/arrivalsRoutes");
app.use("/api/arrivals", arrivalsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
