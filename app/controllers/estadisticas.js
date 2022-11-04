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
const cargarRojas = async (req, res) => {
  try {
    console.log(
      "jugadoreseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      req.body.roja
    );
    const { roja, idPartido, idTorneo, estadistica_id } = req.body;

    const existeStats = await estadisticasbypartidoss.findOne({
      where: { partido_id: idPartido, estadistica_id: estadistica_id },
    });

    if (existeStats) {
      //update
      roja.forEach(async (jugador) => {
        await estadisticasbypartidoss.update({
          partido_id: idPartido,
          estadistica_id,
          jugador_id: jugador.id,
          torneo_id: idTorneo,
        });
      });
      return res.json({
        status: 200,
        message: "Se actualizaron las estadisticas correctamente",
      });
    }

    roja.forEach(async (jugador) => {
      await estadisticasbypartidoss.create({
        partido_id: idPartido,
        estadistica_id,
        jugador_id: jugador.id,
        torneo_id: idTorneo,
      });
    });

    return res.json({
      status: 200,
      message: "Estadisticas creadas correctamente",
    });
  } catch (error) {
    httpError(res, error);
  }
};

const cargarAmarillas = async (req, res) => {
  try {
    console.log(
      "jugadoreseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      req.body.amarilla
    );
    const { amarilla, idPartido, idTorneo, estadistica_id } = req.body;
    const existeStats = await estadisticasbypartidoss.findOne({
      where: { partido_id: idPartido, estadistica_id: estadistica_id },
    });

    if (existeStats) {
      //update
      amarilla.forEach(async (jugador) => {
        await estadisticasbypartidoss.update({
          partido_id: idPartido,
          estadistica_id,
          jugador_id: jugador.id,
          torneo_id: idTorneo,
        });
      });

      return res.json({
        status: 200,
        message: "Se actualizaron las estadisticas correctamente",
      });
    }

    amarilla.forEach(async (jugador) => {
      await estadisticasbypartidoss.create({
        partido_id: idPartido,
        estadistica_id,
        jugador_id: jugador.id,
        torneo_id: idTorneo,
      });
    });
    return res.json({
      status: 200,
      message: "Estadisticas creadas correctamente",
    });
  } catch (error) {
    httpError(res, error);
  }
};

const cargarMvp = async (req, res) => {
  try {
    const { mvp, idPartido, idTorneo, estadistica_id } = req.body;

    const existeStats = await estadisticasbypartidoss.findOne({
      where: { partido_id: idPartido, estadistica_id: estadistica_id },
    });

    if (existeStats) {
      //update
      await estadisticasbypartidoss.update({
        partido_id: idPartido,
        estadistica_id,
        jugador_id: mvp.id,
        torneo_id: idTorneo,
      });

      return res.json({
        status: 200,
        message: "Se actualizaron las estadisticas correctamente",
      });
    }
    await estadisticasbypartidoss.create({
      partido_id: idPartido,
      estadistica_id,
      jugador_id: mvp.id,
      torneo_id: idTorneo,
    });
    return res.json({
      status: 200,
      message: "Estadisticas creadas correctamente",
    });
  } catch (error) {
    httpError(res, error);
  }
};

const cargarLesionNaranja = async (req, res) => {
  try {
    const { lesionados, idPartido, idTorneo, estadistica_id } = req.body;

    const existeStats = await estadisticasbypartidoss.findOne({
      where: { partido_id: idPartido, estadistica_id: estadistica_id },
    });

    if (existeStats) {
      //update
      lesionados.forEach(async (jugador) => {
        await estadisticasbypartidoss.update({
          partido_id: idPartido,
          estadistica_id,
          jugador_id: jugador.id,
          torneo_id: idTorneo,
        });
      });

      return res.json({
        status: 200,
        message: "Se actualizaron las estadisticas correctamente",
      });
    }
    lesionados.forEach(async (jugador) => {
      await estadisticasbypartidoss.create({
        partido_id: idPartido,
        estadistica_id,
        jugador_id: jugador.id,
        torneo_id: idTorneo,
      });
    });
    return res.json({
      status: 200,
      message: "Estadisticas creadas correctamente",
    });
  } catch (error) {
    httpError(res, error);
  }
};

const cargarLesionRoja = async (req, res) => {
  try {
    const { lesionados, idPartido, idTorneo, estadistica_id } = req.body;

    const existeStats = await estadisticasbypartidoss.findAll({
      where: { partido_id: idPartido, estadistica_id: estadistica_id },
    });

    if (existeStats) {
      //update
      lesionados.forEach(async (jugador) => {
        existeStats.forEach(async (stat) => {
          if (stat.jugador_id !== jugador.id) {
            await estadisticasbypartidoss.destroy(
              { where: { id: stat.id } }
            );
          }
        });
      });
    }

    lesionados.forEach(async (jugador) => {
      await estadisticasbypartidoss.create({
        partido_id: idPartido,
        estadistica_id,
        jugador_id: jugador.id,
        torneo_id: idTorneo,
      });
    });
    return res.json({
      status: 200,
      message: "Estadisticas creadas correctamente",
    });
  } catch (error) {
    httpError(res, error);
  }
};

const cargarGoleadores = async (req, res) => {
  try {
    const { goleadores, idPartido, idTorneo, estadistica_id } = req.body;

    const existeStats = await estadisticasbypartidoss.findOne({
      where: { partido_id: idPartido, estadistica_id: estadistica_id },
    });

    if (existeStats) {
      //update
      goleadores.forEach(async (jugador) => {
        if (jugador.goles > 0) {
          await estadisticasbypartidoss.update({
            partido_id: idPartido,
            estadistica_id,
            jugador_id: jugador.jugador_id,
            torneo_id: idTorneo,
            cantidad: jugador.goles,
          });
        }
      });

      return res.json({
        status: 200,
        message: "Se actualizaron las estadisticas correctamente",
      });
    }
    goleadores.forEach(async (jugador) => {
      if (jugador.goles > 0) {
        await estadisticasbypartidoss.create({
          partido_id: idPartido,
          estadistica_id,
          jugador_id: jugador.jugador_id,
          torneo_id: idTorneo,
          cantidad: jugador.goles,
        });
      }
    });
    return res.json({
      status: 200,
      message: "Estadisticas creadas correctamente",
    });
  } catch (error) {
    httpError(res, error);
  }
};

const cargarAsistencias = async (req, res) => {
  try {
    const { asistencias, idPartido, idTorneo, estadistica_id } = req.body;

    const existeStats = await estadisticasbypartidoss.findOne({
      where: { partido_id: idPartido, estadistica_id: estadistica_id },
    });

    if (existeStats) {
      //update
      asistencias.forEach(async (jugador) => {
        if (jugador.asistencias > 0) {
          await estadisticasbypartidoss.update({
            partido_id: idPartido,
            estadistica_id,
            jugador_id: jugador.jugador_id,
            torneo_id: idTorneo,
            cantidad: jugador.asistencias,
          });
        }
      });
    }

    asistencias.forEach(async (jugador) => {
      if (jugador.asistencias > 0) {
        await estadisticasbypartidoss.create({
          partido_id: idPartido,
          estadistica_id,
          jugador_id: jugador.jugador_id,
          torneo_id: idTorneo,
          cantidad: jugador.asistencias,
        });
      }
    });
    return res.json({
      status: 200,
      message: "Estadisticas creadas correctamente",
    });
  } catch (error) {
    httpError(res, error);
  }
};

const updateItems = (req, res) => {};
const deleteItems = (req, res) => {};

module.exports = {
  getItems,
  getItem,
  updateItems,
  deleteItems,
  cargarRojas,
  getGoleadoresByTorneo,
  cargarAmarillas,
  cargarLesionNaranja,
  cargarLesionRoja,
  cargarMvp,
  cargarGoleadores,
  cargarAsistencias,
};
