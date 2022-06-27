'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Nacionalidad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Nacionalidad.hasMany(models.Equipo, {
        foreignKey: 'nacionalidad_id'
      }
    ); 
    Nacionalidad.hasMany(models.Jugador, {
      foreignKey: 'nacionalidad_id'
    });
    
    Nacionalidad.hasMany(models.manager, {
      foreignKey: 'nacionalidad_id'
    })
    Nacionalidad.hasMany(models.Torneo, {
      foreignKey: 'nacionalidad_id'
    })


    }
  }
  Nacionalidad.init({
    nombre: DataTypes.STRING,
    image_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Nacionalidad',
    timestamps : false,
  });
  return Nacionalidad;
};