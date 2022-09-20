'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Equipo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     
  /*   Equipo.belongsToMany(models.Torneo, {
      through: 'equipo_x_toreno',
      foreignKey: 'equipo_id',
    }); */
      Equipo.hasMany(models.Jugador, {
        foreignKey: 'equipo_id',
      });
      Equipo.belongsTo(models.Nacionalidad, {
        foreignKey: 'nacionalidad_id',
      });
      //relacion ocn manager 1 a 1
      Equipo.hasOne(models.Manager, {
        foreignKey: 'equipo_id',
      });
      //relacion con season 1 a 1
      Equipo.hasOne(models.Season, {
        foreignKey: 'equipo_campeon_id',
      });

 

      //equipo mvp
      Equipo.hasOne(models.Season, {
        foreignKey: 'equipo_mvp_id',
      });

    }
  }
  Equipo.init({
    idFmrte: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    nacionalidad_id: DataTypes.INTEGER,
  /*   torneo_id: DataTypes.INTEGER, */
  }, {
    sequelize,
    modelName: 'Equipo',
    timestamps : false,
  });
  return Equipo;
};