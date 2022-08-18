const Sequelize = require("sequelize");
const { httpError } = require("../helpers/handleError");
const administrador = require("../models").Administrador;


const getItems = (req, res) => {
  try{

    const admin = administrador.findOne({where: {id:req.uid}})

    return res.json({admin})

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
