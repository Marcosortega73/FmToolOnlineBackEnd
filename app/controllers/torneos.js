const Sequelize = require("sequelize");
const { httpError } = require("../helpers/handleError");
const fixture = require("../models").Fixture;
const clasificacion = require("../models").Clasificacion;
const equipo = require("../models").Equipo;
const torneo = require("../models").Torneo;
const tipos = require("../models").TipoTorneo;
const continente = require("../models").Continente;
const equipo_x_torneo = require("../models").equipo_x_torneo;
//continente

const getItems = async (req, res) => {
  try {
    const torneos = await torneo.findAll({
      include: [
        {
          model: continente,
        },
        {
          model: equipo,
          include: [
            {
              all: true,
            },
          ],
        },
     /*    {
          model: fixture,
          include: [
            {
              all: true,
            },
          ],
        }, */

      ],
    });

    return res.json({ torneos, status: 200 });
  } catch (error) {
    httpError(res, error);
  }
};

const getItemById = async (req, res) => {
  try {
    const getTorneo = await torneo.findOne({
      where: { id: req.params.id },
      include: [{ all: true }],
    });
    return res.json({ getTorneo, status: 200 });
  } catch (error) {
    httpError(res, error);
  }
};

const getTiposTorneos = async (req, res) => {
  console.log("=======================================>");
  try {
    const tiposTorneos = await tipos.findAll({});
    return res.json({ tiposTorneos, status: 200 });
  } catch (error) {
    httpError(res, error);
  }
};

/* const createFixture = async (req, res) => {
  try {
    const { id } = req.params;
    const { equipos } = req.body;
    const torneo = await torneo.findOne({
      where: {
        id,
      },
    });
    if (!torneo) {
      return res.json({ message: "Torneo no encontrado", status: 404 });
    }
    return res.json({ fixture, status: 200 });
  } catch (error) {
    httpError(res, error);
  }
}; */

const createEquiposByTorneo = async (req, res) => {
  console.log("=======================================>");
  //Sorteo de grupos
  const { equipos, torneo_id } = req.body;
  console.log(equipos);
  console.log(torneo_id);
  try {
    const torneoSelect = await torneo.findOne({ where: { id: torneo_id } });
    if (!torneoSelect) {
      return res.json({
        message: "Torneo no encontrado",
        state: 404,
      });
    } else {
      //asignar grupo aleatoreo

      let alphabet = "abcdefghijklmnopqrstuvwxyz";
      let grupos = [];
      for (let i = 0; i < torneoSelect.total_grupos; i++) {
        grupos.push(alphabet[i].toUpperCase());
      }
      console.log(grupos);
      let gruposRandom = [];

      while (gruposRandom.length < torneoSelect.total_de_equipos) {
        let grupo = grupos[Math.floor(Math.random() * grupos.length)];
        let equiposByGrupo = gruposRandom.filter((equipo) => equipo == grupo);
        if (equiposByGrupo.length < torneoSelect.total_equipos_grupos) {
          gruposRandom.push(grupo);
        }
      }
      console.log(gruposRandom);
      //asignar grupo aleatoreo
      equipos.forEach(async (equipo, index) => {
        await equipo_x_torneo.create({
          equipo_id: equipo?.id,
          torneo_id: torneo_id,
          grupo: gruposRandom[index],
        });
      });
      return res.json({
        message: "Equipos asignados correctamente",
        state: 200,
      });
    }
  } catch (e) {
    httpError(res, e);
  }
};

const createItems = async (req, res) => {
  console.log(req.body);

  var totalEquipos = parseInt(req.body.total_de_equipos, 10);
  var totalGrupos = parseInt(req.body.total_grupos, 10);

  const totalEquiposByGrupo = totalEquipos / totalGrupos;

  if (totalEquipos % totalGrupos != 0) {
    console.log(
      "NO ES MULTIPLO",
      parseInt(req.body.total_de_equipos) % parseInt(req.body.total_de_grupos)
    );
    return res
      .json({
        status: 400,
        message: "El total de equipos no es divisible entre el total de grupos",
      })
      .status(400);
  }
  //numeros impares
  try {
    const torneoActual = await torneo.create({
      nombre: req.body.nombre,
      season_id: req.body.season_id,
      tipo_id: req.body.tipo_id,
      region_id: req.body.region_id,
      total_de_equipos: req.body.total_de_equipos,
      total_grupos: req.body.total_grupos,
      total_equipos_grupos: totalEquiposByGrupo,
      rondas: req.body.rondas,
    });
    const findTorneo = await torneo.findOne({
      where: { id: torneoActual.id },
      include: [
        {
          model: continente,
        },
      ],
    });

    //npx sequelize-cli model:generate --name Fixture--attributes num_fecha:string, equipo_local:string , equipo_visitante:string, goles_local:integer, goles_visitante:integer, torneo_id:integer,fecha_desde:date,fecha_hasta:date
    return res
      .json({
        status: 200,
        torneo: findTorneo,
        message: "Torneo creado correctamente",
      })
      .status(200);
  } catch (error) {
    httpError(res, error);
  }
};
const updateItems = (req, res) => {};
const deleteItems = (req, res) => {};

module.exports = {
  getItems,
  getItemById,
  createItems,
  updateItems,
  deleteItems,
  getTiposTorneos,
  createEquiposByTorneo,
};
