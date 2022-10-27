"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Estadistica extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Estadistica.belongsToMany(models.Fixture, {
        through: "estadisticasbypartidos",
        foreignKey: "estadistica_id",
        timestamps: false,
      });

      Estadistica.belongsToMany(models.Torneo, {
        through: "estadisticasbypartidos",
        foreignKey: "estadistica_id",
        timestamps: false,
      });

      Estadistica.belongsToMany(models.Jugador, {
        through: "estadisticasbypartidos",
        foreignKey: "estadistica_id",
        timestamps: false,
      });
    }
  }
  Estadistica.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      nombre: DataTypes.STRING,
      descripcion: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Estadistica",
      timestamps: false,
    }
  );
  return Estadistica;
};
