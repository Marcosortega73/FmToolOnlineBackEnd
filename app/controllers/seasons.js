const Sequelize = require("sequelize");
const { httpError } = require("../helpers/handleError");
const season = require("../models").Season;
const torneo = require("../models").Torneo;
const equipos = require("../models").Equipo;
const jugador = require("../models").Jugador;
const manager = require("../models").Manager;

const getItems = async (req, res) => {
  try {
    const seasons = await season.findAll({
      order: [["estado", "ASC"]],
      include: [
        {
          model: torneo,
          attributes: ["id"],
        },
      ],
    });
    return res.json({ seasons, status: 200 });
  } catch (error) {
    httpError(res, error);
  }
};

const getItem = async (req, res) => {};

const createItems = async (req, res) => {
  console.log(req.body);

  try {
    const { estado } = req.body;
    let estadoTemporada = "Jugada";
    if (estado) {
      estadoTemporada = "Actual";
      const seasons = await season.findAll({
        where: {
          estado: "Actual",
        },
      });
      if (seasons.length > 0) {
        await season.update(
          {
            estado: "Jugada",
          },
          {
            where: {
              estado: "Actual",
            },
          }
        );
      }
    }

    await season.create({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      fecha_inicio: req.body.fecha_inicio,
      fecha_fin: req.body.fecha_fin,
      estado: estadoTemporada,
    });
    return res.json({
      status: 200,
      message: "Tempora creada correctamente, Se paso como temporada actual",
    });
  } catch (error) {
    httpError(res, error);
  }
};
const updateItems = (req, res) => {};
const deleteItems = (req, res) => {};

const getJugadoresBySeason = async (req, res) => {
  try {
    const id = req.params.id;
    const jugadores = await season
      .findAll({
        where: {
          id: id,
        },

        include: [
          {
            model: torneo,
            include: [
              {
                model: equipos,
                attributes: ["id", "nombre_corto"],
                include: [
                  {
                    model: jugador,
                    attributes: ["id", "nombre"],
                  },
                ],
              },
            ],
          },
        ],
      })
      .then((season) => {
        console.log(season[0]);
        let jugadores = [];
        season[0]?.Torneos?.map((torneo) => {
          torneo.Equipos.forEach((equipo) => {
            equipo.Jugadors.forEach((jugador) => {
              if (!jugadores.find((j) => j.id === jugador.id)) {
                jugadores.push({
                  nombre: jugador.nombre,
                  id: jugador.id,
                  equipo: equipo.nombre_corto,
                });
              }
            });
          });
        });

        return jugadores;
      });

    return res.json({ jugadores });
  } catch (e) {
    httpError(res, e);
  }
};

const getManagerBySeason = async (req, res) => {
  try {
    const id = req.params.id;
    const managers = await season
      .findAll({
        where: {
          id: id,
        },

        include: [
          {
            model: torneo,
            include: [
              {
                model: equipos,
                attributes: ["id", "nombre_corto"],
                include: [
                  {
                    model: manager,
                    attributes: ["id", "nombre", "email"],
                  },
                ],
              },
            ],
          },
        ],
      })
      .then((season) => {
        let managers = [];
        console.log(season[0]);
        season[0]?.Torneos?.map((torneo) => {
          torneo.Equipos.forEach((equipo) => {
            if (equipo.Manager) {
              if (!managers.find((m) => m.id === manager.id)) {
                managers.push({
                  nombre: equipo.Manager.email,
                  id: equipo.Manager.id,
                  equipo: equipo.nombre_corto,
                });
              }
            }
          });
        });

        return managers;
      });

    return res.json({ managers });
  } catch (e) {
    httpError(res, e);
  }
};

const getEquiposBySeason = async (req, res) => {
  try {
    const id = req.params.id;
    const equiposSeason = await season
      .findAll({
        where: {
          id: id,
        },

        include: [
          {
            model: torneo,
            include: [
              {
                model: equipos,
                attributes: ["id", "nombre_corto"],
              },
            ],
          },
        ],
      })
      .then((season) => {
        let equipos = [];
        season[0]?.Torneos?.map((torneo) => {
          torneo.Equipos.forEach((equipo) => {
            if (!equipos.find((e) => e.id === equipo.id)) {
              equipos.push({
                nombre: equipo.nombre_corto,
                id: equipo.id,
              });
            }
          });
        });

        return equipos;
      });

    return res.json({ equiposSeason });
  } catch (e) {
    httpError(res, e);
  }
};

const cargarEstadisticas = async (req, res) => {
  try {
    const  estadisticas  = req.body;

    console.log("estadisticasasssssssssss", estadisticas);
    /*  jugador_mvp_id,equipo_mvp_id,manager_mvp_id,estado */
    const temporada = await season.findByPk(estadisticas.season_id);
    if (!temporada) {
      return res.json({ status: 404, message: "Temporada no encontrada" });
    }
    await season.update(
      {
        jugador_mvp_id: estadisticas.jugador_mvp_id,
        equipo_mvp_id: estadisticas.equipo_mvp_id,
        manager_mvp_id: estadisticas.manager_mvp_id,
        estado: estadisticas.estado && "Jugada",
      },
      {
        where: {
          id: estadisticas.season_id,
        },
      }
    );

    return res.json({ status: 200, message: "Estadisticas cargadas" });
  } catch (e) {
    httpError(res, e);
  }
};

module.exports = {
  getItems,
  getItem,
  createItems,
  updateItems,
  deleteItems,
  getJugadoresBySeason,
  getManagerBySeason,
  getEquiposBySeason,
  cargarEstadisticas,
};
