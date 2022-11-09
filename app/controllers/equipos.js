const sequelize = require("sequelize");

const { httpError } = require("../helpers/handleError");
const continente = require("../models").Continente;
const equipos = require("../models").Equipo;
const nacionalidad = require("../models").Nacionalidad;
const manager = require("../models").Manager;
const { Op } = require("sequelize");
const torneo = require("../models").Torneo;
const jugadores = require("../models").Jugador;

const getItems = async (req, res) => {
  try {
    const {
      pagina = 0,
      search = "",
      cantidadItems = 10,
      field = "nombre",
      order = "asc",
    } = req.query;

    const offset = pagina * cantidadItems;
    const limit = parseInt(cantidadItems);
    const searchString = `%${search}%`;
    console.log("LLEGANDO A querySort", field);

    const clubes = await equipos.findAll({
      include: [
        {
          model: nacionalidad,
        },
        {
          model: torneo,
        },
        {
          model:jugadores,
          attributtes:['id','nombre']
        }

      ],
    }); /* .then((data) => {
      //ordenar y paginar
      const querySort = data.sort((a, b) => {
        if (a[field] > b[field]) {
          return 1;
        }
        if (a[field] < b[field]) {
          return -1;
        }
        return 0;
      });
      const queryPaginate = querySort.slice(offset, offset + limit);
      return queryPaginate;
    });

    res.json({
      ok: true,
      clubes,
    }); */

    return res.json({ clubes });
  } catch (error) {
    httpError(res, error);
  }
};

const getItem = async (req, res) => {};

const createItems = async (req, res) => {
  try {
    const { id, nombre, nacionalidad, manager, torneo } = req.body;

    await equipos.create({
      id,
      nombre,
      nacionalidad_id: nacionalidad,
      torneo_id: torneo,
    });

    res.json({
      message: "Equipo creado correctamente",
      state: 200,
    });
  } catch (e) {
    httpError(res, e);
  }
};
const updateItems = async (req, res) => {
  try {
    const { id, nombre, nacionalidad, torneo } = req.body;

    const equipoSelect = await equipos.findOne({ where: { id } });

    if (!equipoSelect) {
      return res.json({
        message: "Equipo no encontrado",
        state: 404,
      });
    } else {
      equipos.update(
        {
          id,
          nombre,
          nacionalidad_id: nacionalidad,
          torneo_id: torneo,
        },
        { where: { id: id } }
      );

      res.json({
        message: "Equipo actualizado correctamente",
        status: 200,
      });
    }
  } catch (e) {
    httpError(res, e);
  }
};

const equiposxnacion = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("natiooooooooooooooooooooooooo", id);
    const {season_id=null} = req.query;

    if(!season_id){
      return res.json({
        message: "No se ha enviado la season_id",
        status: 404,
      });
    }

  if(season_id){

    const equiposByNation = await equipos
    .findAll({
      where: { nacionalidad_id: id },
      include: [
        {
          model: nacionalidad,
        },
        {
          model: torneo,
        },
      ],
      order: [["nombre", "ASC"]],
    /*   offset: 0,
      limit: 1000, */
    })
    .then((data) => {
      const clubes = data.filter((item) => {
        //filtrar equipos que no pertenezcan a un torneo o que pertenezcan a un torneo pero que no sean de la season actual
        if (item.Torneos.length == 0) {
          return item;
        }

        if (item.Torneos.length > 0) {
         
          const torneo = item.Torneos.filter((item) => {
            if (item.season_id !=  season_id ) {
              return item;
            }
            else if ( item.tipo_id !== 1 ) //enviar el tipo de torneo actual
            {
              return item;
            }
          });
          console.log("TORNEOOOOOOOOOOOOOOOOOOOOOO TORNEOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO x nacion",torneo);
          return torneo.length > 0 ? item : null;
        }
      });
      return clubes;
    });
    res.json({
      clubes: equiposByNation,
      status: 200,
    });
  }   

  } catch (e) {
    httpError(res, e);
  }
};

const deleteItems = async (req, res) => {
  try {
    const id = req.params.id;

    const equipoSelect = await equipos.findOne({ where: { id } });

    if (!equipoSelect) {
      return res.json({
        message: "Equipo no encontrado",
        state: 404,
      });
    } else {
      equipos.destroy({
        where: {
          id: id,
        },
      });

      res.json({
        message: "Equipo eliminado correctamente",
        status: 200,
      });
    }
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
  equiposxnacion,
};
