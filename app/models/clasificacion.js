'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clasificacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Clasificacion.belongsTo(models.Equipo, {
        foreignKey: 'equipo_id',
      
      });
      Clasificacion.belongsTo(models.Torneo, {
        foreignKey: 'torneo_id',
      });


    }
  }
  Clasificacion.init({
    partidos_jugados: DataTypes.INTEGER,
    partidos_ganados: DataTypes.INTEGER,
    partidos_empatados: DataTypes.INTEGER,
    partidos_perdidos: DataTypes.INTEGER,
    goles_favor: DataTypes.INTEGER,
    goles_contra: DataTypes.INTEGER,
    diferencia_goles: DataTypes.INTEGER,
    puntos: DataTypes.INTEGER,
    equipo_id: DataTypes.INTEGER,
    torneo_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Clasificacion',
  });
  return Clasificacion;
};