const Sequelize = require("sequelize");
const { httpError } = require("../helpers/handleError");
const jugador = require("../models").Jugador;
const equipo = require("../models").Equipo;
const XLSX = require("xlsx");

// Todo:Realizar controles de errores

const createJugadoresBase = async (req, res) => {
  const workbook = XLSX.readFile(req.file.path);
  const sheet_name_list = workbook.SheetNames;
  const worksheet = workbook.Sheets[sheet_name_list[0]];
  const data = XLSX.utils.sheet_to_json(worksheet);

  var jugadoresBase = await data.map((jugador) => {
    return {
      nombre: jugador.nombre,
      nacionalidad_id: jugador.nacionalidad_id,
      equipo_id: jugador.equipo_id ? jugador.equipo_id : null,
      altura: jugador.altura,
      peso: jugador.peso,
      ca: jugador.ca,
      cp: jugador.cp,
      valor: jugador.valor,
    };
  });

  try {
    const queryEquipos = await equipo.findAll({
      attributes: ["id", "nombre"],
    });

    if (queryEquipos.length > 0) {
      await queryEquipos.forEach(async (equipo) => {
        jugadoresBase.forEach(async (jugador) => {
          if (jugador.equipo_id == equipo.nombre) {
            jugador.equipo_id = equipo.id;
          }
        });
      });
    }
    if (jugadoresBase.length > 0) {
      await jugador.bulkCreate(jugadoresBase);
      res.json({
        message: "Jugadores Base creado correctamente",
        status: 200,
        jugadoresBase,
        file: req.file,
      });
    }
  } catch (e) {
    httpError(res, e);
  }
};

const createEquiposBase = async (req, res) => {
  const workbook = XLSX.readFile(req.file.path);
  const sheet_name_list = workbook.SheetNames;
  const worksheet = workbook.Sheets[sheet_name_list[0]];
  const data = XLSX.utils.sheet_to_json(worksheet);

  try {
    const equiposBase = await data.map((equipo) => {
      return {
        nombre: equipo.nombre,
        nacionalidad_id: equipo.nacionalidad_id,
        equipo_id: equipo.equipo_id,
        manager_id: equipo.manager_id ? equipo.manager_id : null,
        torneo_id: equipo.torneo_id ? equipo.torneo_id : null,
      };
    });

    if (equiposBase.length > 0) {
      await equipo.bulkCreate(equiposBase);
      res.json({
        message: "Equipos creados correctamente",
        status: 200,
        equiposBase,
        file: req.file,
      });
    }
  } catch (e) {
    httpError(res, e);
  }
};

module.exports = { createJugadoresBase, createEquiposBase };
