"use strict";
const bcrypt = require("bcrypt");
const saltRounds = 10;
module.exports = (sequelize, DataTypes) => {
  const Administrador = sequelize.define(
    "administrador",
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
        length: 50,
      },
      password: {
        type: DataTypes.TEXT,
        // validate: {
        //   is: /^[a-z]+$/i,
        //   notEmpty: true,
        // },
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
      tableName: "administradores",
      hooks: {
        beforeCreate: async (administrador) => {
            if (administrador.password) {
                const salt = await bcrypt.genSaltSync(10, 'a');
                administrador.password = await bcrypt.hashSync(administrador.password, salt);
            }
        },
        beforeUpdate: async (administrador) => {
            if (administrador.password) {
                const salt = await bcrypt.genSaltSync(10, 'a');
                administrador.password = await bcrypt.hashSync(administrador.password, salt);
            }
        }
    },
    instanceMethods: {
        validPassword: (password) => {
            return bcrypt.compareSync(password, this.password);
        }
    
    }
    }
  );

  Administrador.validPassword = (password) => {
    return bcrypt.compareSync(password, this.password);
}
  Administrador.associate = function (models) {
    // definir relaciones
  };

  return Administrador;
};
