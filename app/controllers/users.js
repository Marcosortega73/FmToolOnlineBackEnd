const Sequelize = require("sequelize");
const { httpError } = require("../helpers/handleError");
const user = require("../models/").user;

//encriptar password
const bcrypt = require("bcrypt");
const saltRounds = 10;

const getItems = (req, res) => {
  res.send({ list: [1, 2, 3, 4] });
};

const getItem = async (req, res) => {};
const createItems = async (req, res) => {


    
  try {
    const userReq = {
      username: req.body.username,
      password: req.body.password,
    };
    if (userReq.username) {
      const existsUser = await user.findOne({
        where: { username: userReq.username },
      });
      if (!existsUser) {
        const hashPass = await bcrypt.hash(userReq.password, saltRounds)
        userReq.password = hashPass

        await user
          .create(userReq)
          .then((user) => {
            console.log(userReq);
            res.json({
              user: userReq,
              mensaje: "Usuario Creado Con Exito",
            });
          })

          .catch((e) => {
            {
              httpError(res, e);
            }
          });
      } else {
        throw new Error("Username ya registrado");
      }
    }
  } catch (e) {
    httpError(res, e);
  }
};
const updateItems = (req, res) => {};
const deleteItems = (req, res) => {};

module.exports = { getItems, getItem, createItems, updateItems, deleteItems };
