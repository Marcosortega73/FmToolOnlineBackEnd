'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class equipo_x_torneo extends Model {
    static associate(models) {
      // define association here

      equipo_x_torneo.belongsTo(models.Equipo, {
        foreignKey: 'equipo_id',
      });
      equipo_x_torneo.belongsTo(models.Torneo, {
        foreignKey: 'torneo_id',
      });
    }
  }

  equipo_x_torneo.init({
    equipo_id: DataTypes.BIGINT,
    torneo_id: DataTypes.INTEGER,
    grupo: DataTypes.STRING,
  }, {
    sequelize,
    timestamps : false,
    modelName: 'equipo_x_torneo',
  });
  return equipo_x_torneo;
};

//