const Sequelize = require("sequelize");
const { httpError } = require("../helpers/handleError");
const nacionalidad = require("../models").Nacionalidad;


const getItems = async (req, res) => {
  try{
    const nations = await nacionalidad.findAll(
      {  }
    )
    return res.json({nations})

}catch(error){
 
    httpError(res, error)
}
}



const getItem = async (req, res) => {
};

const createItems = async (req, res) => {
};
const updateItems = (req, res) => {};
const deleteItems = (req, res) => {};

module.exports = { getItems, getItem, createItems, updateItems, deleteItems };
