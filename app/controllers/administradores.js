const Sequelize = require("sequelize");
const { httpError } = require("../helpers/handleError");
const administrador = require("../models").administrador;

//encriptar password
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const saltRounds = 10;

const getItems = (req, res) => {
  res.send({ list: [1, 2, 3, 4] });
};

const getItem = async (req, res) => {

  try {
    const { email } = req.body;

    const administrador = await administrador.findOne({
      where: { email: email },
    });

    if(!administrador) {
      return res.status(400).json({
        mensaje: "Usuario no encontrado",
      });
    }

    //Generar token

    

    if (administrador) {
      const {token,expiresIn} =  generateToken(administrador.id);

      res.json({
        administrador,
        token,
      });

    } else {
      throw new Error("No se encontro el administrador");
    }
  } catch (e) {
    httpError(res, e);
  }


};


const createItems = async (req, res) => {

    
  try {
    const administradorReq = {
      email: req.body.email,
      password: req.body.password,
    };

    if (administradorReq.email !== undefined ) {

      const existsadministrador = await administrador.findOne({

        where: { email: administradorReq.email },

      });

      if (!existsadministrador) {

        await administrador
          .create(administradorReq)
          .then((admin) => {
            console.log(admin);
            res.json({
              administrador: administradorReq,
              mensaje: "Usuario Creado Con Exito",
            });
          })

          .catch((e) => {
            {
              httpError(res, e);
            }
          });
      } else {
        throw new Error("Usuario ya registrado");
      }
    }
  } catch (e) {
    httpError(res, e);
  }
};
const updateItems = (req, res) => {};
const deleteItems = (req, res) => {};

module.exports = { getItems, getItem, createItems, updateItems, deleteItems };
