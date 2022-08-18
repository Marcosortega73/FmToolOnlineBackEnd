'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Nacionalidad extends Model {
    static associate(models) {
      // define association here
      Nacionalidad.hasMany(models.Equipo, {
        foreignKey: 'nacionalidad_id'
      }
    ); 
    Nacionalidad.hasMany(models.Jugador, {
      foreignKey: 'nacionalidad_id'
    });
    
    Nacionalidad.hasMany(models.Manager, {
      foreignKey: 'nacionalidad_id'
    })
    Nacionalidad.hasMany(models.Torneo, {
      foreignKey: 'nacionalidad_id'
    })
    //CONTINENTES
    Nacionalidad.belongsTo(models.Continente, {
      foreignKey: 'continente_id',
    })
    }
  }
  Nacionalidad.init({
    idFmrte: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    image_id: DataTypes.INTEGER,
    gentilicio: DataTypes.STRING,
    nombreCorto: DataTypes.STRING,
    continente_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Nacionalidad',
    tableName: 'nacionalidades',
    timestamps : false,
  });
  return Nacionalidad;
};