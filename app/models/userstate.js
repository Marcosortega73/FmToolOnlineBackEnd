'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserState extends Model {
    static associate(models) {
      // define association here
      UserState.hasMany(models.Manager, {
        foreignKey: 'state_id'
      });
      UserState.hasMany(models.UserPending, {
        foreignKey: 'state_id'
      });
      UserState.hasMany(models.Administrador, {
        foreignKey: 'state_id'
      });

    }
  }
  UserState.init({
    nombre: DataTypes.STRING,
    color: DataTypes.STRING,
    rol: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserState',
    timestamps: false,
  });
  return UserState;
};