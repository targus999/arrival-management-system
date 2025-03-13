const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Arrival = require("./arrival.model");

const Product = sequelize.define(
  "products",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    arrival_id: { type: DataTypes.INTEGER, references: { model: "arrivals", key: "id" }, onDelete: "CASCADE" },
    barcode: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    brand: { type: DataTypes.STRING },
    sku: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false, defaultValue: "Apparel", validate: { isIn: [["Apparel", "Footwear"]] } },
    size: { type: DataTypes.STRING},
    color: { type: DataTypes.STRING},
    style: { type: DataTypes.STRING },
    condition: { type: DataTypes.STRING, allowNull: false, defaultValue: "New", validate: { isIn: [["New", "Old"]] } },
    quantity: { type: DataTypes.INTEGER, defaultValue: 1, validate: { min: 1 } },
  },
  { tableName: "products", timestamps: true, underscored: true }
);

Arrival.hasMany(Product, { foreignKey: "arrival_id" });
Product.belongsTo(Arrival, { foreignKey: "arrival_id" });

module.exports = Product;
