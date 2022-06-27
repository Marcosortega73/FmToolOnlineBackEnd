const Sequelize = require("sequelize");
const { httpError } = require("../helpers/handleError");
const manager = require("../models").manager;

//encriptar password
const bcrypt = require("bcrypt");
const generateToken = require("../utils/tokenManager");
const saltRounds = 10;



const getItem = async (req, res) => {

  try {
    const { email } = req.body;

    const userManager = await manager.findOne({
      where: { email: email },
    });
console.log("=====>",userManager);
    if(!userManager) {
      return res.status(400).json({
        mensaje: "Usuario no encontrado",
      });
    }

    //Generar token
    
    if (userManager) {
      const validPasswordd = await bcrypt.compare(
        req.body.password,
        userManager.password
      );
      if(!validPasswordd) {
      const {token,expiresIn} =  generateToken(userManager.id);

      res.json({
        token,
        expiresIn
        
      });
      }
    } else {
      throw new Error("No se encontro el manager");
    }
  } catch (e) {
    httpError(res, e);
  }


};


const createItems = async (req, res) => {

    
  try {
    const managerReq = {
      email: req.body.email,
      password: req.body.password,
    };

    if (managerReq.email !== undefined ) {

      const existsmanager = await manager.findOne({

        where: { email: managerReq.email },

      });

      if (!existsmanager) {

        await manager
          .create(managerReq)
          .then((userManager) => {
            console.log(userManager);
            res.json({
              manager: managerReq,
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

module.exports = { getItem, createItems, updateItems, deleteItems };
