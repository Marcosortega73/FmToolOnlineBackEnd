const Sequelize = require("sequelize");
const { httpError } = require("../helpers/handleError");
const manager = require("../models").Manager;
const equipos = require("../models").Equipo;
const userstate = require("../models").UserState;
const nacionalidad = require("../models").Nacionalidad;
//encriptar password
const bcrypt = require("bcrypt");
const generateToken = require("../utils/tokenManager");
const saltRounds = 10;


const getItems = async (req, res) => {
  try {
    const managers = await manager.findAll({
      attributes: ["id", "email", "username"],
    });
    return res.json({
      data: managers,
    });
  } catch (error) {
    httpError(res, error);
  }
};

const getItem = async (res, reqPasword, paswword) => {
  try {
    //Validar Password
    const validPasswordd = await bcrypt.compare(reqPasword, paswword);
    if (!validPasswordd) {
      return res.status(400).json({
        mensaje: "Credenciales incorrectas /P",
      });
    } else {
      // generateRefreshToken(userManager.id,res);
      const { token, expiresIn } = generateToken(userManager.id);
      res.status(200).json({
        token,
        expiresIn,
      });
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

    const { equipo_id } = req.body;

    if (managerReq.email !== undefined) {
      const existsmanager = await manager.findOne({
        where: { email: managerReq.email },
      });
      const existsequipo = await equipos.findOne({
        where: { id: equipo_id },
      });

      if (!existsmanager) {
        await manager
          .create(managerReq)
          .then((userManager) => {
            console.log(userManager);
            if (existsequipo) {
              equipos.update(
                {
                  manager_id: userManager.id,
                },
                { where: { id: equipo_id } }
              );
            }
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

const getUserManager = async (req, res) => {
  try {
    const userManager = await manager.findOne({ where: { id: req.uid } });

    if (!admin) {
      throw new Error("No Existe El Usuario");
    } else {
      const { email, rol, state } = userManager;
      res.json({ email, rol, state });
    }
  } catch (e) {
    httpError(res, e);
  }
};

const getManagers = async (req, res) => {
  try {
    const managers = await manager.findAll({
      attributes: { exclude: ["password"] },
      include: [
        {
          model: equipos,
        },
        {
          model: userstate
        },
        {
          model: nacionalidad
        },


        
      ],
    });
    return res.json({
      data: managers,
      status: 201,
    });
  } catch (error) {
    httpError(res, error);
  }
};

const updateItems = (req, res) => {};
const deleteItems = (req, res) => {};

module.exports = {
  getItems,
  getItem,
  createItems,
  updateItems,
  deleteItems,
  getUserManager,
  getManagers,
};
