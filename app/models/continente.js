'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Continente extends Model {
    static associate(models) {
      // define association here
      Continente.hasMany(models.Nacionalidad, {
        foreignKey: 'continente_id',
      });
    }
  }
  Continente.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Continente',
    tableName: 'continentes',
    timestamps : false,
  });
  return Continente;
};