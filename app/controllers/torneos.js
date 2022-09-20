const Sequelize = require("sequelize");
const { httpError } = require("../helpers/handleError");
const torneo = require("../models").Torneo;
const tipos = require("../models").TipoTorneo;

const getItems = async (req, res) => {
  try {
    const torneos = await torneo.findAll({});
    return res.json({ torneos, status: 200 });
  } catch (error) {
    httpError(res, error);
  }
};

const getItem = async (req, res) => {};

const getTiposTorneos = async (req, res) => {
  console.log("=======================================>");
  try {
    const tiposTorneos = await tipos.findAll({});
    return res.json({ tiposTorneos, status: 200 });
  } catch (error) {
    httpError(res, error);
  }
};

const createItems = async (req, res) => {
  console.log(req.body);

  var totalEquipos = parseInt(req.body.total_de_equipos,10);
  var totalGrupos = parseInt(req.body.total_grupos,10);

  const totalEquiposByGrupo = totalEquipos / totalGrupos

  if ((totalEquipos % totalGrupos) != 0) {
    console.log("NO ES MULTIPLO",(parseInt(req.body.total_de_equipos) % parseInt(req.body.total_de_grupos)));
    return res.json({ status: 400, message: "El total de equipos no es divisible entre el total de grupos" });
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
    });
    return res.json({ status: 200,torneo:torneoActual, message: "Torneo creado correctamente" });
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
  getTiposTorneos,
};
