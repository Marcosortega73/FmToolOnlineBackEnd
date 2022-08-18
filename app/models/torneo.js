'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Torneo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Torneo.belongsToMany(models.Equipo, {
        through: 'equipo_x_toreno',
        foreignKey: 'torneo_id',
      });
      Torneo.belongsTo(models.Nacionalidad, {
        foreignKey: 'nacionalidad_id',
      });
    }

     
  }
  //TIPO ES UNA TABLA AL IGUAL  TEMPORADA, TOTAL  GRUPOS ES ATRIBUTO DE LA TABLA TIPO
  Torneo.init({
    idFmrte: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    tipo: DataTypes.STRING,
    nacionalidad_id: DataTypes.INTEGER,
    total_de_equipos: DataTypes.INTEGER,
    total_grupos: DataTypes.INTEGER,
    temporada: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Torneo',
    timestamps : false,
  });
  return Torneo;
};