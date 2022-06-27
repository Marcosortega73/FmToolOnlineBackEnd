'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jugador extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Jugador.belongsTo(models.Equipo, {
        foreignKey: 'equipo_id',
      }); 
      Jugador.belongsTo(models.Nacionalidad, {
        foreignKey: 'nacionalidad_id',
      });

    }
  }
  Jugador.init({
    nombre: DataTypes.STRING,
    nacionalidad_id: DataTypes.INTEGER,
    equipo_id: DataTypes.INTEGER,
    altura: DataTypes.STRING,
    peso: DataTypes.STRING,
    ca: DataTypes.INTEGER,
    cp: DataTypes.INTEGER,
    valor: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Jugador',
    timestamps : false,
  });
  return Jugador;
};




// nombre: DataTypes.STRING,
// nacionalidad: DataTypes.STRING,
// club: DataTypes.STRING,
// altura: DataTypes.STRING,
// peso: DataTypes.STRING,
// ca: DataTypes.INTEGER,
// cp: DataTypes.INTEGER,
// valor: DataTypes.INTEGER
