const Sequelize = require("sequelize");
const { httpError } = require("../helpers/handleError");
const clasificacion = require("../models").Clasificacion;
const equipo = require("../models").Equipo;
const fixture = require("../models").Fixture;
const torneo = require("../models").Torneo;
const tipos = require("../models").TipoTorneo;
const equipo_x_torneo = require("../models").equipo_x_torneo;
//continente

const getItems = async (req, res) => {};

const getItem = async (req, res) => {};

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
    let fixtureCreado = [];
    let equiposfecha = [];
    let indiceLocal;
    let indiceVisitante;
    let local;
    let visitante;
    //crear fixture por fecha

    for (let i = 0; i < numeroFechas; i++) {
      let fecha = i + 1;

      equiposfecha = equiposfecha.concat(equipos);
      console.log("Equipos equiposfechaequiposfecha", equiposfecha);

      for (let j = 0; j < numeroPartidosFecha; j++) {
        let partido = j + 1;
        //indice random

        console.log("Equipos fecha", equiposfecha.length);
        //validar que no se repitan los equipos
        if (equiposfecha.length == 2) {
          indiceLocal = 0;
          indiceVisitante = 1;
        } else if (equiposfecha.length > 0) {
          console.log("Equipos fecha else", equiposfecha.length - 1);
          indiceLocal = Math.ceil(Math.random() * equiposfecha.length - 1);
          indiceVisitante = Math.ceil(Math.random() * equiposfecha.length - 1);

          while (indiceLocal == indiceVisitante) {
            indiceVisitante = Math.ceil(
              Math.random() * equiposfecha.length - 1
            );
          }
        }
        //obtener equipos
        local = equiposfecha[indiceLocal];
        visitante = equiposfecha[indiceVisitante];

        console.log(local, " vs ", visitante);

        console.log("PARTIDO", partido);

        if (fixtureCreate.length > 0 && fecha > 1) {

          existPartido = fixtureCreate.filter((item) => {
            return (
              (item.local == local && item.visitante == visitante) ||
              (item.local == visitante && item.visitante == local)
            );
          });
          console.log("Existe Partido", existPartido);

          while (existPartido.length > 0) {

            if (equiposfecha.length > 0) {
              console.log("Equipos fecha else exist", equiposfecha.length - 1);
              indiceLocal = Math.ceil(Math.random() * equiposfecha.length - 1);
              indiceVisitante = Math.ceil(
                Math.random() * equiposfecha.length - 1
              );

              while (indiceLocal == indiceVisitante) {
                indiceVisitante = Math.ceil(
                  Math.random() * equiposfecha.length - 1
                );
              }
            }
            //obtener equipos
            local = equiposfecha[indiceLocal];
            visitante = equiposfecha[indiceVisitante];
            existPartido = fixtureCreate.filter((item) => {
              return (
                (item.local == local && item.visitante == visitante) ||
                (item.local == visitante && item.visitante == local)
              );
            });
          }
        }
        let fixture = {
          fecha: fecha,
          partido: partido,
          local: local,
          visitante: visitante,
          torneo_id: torneo_id,
          fecha_desde: fecha_desde,
          fecha_hasta: fecha_hasta,
        };

        fixtureCreate.push(fixture);

        //eliminar equipos de la lista filter
        equiposfecha = equiposfecha.filter(
          (item) => item != local && item != visitante
        );

        console.log("Equipos fecha splice", equiposfecha);
        console.log("fecha", fecha);

        //validar que no se repitan los partidos

        console.log("fixtureCreate", fixtureCreate);

        //crear fixture
      }

      //no se repitan los partidos en la fecha
      //agrupar los que ya jugaron

      //agrupar los que ya jugaron
    }
    if (rondas > 1) {
      //invierte equipos
      for (let k = 0; k < rondas - 1; k++) {
        for (let i = 0; i < numeroFechas; i++) {
          let fecha = i + 1 + numeroFechas * (k + 1);
          for (let j = 0; j < numeroPartidosFecha; j++) {
            let partido = j + 1;
            let local = fixtureCreate[j].visitante;
            let visitante = fixtureCreate[j].local;
            let fixture = {
              fecha: fecha,
              partido: partido,
              local: local,
              visitante: visitante,
              torneo_id: torneo_id,
              fecha_desde: fecha_desde,
              fecha_hasta: fecha_hasta,
            };
            fixtureCreate.push(fixture);
          }
        }
      }
    }

    /*   for (let i = 0; i < numeroFechas; i++) {
      const fecha = i + 1;
      for (let j = 0; j < numeroPartidosFecha; j++) {

        const equipo_local = await equipo.findOne({
          where: {
            id: equiposLocal[j]?.id,
          },
          attributes: ["id", "nombre"],
        });

        const equipo_visitante = await equipo.findOne({
          where: {
            id: equiposVisitante[j]?.id,
          },
          attributes: ["id", "nombre"],
        });

        const equipo_local_id = equipo_local?.id;
        const equipo_visitante_id = equipo_visitante?.id;

        fixtureCreate.push({
          num_fecha: fecha,
          equipo_local,
          equipo_visitante,
          torneo_id,
          fecha_desde,
          fecha_hasta
        });

        fixtureCreado.push({
          num_fecha: fecha,
          equipo_local : equipo_local_id,
          equipo_visitante: equipo_visitante_id,
          torneo_id,
        });
      }
      //rotar equipos
      equiposLocal.unshift(equiposLocal.pop());
      equiposVisitante.unshift(equiposVisitante.pop());
      equiposVisitante.unshift(equiposVisitante.pop());
      //invierto localia
    } */

    /* 
    let fixtureGroup= {
      fecha: [
      ],
    }
    for (let i = 0; i < numeroFechas; i++) {
      let fecha = i + 1;
      fixtureGroup.fecha.push({
        num_fecha: fecha,
        partido: fixtureCreate.filter((item) => item.num_fecha === fecha),
      });
     
    } */

    return res.json({ status: 200, fixtureCreate });
  } catch (error) {
    httpError(res, error);
  }
};

const confirmCretateFixture = async (req, res) => {
  try {
    const { fixtureCreado, torneo_id } = req.body;
    console.log(
      "=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
      fixtureCreado
    );
    const getFixture = await fixture.findOne({
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
    return res.json({ fixtureCreate, status: 200 });
  } catch (error) {
    httpError(res, error);
  }
};

const updateItems = (req, res) => {};
const deleteItems = (req, res) => {};

module.exports = {
  getItems,
  getItem,
  createItems,
  updateItems,
  deleteItems,
  confirmCretateFixture,
};
