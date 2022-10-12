const Sequelize = require("sequelize");
const { httpError } = require("../helpers/handleError");
const { generateToken } = require("../utils/tokenManager");
const manager = require("../models").Manager;
const { sendMail, config } = require("../utils/mailServices");
const bcrypt = require("bcrypt");


const jwt = require("jsonwebtoken");

const verifyMail = async (req, res) => {
  try {
    console.log("==============================================", req.uid);

    const managerCliente = await manager.findOne({ where: { id: req.uid } });

    if (!managerCliente) {
      return res.status(400).json({
        mensaje: "No existe el usuario",
      });
    } else {
      const { email } = managerCliente;
      console.log(email);
      const { token } = await generateToken(email);

      console.log(token);
      const bodyMail =
        "Para verificar su cuenta haga click en el siguiente enlace: <a href='http://localhost:3000/verifyMail/" +
        token +
        "'>Verificar</a>";
      console.log(bodyMail);
      const asunto = "Verificar cuenta";
      console.log(asunto);

      await sendMail(email, asunto, bodyMail);

      return res.status(200).json({
        mensaje: "Se ha enviado un correo para verificar su cuenta",
      });
    }
  } catch (error) {
    httpError(res, error);
  }
};

const getItem = async (req, res) => {};

const validateMail = async (req, res) => {
  const { codigo } = req.body;

  const payload = jwt.verify(codigo, process.env.SECRET);
  const email = payload.uid;

  console.log("DENTRO DEL TRY", email);

  const managerCliente = await manager.findOne({
    where: { id: req.uid, email },
  });

  if (!managerCliente) {
    return res.status(400).json({
      mensaje: "No existe el usuario",
    });
  } else {
    return res.status(200).json({
      mensaje: "Se encontro el usuario",
      success: true,
    });
  }
};
const updateEmail = async (req, res) => {
  try {
    const managerReq = {
      email: req.body.email,
      emailConfirm: req.body.emailConfirm,
    };
    const managerCliente = await manager.findOne({
      where: { id: req.uid },
      include: [{ all: true }],
    });

    if (!managerCliente) {
      return res.status(400).json({
        mensaje: "No existe el usuario",
      });
    } else {
      if (managerReq.email === managerReq.emailConfirm) {
        const existEmail = await manager.findOne({
          where: { email: managerReq.email },
        });

        if (existEmail) {
          return res.status(400).json({
            mensaje: "El email ya existe",
          });
        }

        const managerUpdate = await manager.update(
          { email: managerReq.email },
          { where: { id: req.uid } }
        );

        res.status(200).json({
          mensaje: "Se ha actualizado el email",
        });
      }
    }
  } catch (error) {
    httpError(res, error);
  }
};

const updateProfile = async (req, res) => {
  console.log(
    "HOLA BA========================================================================================",
    req.uid
  );

  try {
    const managerReq = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      nacimiento: req.body.nacimiento,
      nacionalidad_id: req.body.nacionalidad_id?.id,
      equipoFavorito: req.body.equipoFavorito,
      biografia: req.body.biografia,
    };

    const managerCliente = await manager.findOne({
      where: { id: req.uid },
      include: [{ all: true }],
    });

    console.log(managerCliente);

    if (!managerCliente) {
      return res.status(400).json({
        mensaje: "No existe el usuario",
      });
    } else {
      console.log("Entro al update", managerCliente.id);
      console.log("REQ MANAGER", managerReq);
      const managerUpdate = await manager.update(
        {
          nombre: managerReq.nombre,
          apellido: managerReq.apellido,
          nacionalidad_id: managerReq.nacionalidad_id,
          equipoFavorito: managerReq.equipoFavorito,
          biografia: managerReq.biografia,
          nacimiento: managerReq.nacimiento,
        },
        { where: { id: managerCliente.id } }
      );
      console.log("UPDATE", managerUpdate);

      res.status(200).json({
        mensaje: "Se ha actualizado el perfil",
        status: 200,
      });
    }
  } catch (error) {
    httpError(res, error);
  }
};

const updatePassword = async (req, res) => {
  try {
    const managerReq = {
      password: req.body.password,
      newPassword: req.body.newPassword,
      newPasswordConfirm: req.body.newPasswordConfirm,
    };

    const managerCliente = await manager.findOne({
      where: { id: req.uid },
    });

    if (!managerCliente) {
      return res.status(400).json({
        mensaje: "No existe el usuario",
      });
    } else {
      if (managerReq.newPassword === managerReq.newPasswordConfirm) {
        const password = await bcrypt.compare(
          managerReq.password,
          managerCliente.password
        );

        if (!password) {
          return res.status(401).json({
            mensaje: "La contraseña es incorrecta",
            
          });
        }

        const salt = bcrypt.genSaltSync();
        managerReq.newPassword = bcrypt.hashSync(managerReq.newPassword, salt);

        const managerUpdate = await manager.update(
          { password: managerReq.newPassword },

          { where: { id: req.uid } }
        );

        res.status(200).json({
          mensaje: "Se ha actualizado la contraseña",
          status:200

        });
      } else {
        return res.status(403).json({
          mensaje: "Las contraseñas no coinciden",
        });
      }
    }
  } catch (error) {
    httpError(res, error);
  }
};

//updateUsername
const updateUsername = async (req, res) => {
  try {
    const managerReq = {
      username: req.body.username,
      password: req.body.password,
    };


    const managerCliente = await manager.findOne({
      where: { id: req.uid },
    });
    console.log("MANAGER USERNAME",managerCliente)
    if (!managerCliente) {
      return res.status(400).json({
        mensaje: "No existe el usuario",
      });
    }
    const password = await bcrypt.compare(
      managerReq.password,
      managerCliente.password
    );

    if (!password) {
      return res.status(401).json({
        mensaje: "La contraseña es incorrecta",
      });
    }

    const existUsername = await manager.findOne({
      where: { username: managerReq.username },
    });

    if (existUsername) {
      return res.status(400).json({
        mensaje: "El username ya existe",
      });
    }

    const managerUpdate = await manager.update(
      { username: managerReq.username },
      { where: { id: req.uid } }
    );

    res.status(200).json({
      mensaje: "Se ha actualizado el username",
      
      status:200

    });
  } catch (error) {
    httpError(res, error);
  }
};

const deleteItems = (req, res) => {};

module.exports = {
  verifyMail,
  getItem,
  validateMail,
  updateEmail,
  updateProfile,
  deleteItems,
  updatePassword,
  updateUsername
};
