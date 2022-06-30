"use strict";
const bcrypt = require("bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Manager = sequelize.define(
    "manager",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
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
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "managers",
      hooks: {
        beforeCreate: async (manager) => {
          if (manager.password) {
            const salt = await bcrypt.genSaltSync(10, "a");
            manager.password = await bcrypt.hashSync(manager.password, salt);
          }
        },
        beforeUpdate: async (manager) => {
          if (manager.password) {
            const salt = await bcrypt.genSaltSync(10, "a");
            manager.password = await bcrypt.hashSync(manager.password, salt);
          }
        },
      },

      instanceMethods: {
        validPassword: (password) => {
          return bcrypt.compareSync(password, this.password);
        },
      },
    }
  );

  Manager.validPassword = (password) => {
    return bcrypt.compareSync(password, this.password);
  };

  Manager.associate = function (models) {
    // definir relaciones
    Manager.hasOne(models.Equipo,
        {
            foreignKey: 'manager_id',
          }  );
          
    Manager.belongsTo(models.Nacionalidad,
      {
        foreignKey: 'nacionalidad_id',
      }
    )
  };

  return Manager;
};
