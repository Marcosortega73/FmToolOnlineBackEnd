"use strict";
const { Sequelize, Op, Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        length: 50,
      },
      password: {
        type: DataTypes.STRING(64),
        // validate: {
        //   is: /^[a-z]+$/i,
        //   notEmpty: true,
        // },
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
      tableName: "users",
      classMethods: {},
    }
  );

  User.associate = function (models) {
    // definir relaciones
  };

  return User;
};
