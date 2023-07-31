'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserPending extends Model {
    static associate(models) {
      // define association here
      // state_ID
      UserPending.belongsTo(models.UserState, {
        foreignKey: 'state_id',
      });
    }
  }
  UserPending.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    state_id: DataTypes.INTEGER,
    observacion: DataTypes.STRING,
    rol: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserPending',
    timestamps: true,
  });
  return UserPending;
};