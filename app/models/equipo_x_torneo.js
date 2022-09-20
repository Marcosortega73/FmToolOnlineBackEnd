'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class equipo_x_torneo extends Model {
    static associate(models) {
      // define association here
    }
  }

  equipo_x_torneo.init({
    equipo_id: DataTypes.BIGINT,
    torneo_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'equipo_x_torneo',
  });
  return equipo_x_torneo;
};

//