const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Supplier = require("./supplier.model");

const Arrival = sequelize.define(
  "arrivals",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    arrival_number: { type: DataTypes.STRING, allowNull: false, unique: true },
    supplier_id: { type: DataTypes.INTEGER, references: { model: "suppliers", key: "id" }, onDelete: "SET NULL" },
    expected_arrival_date: { type: DataTypes.DATEONLY, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    total_pallets: { type: DataTypes.INTEGER, allowNull: true},
    total_boxes: { type: DataTypes.INTEGER, allowNull: true},
    total_pieces: { type: DataTypes.INTEGER, allowNull: true},
    total_weight: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    actual_received_pallets: { type: DataTypes.INTEGER, allowNull: true, validate: { min: 0 } },
    actual_received_boxes: { type: DataTypes.INTEGER, allowNull: true, validate: { min: 0 } },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: "upcoming", validate: { isIn: [["upcoming", "processing", "finished"]] } },
    finished_at: { type: DataTypes.DATE, allowNull: true },
  },
  { tableName: "arrivals", timestamps: true, underscored: true }
);

Supplier.hasMany(Arrival, { foreignKey: "supplier_id" });
Arrival.belongsTo(Supplier, { foreignKey: "supplier_id" });

module.exports = Arrival;
