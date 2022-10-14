const Sequelize = require("sequelize");
const { httpError } = require("../helpers/handleError");
const clasificacion = require("../models").Clasificacion;
const equipoReal = require("../models").Equipo;
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
        partido = j+1;
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
       let fechaAnterior = i+1 + numeroFechas * k; 
       console.log("fecha", fecha);
        console.log("fechaAnterior", fechaAnterior);

        for (let j = 0; j < numeroPartidosFecha; j++) {

          let partido = j + 1;

          let fixturePartial = fixtureCreate.find(
            (item) => item.num_fecha == fechaAnterior && item.partido == partido
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
    
    if(rondas>1){
      numeroFechas = numeroFechas * rondas;
    }

   for (let i = 0;  i < numeroFechas ; i++) {
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








    return res.json({ status: 200, fixtureCreate, fixtureCreado,fixtureCreadoBack });
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
