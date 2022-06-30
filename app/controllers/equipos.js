const Sequelize = require("sequelize");
const { httpError } = require("../helpers/handleError");
const equipos = require("../models").Equipo;
const nacionalidad = require("../models").Nacionalidad;


const getItems = async (req, res) => {
  try{

    const clubes = await equipos.findAll(
      { include : [{
        model:nacionalidad,
      }] }
    )
    return res.json({clubes})

}catch(error){
 
    httpError(res, error)
}
}



const getItem = async (req, res) => {

};

const createItems = async (req, res) => {
  try {
    const {id,nombre, nacionalidad, manager , torneo} = req.body

 

   await equipos.create({
      id,
      nombre,
      nacionalidad_id:nacionalidad,
      manager_id:manager,
      torneo_id:torneo,
    });

    res.json({
      message: "Equipo creado correctamente",
      state:200
    });

  } catch (e) {
    httpError(res, e);
  }
};
const updateItems = async (req, res) => {

  try {
    const {id,nombre, nacionalidad, manager , torneo} = req.body

    const equipoSelect = await equipos.findOne({where: {id}})

    if(!equipoSelect){
      return res.json({
        message: "Equipo no encontrado",
        state:404
      });
    }
    else {

    equipos.update(
      {
        id,
        nombre,
        nacionalidad_id:nacionalidad,
        manager_id:manager,
        torneo_id:torneo,
      },
      { where: { id: id } }
    );

    res.json({
      message: "Equipo actualizado correctamente",
      status:200
    });
    }

  } catch (e) {
    httpError(res, e);
  }




};
const deleteItems =async (req, res) => {

  try {
    const id = req.params.id

    const equipoSelect = await equipos.findOne({where: {id}})

    if(!equipoSelect){
      return res.json({
        message: "Equipo no encontrado",
        state:404
      });
    }
    else {

    equipos.destroy({
      where: {
        id: id,
      },
    });

    res.json({
      message: "Equipo eliminado correctamente",
      status:200
    });
    }

  } catch (e) {
    httpError(res, e);
  }

};

module.exports = { getItems, getItem, createItems, updateItems, deleteItems };
