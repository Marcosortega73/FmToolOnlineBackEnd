const Sequelize = require("sequelize");
const { httpError } = require("../helpers/handleError");
const estadisticasbypartidoss = require("../models").EstadisticasByPartido;
const estadistica = require("../models").Estadistica;
const jugador = require("../models").Jugador;
const equipo = require("../models").Equipo;
const torneos = require("../models").Torneo;
const partidos = require("../models").Fixture;

//import Op
const { Op } = require("sequelize");

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
    const estadisticas = await estadisticasbypartidoss
      .findAll({
        where: { torneo_id: req.params.id },
        include: [
          {
            model: estadistica,
            where: { id: 1 },
          },
          {
            model: jugador,
            attributes: ["nombre"],
            include: [
              {
                model: equipo,
                attributes: ["nombre_corto"],
              },
            ],
          },
        ],
      })
      .then((data) => {
        const goleadores = data.map((goleador) => {
          return {
            id: goleador.jugador_id,
            nombre: goleador?.Jugador?.nombre,
            equipo: goleador?.Jugador?.Equipo.nombre_corto,
            goles: goleador.cantidad,
          };
        });

        //sumar goles
        const goleadoresFiltrados = goleadores.reduce((acc, goleador) => {
          const existe = acc.find((g) => g.id === goleador.id);
          if (existe) {
            existe.goles += goleador.goles;
          } else {
            acc.push(goleador);
          }
          return acc;
        }, []);

        return goleadoresFiltrados;
      });
    return res.json({ estadisticas, status: 200 });
  } catch (error) {
    httpError(res, error);
  }
};

//obtener asistencias por torneo
const getEstadisticasByTorneo = async (req, res) => {
  try {
    const { torneo_id } = req.params;
    const { estadistica_id } = req.query;

    const estadisticas = await estadisticasbypartidoss
      .findAll({
        where: { torneo_id: torneo_id },
        include: [
          {
            model: estadistica,
            where: { id: estadistica_id },
          },
          {
            model: jugador,
            attributes: ["nombre"],
            include: [
              {
                model: equipo,
                attributes: ["nombre_corto"],
              },
            ],
          },
        ],
      })
      .then((data) => {
        const asistencias = data.map((asistencia) => {
          return {
            id: asistencia.jugador_id,
            nombre: asistencia?.Jugador?.nombre,
            equipo: asistencia?.Jugador?.Equipo.nombre_corto,
            asistencias: asistencia.cantidad,
          };
        });

        //sumar asistencias
        const asistenciasFiltradas = asistencias.reduce((acc, asistencia) => {
          const existe = acc.find((a) => a.id === asistencia.id);
          if (existe) {
            existe.asistencias += asistencia.asistencias;
          } else {
            acc.push(asistencia);
          }
          return acc;
        }, []);

        return asistenciasFiltradas;
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

      //suspender para el proximo partido
      console.log("jugadorrrrr", jugador);
      const proxPartido = await partidos
        .findAll({
          where: {
            torneo_id: idTorneo,
            //Equipopo visitante o local
            [Op.or]: [
              { equipo_local: jugador.equipo_id },
              { equipo_visitante: jugador.equipo_id },
            ],
          },
        })
        .then((data) => {
          const proxPartido = data.find((partido) => {
            return partido.id > idPartido;
          });
          console.log("proximo partidooooooooo", proxPartido);
          return proxPartido;
        });

      //suspender jugador
      await estadisticasbypartidoss.create({
        partido_id: proxPartido.id,
        estadistica_id: 8,
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

      //si tiene dos amarillas, se suspende para el proximo partido
      const amarillas = await estadisticasbypartidoss
        .findAll({
          where: {
            jugador_id: jugador.id,
            estadistica_id: estadistica_id,
          },
        })
        .then((data) => {
          return data.length;
        });

      if (amarillas === 2) {
        //suspender para el proximo partido
        const proxPartido = await partidos
          .findAll({
            where: {
              torneo_id: idTorneo,
              //Equipopo visitante o local
              [Op.or]: [
                { equipo_local: jugador.equipo_id },
                { equipo_visitante: jugador.equipo_id },
              ],
            },
          })
          .then((data) => {
            const proxPartido = data.find((partido) => {
              return partido.id > idPartido;
            });
            console.log("proximo partidooooooooo", proxPartido);
            return proxPartido;
          });

        //suspender jugador
        await estadisticasbypartidoss.create({
          partido_id: proxPartido.id,
          estadistica_id: 8,
          jugador_id: jugador.id,
          torneo_id: idTorneo,
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
      //suspender para el proximo partido
      console.log("jugadorrrrr", jugador);
      const proxPartido = await partidos
        .findAll({
          where: {
            torneo_id: idTorneo,
            //Equipopo visitante o local
            [Op.or]: [
              { equipo_local: jugador.equipo_id },
              { equipo_visitante: jugador.equipo_id },
            ],
          },
        })
        .then((data) => {
          const proxPartido = data.find((partido) => {
            return partido.id > idPartido;
          });
          console.log("proximo partidooooooooo", proxPartido);
          return proxPartido;
        });

      //suspender jugador
      await estadisticasbypartidoss.create({
        partido_id: proxPartido.id,
        estadistica_id: 8,
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
            await estadisticasbypartidoss.destroy({ where: { id: stat.id } });
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

      //suspender para el proximo partido
      console.log("jugadorrrrr", jugador);
      const proxPartido = await partidos
        .findAll({
          where: {
            torneo_id: idTorneo,
            //Equipopo visitante o local
            [Op.or]: [
              { equipo_local: jugador.equipo_id },
              { equipo_visitante: jugador.equipo_id },
            ],
          },
        })
        .then((data) => {
          const proxPartido = data.find((partido) => {
            return partido.id > idPartido;
          });
          console.log("proximo partidooooooooo", proxPartido);
          return proxPartido;
        });

      //suspender jugador
      await estadisticasbypartidoss.create({
        partido_id: proxPartido.id,
        estadistica_id: 8,
        jugador_id: jugador.id,
        torneo_id: idTorneo,
      });

      
      const dobleSuspencion = await partidos
        .findAll({
          where: {
            torneo_id: idTorneo,
            //Equipopo visitante o local
            [Op.or]: [
              { equipo_local: jugador.equipo_id },
              { equipo_visitante: jugador.equipo_id },
            ],
          },
        })
        .then((data) => {
          const dobleSuspencion = data.find((partido) => {
            return partido.id > proxPartido.id;
          });
          console.log("proximo partidooooooooo", dobleSuspencion);
          return dobleSuspencion;
        });

      //suspender jugador
      await estadisticasbypartidoss.create({
        partido_id: dobleSuspencion.id,
        estadistica_id: 8,
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

const getSancionadosByEquipoByTorneo = async (req, res) => {
  try {
    const { equipo_id } = req.params;

    const { torneo_id } = req.query;

    console.log("EQUIPOOOOOOOOOOOOOOOOO", equipo_id, "ASDTORNEOOO", torneo_id);

    const sancionados = await jugador
      .findAll({
        where: { equipo_id: equipo_id },
        attributes: ["id", "nombre"],
      })
    //obtener los saciones de los jugadores

    const sanciones = await estadisticasbypartidoss.findAll({
      where: {
        torneo_id: torneo_id,
        //not estadistica_id: 1 2 7},
        [Op.not]: [{ estadistica_id: [1, 2, 7] }],
      },
      include: [
        {
          model: jugador,
          attributes: ["nombre","equipo_id"],
          //or local o visitante
          where: {
            equipo_id: equipo_id,
          },
        },
        {
          model:partidos,
          attributes: ["num_fecha"],
        }
      ],
    });

    //agregar las sanciones a los jugadores
    sancionados.forEach((jugador) => {
      jugador.dataValues.sanciones = sanciones.filter((sancion) => {
        return sancion.jugador_id === jugador.id;
      });
    });

    

    /*       */

    return res.json({
      status: 201,
      message: "Sancionados obtenidos correctamente",
      sancionados,
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
  getEstadisticasByTorneo,
  getSancionadosByEquipoByTorneo,
};
