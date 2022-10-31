const Sequelize = require("sequelize");
const { httpError } = require("../helpers/handleError");
const estadisticasbypartidoss = require("../models").EstadisticasByPartido;
const estadistica = require("../models").Estadistica;
const jugador = require("../models").Jugador;

const getItems = async (req, res) => {
  try {
    const estadisticas = await estadistica.findAll();
    return res.json({ estadisticas, status: 200 });
  } catch (error) {
    httpError(res, error);
  }
};

const getItem = async (req, res) => {};

/* const createItems = async (req, res) => {
  console.log(req.body)
   try{
    
  await season.create(
      { 
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        fecha_inicio: req.body.fecha_inicio,
        fecha_fin: req.body.fecha_fin,
      }
    ) 
    return res.json({"status":200, "message":"Tempora creada correctamente"})

}catch(error){
   
    httpError(res, error)

}





}; */

//obtener goleadores por torneo
const getGoleadoresByTorneo = async (req, res) => {
  try {
    const estadisticas = await estadisticasbypartidoss.findAll({
      where: { torneo_id: req.params.id },
      include: [
        {
          model: estadistica,
          where: { id: 1 },
        },
          {
            model: jugador,
          },
          
      ],
    });
    return res.json({ estadisticas, status: 200 });
  } catch (error) {
    httpError(res, error);
  }
};

//createItems
const createItems = async (req, res) => {
  try {
    const { jugadores } = req.body;

    console.log("jugadoreseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", jugadores);
    jugadores[0].forEach(async (jugador) => {
      await estadisticasbypartidoss.create({
      partido_id:jugador.partido_id,
      estadistica_id:jugador.estadistica_id,
      jugador_id:jugador.jugador.id,
      torneo_id:jugador.torneo_id,
      cantidad:jugador.cantidad,
    });
  });

    return res.json({ status: 200, message: "Estadisticas creadas correctamente" });
  } catch (error) {
    httpError(res, error);
  }
};


const updateItems = (req, res) => {};
const deleteItems = (req, res) => {};

module.exports = { getItems, getItem, updateItems, deleteItems,createItems,getGoleadoresByTorneo};
