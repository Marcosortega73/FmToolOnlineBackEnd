'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class equipo_x_torneo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  equipo_x_torneo.init({
    equipo_id: DataTypes.INTEGER,
    torneo_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'equipo_x_torneo',
  });
  return equipo_x_torneo;
};