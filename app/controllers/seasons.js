

const Sequelize = require("sequelize");
const { httpError } = require("../helpers/handleError");
const season = require("../models").Season;


const getItems = async (req, res) => {
  try{
    const seasons = await season.findAll(
    
    )
    return res.json({seasons, "status":200})

}catch(error){
 
    httpError(res, error)
}
}



const getItem = async (req, res) => {
};

const createItems = async (req, res) => {
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



};
const updateItems = (req, res) => {};
const deleteItems = (req, res) => {};

module.exports = { getItems, getItem, createItems, updateItems, deleteItems };

