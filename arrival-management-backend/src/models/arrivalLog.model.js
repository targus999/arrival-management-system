const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Arrival = require("./arrival.model");

const ArrivalLog = sequelize.define(
  "arrivalLog",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    arrival_id: { type: DataTypes.INTEGER, references: { model: "arrivals", key: "id" }, onDelete: "CASCADE" },
    action: { type: DataTypes.STRING, allowNull: false, validate: { isIn: [["created", "updated", "started_processing", "continued_processing", "finished_processing"]] } },
    timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    details: { type: DataTypes.TEXT },
  },
  { tableName: "arrivallog", timestamps: true, underscored: true }
);

Arrival.hasMany(ArrivalLog, { foreignKey: "arrival_id" });
ArrivalLog.belongsTo(Arrival, { foreignKey: "arrival_id" });

module.exports = ArrivalLog;
