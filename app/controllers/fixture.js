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

   /*  const torneoSelect = await torneo.findOne({
      where: {
        id: torneo_id,
      },
      include: [{ all: true }],
    }); */

   
 //prueba sin base de datos
    const torneoSelect = {
      id: 1,
      nombre: "Torneo de prueba",
    };


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

      console.log("Equipos concat equipos", equiposfecha);

      for (let j = 0; j < numeroPartidosFecha; j++) {

        let partido = j + 1;

        //indice random
        console.log("Equipos Length", equiposfecha.length);

        //validar que no se repitan los equipos
        if (equiposfecha.length == 2) {
          indiceLocal = 0;
          indiceVisitante = 1;
        } else if (equiposfecha.length > 0) {
          console.log(
            "Equipos Lengt primer fecha else",
            equiposfecha.length - 1
          );
          indiceLocal = Math.ceil(Math.random() * equiposfecha.length - 1);
        }


        //obtener equipos reales
        local = equiposfecha[indiceLocal];

        console.log("PARTIDO", partido);

            //no pueden jugar los mismo partidos 
            visitante = equiposfecha.find(
              (item,index) => ((item != local) 
              &&(
                  fixtureCreate.filter((element) => {
                    return (
                      (element.local == local && element.visitante == item) ||
                      (element.local == item && element.visitante == local)
                    );
                  }).length == 0
              )
              )
            );

            indiceVisitante = equiposfecha.findIndex((item)=> item == visitante)
            
        let fixturePartial = {
          fecha: fecha,
          partido: partido,
          local: local,
          visitante: visitante,
          torneo_id: torneo_id,
          fecha_desde: fecha_desde,
          fecha_hasta: fecha_hasta,
        };
        fixtureCreate.push(fixturePartial);

        //eliminar equipos de la lista filter
        equiposfecha = equiposfecha.filter(
          (item) => item != local && item != visitante
        );

        console.log("Equipos fecha splice", equiposfecha);
        console.log("fecha", fecha);

        console.log("fixtureCreate Finaliza", fixtureCreate);
      }

    }

    //RONDAS MAYORES A 1
    if (rondas > 1) {
      //invierte equipos
      console.log("RONDAS",rondas)
      for (let k = 0; k < rondas - 1; k++) {

        for (let i = 0; i < numeroFechas; i++) {

          let fecha = i + 1 + numeroFechas * (k + 1);

          for (let j = 0; j < fixtureCreate; j++) {
            let local = fixtureCreate[j].visitante;
            let visitante = fixtureCreate[j].local;
            let fixtureRondas = {
              fecha: fecha,
              local: local,
              visitante: visitante,
              torneo_id: torneo_id,
              fecha_desde: fecha_desde,
              fecha_hasta: fecha_hasta,
            };

            fixtureCreate.push(fixtureRondas);
            console.log("fixtureCreate Finaliza ADD", fixtureCreate);
          }
        }
      }
    }

    
    let fixtureGroup= {
      fecha: [],
    }
    for (let i = 0; i < numeroFechas; i++) {
      let fecha = i + 1;
      fixtureGroup.fecha.push({
        num_fecha: fecha,
        partido: fixtureCreate.filter((item) => item.num_fecha === fecha),
      });
     
    } 

    return res.json({ status: 200, fixtureCreate,fixtureGroup });
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
