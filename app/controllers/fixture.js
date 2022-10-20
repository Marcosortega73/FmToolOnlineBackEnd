const Sequelize = require("sequelize");
const { httpError } = require("../helpers/handleError");
const clasificacion = require("../models").Clasificacion;
const equipoReal = require("../models").Equipo;
const fixture = require("../models").Fixture;
const torneo = require("../models").Torneo;
const tipos = require("../models").TipoTorneo;
const equipos = require("../models").Equipo;
const equipo_x_torneo = require("../models").equipo_x_torneo;
//continente

const getItems = async (req, res) => {
  try {
    console.log("HOLA FIXTURE GET DATA");
    const fixtureData = await fixture.findAll({
      include: [
        {
          model: equipoReal,
          as: "local",
        },
        {
          model: equipoReal,
          as: "visitante",
        },
        {
          model: torneo,
        },
      ],
    });

    return res.json({ fixture: fixtureData, status: 200 });
  } catch (error) {
    httpError(res, error);
  }
};

const getItemsFilter = async (req, res) => {
  const { fecha = 1 } = req.query;
  try {
    console.log("HOLA FIXTURE GET DATA");

    const fixtureData = await fixture.findAndCountAll({
      include: [
        {
          model: equipoReal,
          as: "local",
        },
        {
          model: equipoReal,
          as: "visitante",
        },
      ],
      where: { torneo_id: req.params.id },
      where: { num_fecha: fecha },
    });

    return res.json({ fixture: fixtureData, status: 200 });
  } catch (error) {
    httpError(res, error);
  }
};

const getItem = async (req, res) => {
  try {
    const getFixture = await fixture.findAll({
      where: { torneo_id: req.params.id },
      include: [
        {
          model: equipoReal,
          as: "local",
        },
        {
          model: equipoReal,
          as: "visitante",
        },
      ],
    });
    return res.json({ getFixture, status: 200 });
  } catch (error) {
    httpError(res, error);
  }
};

const createItems = async (req, res) => {
  //sortear fixture
  try {
    const { equipos, torneo_id, fecha_desde, fecha_hasta, rondas } = req.body;

    const torneoSelect = await torneo.findOne({
      where: {
        id: torneo_id,
      },
      include: [{ all: true }],
    });
    //prueba sin base de datos

    if (!torneoSelect) {
      return res.json({ message: "Torneo no encontrado", status: 404 });
    }

    //crear sorteo de numero de fechas
    const numeroEquipos = equipos.length;
    let numeroFechas = numeroEquipos - 1;
    let numeroPartidosFecha = numeroEquipos / 2;

    if (numeroEquipos % 2 != 0) {
      return res.json({
        message: "El numero de equipos debe ser par",
        status: 400,
      });
    }

    //crear fixture

    //sorteo
    const equiposSorteados = equipos.sort(() => Math.random() - 0.5);

    console.log("Equipos Sorteados", equiposSorteados);

    let fixtureCreate = [];
    let fixtureCreadoBack = [];
    let equiposfecha = [];
    let indiceLocal;
    let indiceVisitante;
    let local;
    let visitante;
    let partido;

    //crear fixture por fecha

    for (let i = 0; i < numeroFechas; i++) {
      for (let j = 0; j < numeroPartidosFecha; j++) {
        partido = j + 1;
        indiceLocal = j;
        indiceVisitante = numeroEquipos - 1 - j;

        local = equiposSorteados[indiceLocal].id;
        visitante = equiposSorteados[indiceVisitante].id;

        equipoLocal = await equipoReal.findOne({
          where: {
            id: local,
          },
          attributes: ["id", "nombre"],
        });

        equipoVisitante = await equipoReal.findOne({
          where: {
            id: visitante,
          },
          attributes: ["id", "nombre"],
        });

        fixtureCreate.push({
          num_fecha: i + 1,
          partido,
          torneo_id: torneo_id,
          equipo_local: equipoLocal,
          equipo_visitante: equipoVisitante,
          fecha_desde: fecha_desde,
          fecha_hasta: fecha_hasta,
        });
      }

      //rotar equipos
      equiposSorteados.splice(1, 0, equiposSorteados.pop());
    }

    let fixtureRondas = [];
    //RONDAS MAYORES A 1, invertir localia
    if (rondas > 1) {
      for (let k = 0; k < rondas - 1; k++) {
        for (let i = 0; i < numeroFechas; i++) {
          let fecha = i + 1 + numeroFechas * (k + 1);
          let fechaAnterior = i + 1 + numeroFechas * k;
          console.log("fecha", fecha);
          console.log("fechaAnterior", fechaAnterior);

          for (let j = 0; j < numeroPartidosFecha; j++) {
            let partido = j + 1;

            let fixturePartial = fixtureCreate.find(
              (item) =>
                item.num_fecha == fechaAnterior && item.partido == partido
            );

            let equipoLocal = await equipoReal.findOne({
              where: {
                id: fixturePartial.visitante,
              },
              attributes: ["id", "nombre"],
            });

            let equipoVisitante = await equipoReal.findOne({
              where: {
                id: fixturePartial.local,
              },
              attributes: ["id", "nombre"],
            });

            let fixturePartialInvertido = {
              num_fecha: fecha,
              partido: partido,
              equipo_local: equipoLocal,
              equipo_visitante: equipoVisitante,
              torneo_id: torneo_id,
              fecha_desde: fecha_desde,
              fecha_hasta: fecha_hasta,
            };

            fixtureCreate.push(fixturePartialInvertido);
          }
        }
      }
    }

    console.log("fixture Create", fixtureCreate);

    let fixtureCreado = {
      fecha: [],
    };

    if (rondas > 1) {
      numeroFechas = numeroFechas * rondas;
    }

    for (let i = 0; i < numeroFechas; i++) {
      console.log("HOLA QUE TAL VIEJO COMO ESTAS ADENTRO DEL FOR");
      let fecha = i + 1;
      fixtureCreado.fecha.push({
        num_fecha: fecha,
        partido: fixtureCreate.filter((item) => item.num_fecha == fecha),
      });
      console.log("fixtureCreado for", fixtureCreado);
    }
    console.log("fixture Creado", fixtureCreado);
    //colocar ids de equipos en fixture
    fixtureCreadoBack = fixtureCreate.map((item) => {
      return {
        num_fecha: item.num_fecha,
        partido: item.partido,
        torneo_id: torneo_id,
        equipo_local: item.equipo_local.id,
        equipo_visitante: item.equipo_visitante.id,
        fecha_desde: fecha_desde,
        fecha_hasta: fecha_hasta,
      };
    });

    return res.json({
      status: 200,
      fixtureCreate,
      fixtureCreado,
      fixtureCreadoBack,
    });
  } catch (error) {
    httpError(res, error);
  }
};

const confirmCretateFixture = async (req, res) => {
  try {
    const { fixtureCreado, torneo_id } = req.body;


    const getFixture = await fixture.findOne({
      where: {
        torneo_id: torneo_id,
      },
    });

    const getEquiposByTorneo = await equipo_x_torneo.findAll({
      where: {
        torneo_id: torneo_id,
      },
    });

    if (getFixture) {
      return res.json({
        message: "El torneo ya tiene un fixture asignado ",
        status: 400,
      });
    }
    const fixtureCreate = await fixture.bulkCreate(fixtureCreado);

    await getEquiposByTorneo.map(async (item) => {

      await clasificacion.create({
        equipo_id: item.equipo_id,
        torneo_id: item.torneo_id,
        puntos: 0,
        partidos_jugados: 0,
        partidos_ganados: 0,
        partidos_empatados: 0,
        partidos_perdidos: 0,
        goles_favor: 0,
        goles_contra: 0,
        diferencia_goles: 0,
      });
    });

    return res.json({ fixtureCreate, status: 200 });
  } catch (error) {
    httpError(res, error);
  }
};

const updateItems = async (req, res) => {
  try {
    const { id, field, value } = req.body;
    //validar value que sea numero

    if (typeof value !== "number") {
      return res.json({
        message: "El valor ingresado no es un numero",
        status: 400,
      });
    }

    const fixtureUpdated = await fixture.findOne({
      where: {
        id,
      },
    });

    await fixture.update(
      {
        [field]: value,
      },
      {
        where: {
          id,
        },
      }
    );

/*     if (field == "goles_local" && fixtureUpdated.goles_visitante == null) {
      console.log("GOLES LOCALLLL COLAALLLSS");
      await fixture.update(
        {
          goles_visitante: 0,
        },
        {
          where: {
            id,
          },
        }
      );
    } */

 /*    if (field == "goles_visitante" && fixtureUpdated.goles_local == null) {
      console.log("GOLES VISITANTEEE COLAALLLSS");
      await fixture.update(
        {
          goles_local: 0,
        },
        {
          where: {
            id,
          },
        }
      );
    } */

    const fixtureEstado = await fixture.findOne({
      where: {
        id,
      },
    });

    if (fixtureEstado.estado == null) {
      await fixture.update(
        {
          estado: "Jugando",
        },
        {
          where: {
            id,
          },
        }
      );
    }

    if (fixtureEstado.goles_local && fixtureEstado.goles_visitante != null) {
      await fixture.update(
        {
          estado: "Terminado",
        },
        {
          where: {
            id,
          },
        }
      );
    }


    const partidoCompleto = await fixture.findOne({
      where: {
        id,
      },
    });

    //ACTUALIZAR TABLA POSICIONES
    if (partidoCompleto.estado == "Terminado") {
     /*  const equipoLocal = await equipos.findOne({
        where: {
          id: partidoCompleto.equipo_local,
        },
      });

      const equipoVisitante = await equipos.findOne({
        where: {
          id: partidoCompleto.equipo_visitante,
        },
      }); */

      //id, partidos_jugados, partidos_ganados, partidos_empatados, partidos_perdidos, goles_favor, goles_contra, diferencia_goles, puntos, equipo_id, torneo_id, createdAt, updatedAt
      const equipoXclasificacionLocal = await clasificacion.findOne({
        where: {
          equipo_id: partidoCompleto.equipo_local,
          torneo_id: partidoCompleto.torneo_id,
        },
      });

      console.log("equipoXclasificacionLocal", equipoXclasificacionLocal);

      const equipoXclasificacionVisitante = await clasificacion.findOne({
        where: {
          equipo_id: partidoCompleto.equipo_visitante,
          torneo_id: partidoCompleto.torneo_id,
        },
      });

      console.log("equipoXclasificacionVisitante", equipoXclasificacionVisitante);

      //ACTUALIZAR PARTIDOS JUGADOS

      const ganador =
        partidoCompleto.goles_local > partidoCompleto.goles_visitante
          ? partidoCompleto.equipo_local
          : partidoCompleto.goles_local > partidoCompleto.goles_visitante
          ? partidoCompleto.equipo_visitante
          : "empate";



        const goles_favor = equipoXclasificacionLocal.goles_favor +
        partidoCompleto.goles_local;
        const goles_contra = equipoXclasificacionLocal.goles_contra +
        partidoCompleto.goles_visitante;
        const diferenciaGolesLocal = goles_favor - goles_contra;

        const goles_favorVisitante = equipoXclasificacionVisitante.goles_favor +
        partidoCompleto.goles_visitante;
        const goles_contraVisitante = equipoXclasificacionVisitante.goles_contra +
        partidoCompleto.goles_local;
        const diferenciaGolesVisitante = goles_favorVisitante - goles_contraVisitante;


      if (ganador == partidoCompleto.equipo_local) {

        await clasificacion.update(
          {
            partidos_jugados: equipoXclasificacionLocal.partidos_jugados + 1,
            partidos_ganados: equipoXclasificacionLocal.partidos_ganados + 1,
            goles_favor:goles_favor,
            goles_contra: goles_contra,
            diferencia_goles:diferenciaGolesLocal,
            puntos: equipoXclasificacionLocal.puntos + 3,
          },
          {
            where: {
              id: equipoXclasificacionLocal.id,
              torneo_id: partidoCompleto.torneo_id,
            },
          }
        );

        await clasificacion.update(
          {
            partidos_jugados: equipoXclasificacionVisitante.partidos_jugados + 1,
            partidos_perdidos: equipoXclasificacionVisitante.partidos_perdidos + 1,
            goles_favor:goles_favorVisitante,
            goles_contra: goles_contraVisitante,
            diferencia_goles:diferenciaGolesVisitante,
          },
          {
            where: {
              id: equipoXclasificacionVisitante.id,
              torneo_id: partidoCompleto.torneo_id,
            },
          }
        );

      } else if (ganador == partidoCompleto.equipo_visitante) {
        await clasificacion.update(
          {
            partidos_jugados:
              equipoXclasificacionVisitante.partidos_jugados + 1,
            partidos_ganados:
              equipoXclasificacionVisitante.partidos_ganados + 1,
            goles_favor:
              goles_favorVisitante,
            goles_contra:
            goles_contraVisitante,
            diferencia_goles:
            diferenciaGolesVisitante,
            puntos: equipoXclasificacionVisitante.puntos + 3,
          },
          {
            where: {
              id: equipoXclasificacionVisitante.id,
              torneo_id: partidoCompleto.torneo_id,
            },
          }
        );

        await clasificacion.update(
          {
            partidos_jugados: equipoXclasificacionLocal.partidos_jugados + 1,
            partidos_perdidos: equipoXclasificacionLocal.partidos_perdidos + 1,
            goles_favor:goles_favor,
            goles_contra: goles_contra,
            diferencia_goles:diferenciaGolesLocal,
          },
          {
            where: {
              id: equipoXclasificacionLocal.id,
              torneo_id: partidoCompleto.torneo_id,
            },
          }
        );
        
      } else if (ganador == "empate") {

        console.log("EMPATEEE");
        await clasificacion.update(
          {
            partidos_jugados:
              equipoXclasificacionVisitante.partidos_jugados + 1,
            partidos_empatados:
              equipoXclasificacionVisitante.partidos_empatados + 1,
            goles_favor:
            goles_favorVisitante,
            goles_contra:
            goles_contraVisitante,
            puntos: equipoXclasificacionVisitante.puntos + 1,
          },
          {
            where: {
              id: equipoXclasificacionVisitante.id,
              torneo_id: partidoCompleto.torneo_id,
            },
          }
        );

        await clasificacion.update(
          {
            partidos_jugados: equipoXclasificacionLocal.partidos_jugados + 1,
            partidos_empatados:
              equipoXclasificacionLocal.partidos_empatados + 1,
            goles_favor:
            goles_favor,
            goles_contra:
              goles_contra,
            puntos: equipoXclasificacionLocal.puntos + 1,
          },
          {
            where: {
              id: equipoXclasificacionLocal.id,
              torneo_id: partidoCompleto.torneo_id,
            },
          }
        );
      }
    }

    return res.json({
      status: 200,
      partidoCompleto,
      message: "Partido actualizado correctamente",
    });
  } catch (error) {
    httpError(res, error);
  }
};
const deleteItems = (req, res) => {};

module.exports = {
  getItems,
  getItem,
  createItems,
  updateItems,
  deleteItems,
  confirmCretateFixture,
  getItemsFilter,
};
