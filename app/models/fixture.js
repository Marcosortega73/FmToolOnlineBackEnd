"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Fixture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Fixture.belongsTo(models.Torneo, {
        foreignKey: "torneo_id",
      });
      Fixture.belongsTo(models.Equipo, {
        as: "local",
        foreignKey: "equipo_local",
      });
      Fixture.belongsTo(models.Equipo, {
        as: "visitante",
        foreignKey: "equipo_visitante",
      });
      Fixture.belongsToMany(models.Estadistica, {
        through: "estadisticasbypartidos",
        foreignKey: "partido_id",
        timestamps: false,
      });
    }
  }
  Fixture.init(
    {
      num_fecha: DataTypes.INTEGER,
      equipo_local: DataTypes.BIGINT,
      equipo_visitante: DataTypes.BIGINT,
      goles_local: DataTypes.INTEGER,
      goles_visitante: DataTypes.INTEGER,
      torneo_id: DataTypes.INTEGER,
      fecha_desde: DataTypes.DATE,
      fecha_hasta: DataTypes.DATE,
      estado: DataTypes.STRING,
      grupo: DataTypes.STRING,
      ganador: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Fixture",
      timestamps: false,
    }
  );
  return Fixture;
};
