const Sequelize = require("sequelize");
const { httpError } = require("../helpers/handleError");
const nacionalidad = require("../models").Nacionalidad;
const equipos = require("../models").Equipo;

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
    const nations = await nacionalidad.findAll({
      where: { continente_id: req.params.id },
      include: [
        {
          all: true,
        },
      ],
    });

    //slect equipos join nacionalidades con equipos
   const clubes = await equipos.findAll({
     include: [
        {  model: nacionalidad,
          where: { continente_id: req.params.id },
        },         
      ],
    });



    return res.json({ nations,status:200,clubes });
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
