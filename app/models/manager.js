
//model Manager.init
'use strict';
const bcrypt = require('bcrypt');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class Manager extends Model {
    static associate(models) {
      // define association here
      Manager.belongsTo(models.Equipo, {
        foreignKey: 'equipo_id',
      });
      Manager.belongsTo(models.Nacionalidad, {
        foreignKey: 'nacionalidad_id',
      });
      Manager.belongsTo(models.UserState, {
        foreignKey: 'state_id',
      });
      Manager.hasMany(models.Season, {
        foreignKey: 'manager_campeon_id',
      });
    }
  }

  Manager.init({
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      // validate: {
      //   is: /^[a-z]+$/i,
      //   notEmpty: true,
      // },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    equipo_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    state_id : {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'MANAGER',
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nacimiento: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    nacionalidad_id: {
      type: DataTypes.INTEGER,
      allowNull : true,
    },
    equipoFavorito: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    biografia: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, 

  {
    sequelize,
    modelName: 'Manager',
    timestamps: false,
  });
  return Manager;
}
