const Sequelize = require("sequelize");
const { httpError } = require("../helpers/handleError");
const continente = require("../models").Continente;


const getItems = async (req, res) => {
  try{
    const continents = await continente.findAll(
      {  }
    )
    return res.json({continents})

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
