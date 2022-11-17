const Sequelize = require("sequelize");
const { httpError } = require("../helpers/handleError");
const reuniones = require("../models").Reunion;
const { Op } = require("sequelize");

const getItemsByFecha = async (req, res) => {
  try {
    const { fecha } = req.body;
    const reunionesByFecha = await reuniones
      .findAll({
        where: {
          fecha: {
            [Op.eq]: fecha,
          },
        },
      })
      .then((reunionesByFecha) => {
        const turnosDisponibles = [
          { hora: "08:00:00" },
          { hora: "09:00:00" },
          { hora: "10:00:00" },
          { hora: "11:00:00" },
          { hora: "12:00:00" },
          { hora: "13:00:00" },
          { hora: "15:00:00" },
          { hora: "16:00:00" },
          { hora: "17:00:00" },
          { hora: "18:00:00" },
          { hora: "19:00:00" },
          { hora: "20:00:00" },
        ];

        const turnosOcupados = reunionesByFecha.map((reunion) => {
          return { hora: reunion.hora, ocupado: true };
        });
        const turnosLibres = turnosDisponibles.filter((turno) => {
          return !turnosOcupados.some((turnoOcupado) => {
            return turnoOcupado.hora === turno.hora;
          });
        });

        //juntar array libres con ocupados
        const turnos = turnosOcupados.concat(turnosLibres);

        //ordenar turnos por hora
        const turnosOrdenados = turnos.sort((a, b) => {
            return a.hora > b.hora ? 1 : -1;
        });

        return [
          {
            turnosOrdenados,
          },
        ];
      });
    return res.json({ reunionesByFecha });
  } catch (error) {
    httpError(res, error);
  }
};
const getItem = async (req, res) => {};
const createItems = async (req, res) => {
  try {
    const { fecha, hora, nombre, apellido, telefono, email } = req.body;
    const newReunion = await reuniones.create({
      fecha,
      hora,
      nombre,
      apellido,
      telefono,
    });
    return res.json({ status: 201, mensaje: "Reunion creada con exito" });
  } catch (error) {
    httpError(res, error);
  }

  //fecha de hoy tipo date
  //hora de hoy tipo time  00:00:00
};
const updateItems = (req, res) => {};
const deleteItems = (req, res) => {};

module.exports = {
  getItemsByFecha,
  getItem,
  createItems,
  updateItems,
  deleteItems,
};
