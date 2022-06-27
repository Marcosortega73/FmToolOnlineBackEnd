const Sequelize = require("sequelize");
const { httpError } = require("../helpers/handleError");
const jugador = require("../models").Jugador;

const getItems = async (req, res) => {
  try {
    console.log("LLEGANDO A JUGADORES");
    const players = await jugador.findAll({ include: [{ all: true }] });
    return res.json({ players });
  } catch (error) {
    httpError(res, error);
  }
};

const getItem = async (req, res) => {};

const createItems = async (req, res) => {
  try {
    const { id, nombre, nacionalidad, club, altura, peso, ca, cp, valor } =
      req.body;
    await jugador.create({
      id: id,
      nombre,
      nacionalidad_id: nacionalidad,
      equipo_id: club,
      altura,
      peso,
      ca,
      cp,
      valor,
    });

    res.json({
      message: "Jugador creado correctamente",
      status: 200,
    });
  } catch (e) {
    httpError(res, e);
  }
};
const updateItems = (req, res) => {
  try {
    const { id, nombre, nacionalidad, club, altura, peso, ca, cp, valor } =
      req.body;


    jugador.update(
      {
        id: id,
        nombre,
        nacionalidad_id: nacionalidad,
        equipo_id: club,
        altura,
        peso,
        ca,
        cp,
        valor,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.json({
      message: "Jugador actualizado correctamente",
      status: 200,
    });
  } catch (e) {
    httpError(res, e);
  }
};
const deleteItems = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("ID JUGADOR", req.params.id);

    if (id) {
      const jugadorDelete = await jugador.findOne({
        where: {
          id: id,
        },
      });

      if (jugadorDelete) {
        await jugador.destroy({
          where: {
            id: id,
          },
        });
        res.json({
          message: "Jugador eliminado correctamente",
          status: 200,
        });
      }
    } else {
      res.json({
        message: "No se pudo eliminar el jugador",
        status: 500,
      });
    }
  } catch (e) {
    httpError(res, e);
  }
};

module.exports = { getItems, getItem, createItems, updateItems, deleteItems };
