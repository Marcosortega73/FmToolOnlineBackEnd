const { httpError } = require("../helpers/handleError");
const UserPending = require("../models").UserPending;
const Manager = require("../models").Manager;
const administrador = require("../models").Administrador;
const UserState = require("../models").UserState;
const bcrypt = require("bcrypt");
const torneo = require("../models").Torneo;
const equipo = require("../models").Equipo;

const {
  generateToken,
  generateRefreshToken,
} = require("../utils/tokenManager.js");

const saltRounds = 10;

const registerPending = async (req, res) => {
  try {
    const { email, state, rol } = req.body;

    const existsUserPending = await UserPending.findOne({
      where: { email },
    });

    const userManager = await Manager.findOne({
      where: { email },
    });

    const userAdministrador = await administrador.findOne({
      where: { email },
    });

    if (existsUserPending) {
      await UserPending.update(
        {
          rol,
          state_id: state,
        },
        {
          where: { email },
        }
      );
      const stateSelect = await UserState.findOne({
        attributes: ["nombre"],
        where: { id: state },
      });

      console.log("AQYU VA ROLLLLLLLLLLLLLLLL", rol);

      if (rol === "MANAGER") {
        if (!userManager) {

          switch (stateSelect.nombre) {
            case "Trabajando":
              const { equipo_id } = req.body;
              console.log(",equipo_id", equipo_id);
              await Manager.create({
                email,
                password: existsUserPending.password,
                rol,
                state_id: state,
                equipo_id,
              });
              return res.status(200).json({
                message: "Manager registrado correctamente",
                status: 200,
              });

            case "En Paro":
              await Manager.create({
                email,
                password: existsUserPending.password,
                rol,
                state_id: state,
              });
              return res.status(200).json({
                message: "Manager En Paro registrado correctamente",
                status: 200,
              });
            default:
              return res.status(200).json({
                message: "Usuario no pudo crearse",
                status: 203,
              });
          }
        } else if (userManager) {
          console.log("=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> EDITTTT");
          switch (stateSelect.nombre) {
            case "Trabajando":
              const { equipo_id } = req.body;
              console.log("LLEGE A Trabajando EDIT");
              await Manager.update(
                {
                  state_id: state,
                  equipo_id,
                },
                {
                  where: { email },
                }
              );
              return res.status(200).json({
                message: "Manager actualizado correctamente",
                status: 200,
              });
            case "En Paro":
              await Manager.update(
                {
                  state_id: state,
                  equipo_id: null,
                },
                {
                  where: { email },
                }
              );
              return res.status(200).json({
                message: "Manager En Paro actualizado correctamente",
                status: 200,
              });
            case "Rechazado":
              await Manager.destroy({
                where: { email },
              });
              return res.status(200).json({
                message: "Manager eliminado  correctamente",
                status: 200,
              });

            default:
              await Manager.destroy({
                where: { email },
              });
              return res.status(200).json({
                message: "Manager quedo en estado pendiente de resolver",
                status: 200,
              });
          }
        }
      } else if (rol == "ADMIN") {
        // EN CASO DE QUE NO PUEDAN CONVIVIR LOS DOS ROLES PARA EL MISMO MAIL
        if (userManager) {
          await Manager.destroy({
            where: { email },
          });
        }

        if (!userAdministrador) {
          await administrador.create({
            email,
            password: existsUserPending.password,
            rol,
            state_id: state,
          });
          return res.status(200).json({
            message: "Administrador registrado correctamente",
            status: 200,
          });
        } else if (userAdministrador) {
          if (state === "Rechazado") {
            await administrador.destroy({
              where: { email },
            });
          } else {
            await administrador.update(
              {
                state_id: state,
              },
              {
                where: { email },
              }
            );

            return res.status(200).json({
              message: "Usuario Actualizado correctamente",
              status: 200,
            });
          }
        }
      } else if (rol == "USER") {
        if (userManager) {
          await Manager.destroy({
            where: { email },
          });
        }
        if (userAdministrador) {
          await administrador.destroy({
            where: { email },
          });
        }
        return res.status(200).json({
          message: "Usuario actualizado correctamente",
          status: 200,
        });
      } else {
        return res.status(500).json({
          message: "El usuario ya existe",
          status: 500,
        });
      }
    } else {
      // CREAMOS EL USER PENDING SI NO EXISTE
      const password = await bcrypt.hash(req.body.password, saltRounds);
      await UserPending.create({
        email,
        password,
      });

      return res.status(200).json({
        message: "Usuario registrado correctamente",
        status: 200,
      });
    }
  } catch (error) {
    httpError(res, error);
  }
};

const getItems = async (req, res) => {
  try {
    const userPending = await UserPending.findAll({
      attributes: ["id", "email", "state_id", "rol","observacion","createdAt"],
      include: [
        {
          model: UserState,
          attributes: ["id", "nombre", "color"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    return res.json({
      data: userPending,
      status: 200,
    });
  } catch (error) {
    httpError(res, error);
  }
};

//rechazarItems
const rechazarItems = async (req, res) => {
  try {
    const state = 3;
    const { id, email } = req.body;
    //update state to re  do
    await UserPending.update(
      {
        state_id: state,
        rol: "USER",
      },
      {
        where: { id },
      }
    );

    const userManager = await Manager.findOne({
      where: { email },
    });

    const userAdministrador = await administrador.findOne({
      where: { email },
    });

    if (userAdministrador) {
      await administrador.destroy({
        where: { email },
      });
    }
    if (userManager) {
      await Manager.destroy({
        where: { email },
      });
    }

    return res.status(200).json({
      message: "Usuario rechazado correctamente",
      status: 200,
    });
  } catch (error) {
    httpError(res, error);
  }
};

//filter Userpending
const filterUserpending = async (req, res) => {
  try {
    const { filter } = req.params;

    // MEJORAR CONSULTA
    const filterRol = await UserPending.findAll({
      attributes: ["id", "email", "state_id", "rol", "createdAt"],
      where: {
        rol: filter,
      },
      include: [
        {
          model: UserState,
          attributes: ["id", "nombre", "color"],
        },
      ],
    });
    console.log(filterRol);
    const filterState = await UserPending.findAll({
      attributes: ["id", "email", "state_id", "rol", "createdAt"],
      include: [
        {
          model: UserState,
          attributes: ["id", "nombre", "color"],
        },
      ],
      where: { state_id: filter },
    });

    if (filterState.length > 0) {
      return res.json({
        data: filterState,
        status: 200,
      });
    } else {
      return res.json({
        data: filterRol,
        status: 200,
      });
    }
  } catch (error) {
    httpError(res, error);
  }
};

const loginUsers = async (req, res) => {
  //este es el que funciona

  console.log("entro al login");

  try {
    const { email, password } = req.body;

    const userManager = await Manager.findOne({
      include: [
        { all: true },
        {
          model: equipo,
          include: [
            {
              model: torneo,
            },
          ],
        },
      ],

      where: { email },
    });

    const userAdministrador = await administrador.findOne({
      include: [{ all: true }],
      where: { email },
    });

    if (userAdministrador) {
      const validPasswordd = await bcrypt.compare(
        password,
        userAdministrador.password
      );
      if (!validPasswordd) {
        return res.status(400).json({
          mensaje: "Credenciales incorrectas /P",
        });
      }
      // generateRefreshToken(admin.id,res);
      const { token, expiresIn } = generateToken(userAdministrador.id);
      res.status(200).json({
        permissions: { token, expiresIn },
        data: {
          email: userAdministrador.email,
          rol: userAdministrador.rol,
          state: userAdministrador.Estado ? userAdministrador.Estado : null,
        },
      });
    } else if (userManager) {
      const validPasswordd = await bcrypt.compare(
        password,
        userManager.password
      );
      console.log(validPasswordd);
      if (!validPasswordd) {
        return res.status(400).json({
          mensaje: "Contraeña incorrectas /P",
        });
      }

      const { token, expiresIn } = generateToken(userManager.id);
      res.status(200).json({
        permissions: { token, expiresIn },
        data: {
          id: userManager.id,
          email: userManager.email,
          rol: userManager.rol,
          username: userManager.username ? userManager.username : null,
          nombre: userManager.nombre ? userManager.nombre : null,
          apellido: userManager.apellido ? userManager.apellido : null,
          nacimiento: userManager.nacimiento ? userManager.nacimiento : null,
          nacionalidad: userManager.Nacionalidad
            ? userManager.Nacionalidad
            : null,
          equipo: userManager.Equipo ? userManager.Equipo : null,
          estado: userManager.UserState ? userManager.UserState : null,
          equipoFavorito: userManager.equipoFavorito
            ? userManager.equipoFavorito
            : null,
          biografia: userManager.biografia ? userManager.biografia : null,
        },
      });
    } else {
      return res.status(500).json({
        message: "Credenciales incorrectas",
        status: 500,
      });
    }
  } catch (error) {
    httpError(res, error);
  }
};

const getDataUser = async (req, res) => {
  try {
    const admin = await administrador.findOne({
      include: [{ all: true }],
      where: { id: req.uid },
    });
    const manager = await Manager.findOne({
      include: [{ all: true }],
      where: { id: req.uid },
    });
    console.log("HOLA GENTE");
    if (admin) {
      return res.status(200).json({
        data: {
          id: userManager.id,
          email: admin.email,
          rol: admin.rol,
          nombre: admin.nombre ? admin.nombre : null,
          apellido: admin.apellido ? admin.apellido : null,
        },
      });
    } else if (manager) {
      return res.status(200).json({
        state: 200,
        data: {
          id: manager.id,
          email: manager.email,
          rol: manager.rol,
          username: manager.username ? manager.username : null,
          nombre: manager.nombre ? manager.nombre : null,
          apellido: manager.apellido ? manager.apellido : null,
          nacimiento: manager.nacimiento ? manager.nacimiento : null,
          nacionalidad: manager.Nacionalidad ? manager.Nacionalidad : null,
          equipo: manager.Equipo ? manager.Equipo : null,
          estado: manager.UserState ? manager.UserState : null,
          equipoFavorito: manager.equipoFavorito
            ? manager.equipoFavorito
            : null,
          biografia: manager.biografia ? manager.biografia : null,
        },
      });
    } else {
      return res.status(500).json({
        message: "No se encontro el usuario",
        status: 500,
      });
    }
  } catch (e) {
    httpError(res, e);
  }
};
module.exports = {
  registerPending,
  getItems,
  rechazarItems,
  filterUserpending,
  loginUsers,
  getDataUser,
};
