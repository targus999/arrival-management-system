const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Arrival = require("./arrival.model");

const Product = sequelize.define(
  "products",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    arrival_id: { type: DataTypes.INTEGER, references: { model: "arrivals", key: "id" }, onDelete: "CASCADE" },
    barcode: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING, allowNull: false },
    brand: { type: DataTypes.STRING },
    category: { type: DataTypes.STRING, allowNull: false },
    size: { type: DataTypes.STRING },
    color: { type: DataTypes.STRING },
    style: { type: DataTypes.STRING },
    condition: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, defaultValue: 1, validate: { min: 1 } },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { tableName: "products", timestamps: true, underscored: true }
);

Arrival.hasMany(Product, { foreignKey: "arrival_id" });
Product.belongsTo(Arrival, { foreignKey: "arrival_id" });

module.exports = Product;
