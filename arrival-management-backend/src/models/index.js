const sequelize = require("../config/database");
const Supplier = require("./supplier.model");
const Arrival = require("./arrival.model");
const Product = require("./product.model");
const ArrivalLog = require("./arrivalLog.model");

const db = { sequelize, Supplier, Arrival, Product, ArrivalLog };

// Sync models with database
(async () => {
  try {
    await sequelize.sync({ alter: true }); // Use { force: true } for a clean DB reset
    console.log("Database synchronized.");
  } catch (error) {
    console.error("❌ Error syncing database:", error);
  }
})();

module.exports = db;
