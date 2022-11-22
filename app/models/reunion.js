'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reunion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Reunion.init({
    fecha: DataTypes.DATE,
    hora: DataTypes.TIME,
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    telefono: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Reunion',
    timestamps: false,
  });
  return Reunion;
};