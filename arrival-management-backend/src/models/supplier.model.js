const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Supplier = sequelize.define(
  "suppliers",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    contact_info: { type: DataTypes.TEXT },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { tableName: "suppliers", timestamps: true, underscored: true }
);

module.exports = Supplier;
