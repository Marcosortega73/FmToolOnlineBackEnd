'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Season extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //EQUIPO
      Season.belongsTo(models.Equipo, {
        foreignKey: 'equipo_campeon_id',
      });

      //equipo mvp
      Season.belongsTo(models.Equipo, {
        foreignKey: 'equipo_mvp_id',
      });

      //TORNEO
      Season.hasMany(models.Torneo, {
        foreignKey: 'season_id',
      });


      //jugador
      Season.belongsTo(models.Jugador, {
        foreignKey: 'jugador_mvp_id',
      });

      //jugador goleador
      Season.belongsTo(models.Jugador, {
        foreignKey: 'jugador_goleador_id',
      });

      //jugador asistente
      Season.belongsTo(models.Jugador, {
        foreignKey: 'jugador_asistente_id',
      });

      //entrenador_mvp_id
      Season.belongsTo(models.Manager, {
        foreignKey: 'manager_campeon_id',
      });


      
    }
  }
  Season.init({

    nombre: DataTypes.STRING,
    fecha_inicio: DataTypes.DATE,
    fecha_fin: DataTypes.DATE,
    equipo_campeon_id: DataTypes.BIGINT,
    manager_campeon_id: DataTypes.UUID,
    jugador_mvp_id: DataTypes.BIGINT,
    jugador_goleador_id: DataTypes.BIGINT,
    jugador_asistente_id: DataTypes.BIGINT,
    equipo_mvp_id: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'Season',
  });
  return Season;
};