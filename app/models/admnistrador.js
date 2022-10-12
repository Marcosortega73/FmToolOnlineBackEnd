
//MODEL ADMIN INIT
"use strict";
const bcrypt = require("bcrypt");

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class Administrador extends Model
  {
    static associate(models) {
      // definir relaciones
      Administrador.belongsTo(models.UserState, {
        foreignKey: 'state_id',
      });
    }
  }

  Administrador.init({
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
      type: DataTypes.TEXT
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'ADMIN',
    },
    state_id: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Administrador',
    tableName: "administradores",
  });
  return Administrador;
}





