const Sequelize = require("sequelize");
const { httpError } = require("../helpers/handleError");
const nacionalidad = require("../models").Nacionalidad;
const equipos = require("../models").Equipo;
const torneo = require("../models").Torneo;

const { Op, where } = require("sequelize");

const getItems = async (req, res) => {
  try {
    const nations = await nacionalidad.findAll({});
    return res.json({ nations });
  } catch (error) {
    httpError(res, error);
  }
};

//getItemsbyRegion
const getItemsbyRegion = async (req, res) => {
  try {

    const {season} = req.query;

    const nations = await nacionalidad.findAll({
      
      where: { continente_id: req.params.id },
      include: [
        {
          all: true,
        },
      ],
    });

    //slect equipos join nacionalidades con equipos que no pertenezcan a un torneo

    await equipos
      .findAll({
        include: [
          {
            model: nacionalidad,
            where: { continente_id: req.params.id },
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
              if (item.season_id !=  season ) {
                return item;
              }
              else if ( item.tipo_id !== 1 )
              {
                return item;
              }
            });
            console.log("TORNEOOOOOOOOOOOOOOOOOOOOOO TORNEOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO",torneo);
            return torneo.length > 0 ? item : null;
          }
        });

        return res.json({ nations, clubes, torneo });
      });
  } catch (error) {
    httpError(res, error);
  }
};

const getItem = async (req, res) => {};

const createItems = async (req, res) => {};
const updateItems = (req, res) => {};
const deleteItems = (req, res) => {};

module.exports = {
  getItems,
  getItem,
  createItems,
  updateItems,
  deleteItems,
  getItemsbyRegion,
};
