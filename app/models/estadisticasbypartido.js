'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EstadisticasByPartido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EstadisticasByPartido.belongsTo(models.Fixture, {
        foreignKey: 'partido_id',
      });

      EstadisticasByPartido.belongsTo(models.Estadistica, {
        foreignKey: 'estadistica_id',
      });

      //torneo_id

      EstadisticasByPartido.belongsTo(models.Torneo, {
        foreignKey: 'torneo_id',
      });

      //jugador_id

      EstadisticasByPartido.belongsTo(models.Jugador, {
        foreignKey: 'jugador_id',
      });


      


    }
  }
  EstadisticasByPartido.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    partido_id: DataTypes.INTEGER,
    estadistica_id: DataTypes.INTEGER,
    jugador_id: DataTypes.BIGINT,
    torneo_id: DataTypes.BIGINT,
    cantidad: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'EstadisticasByPartido',
    timestamps : false,
    tableName: 'estadisticasbypartidos'
  });
  return EstadisticasByPartido;
};