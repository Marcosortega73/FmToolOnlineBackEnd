const Sequelize = require("sequelize");
const { httpError } = require("../helpers/handleError");
const jugador = require("../models").Jugador;
const equipo = require("../models").Equipo;
const fixture = require("../models").Fixture;
const XLSX = require("xlsx");


// Todo:Realizar controles de errores

const createJugadoresBase = async (req, res) => {
  const workbook = XLSX.readFile(req.file.path);
  const sheet_name_list = workbook.SheetNames;
  const worksheet = workbook.Sheets[sheet_name_list[0]];
  const data = XLSX.utils.sheet_to_json(worksheet);

  var jugadoresBase = await data.map((jugador) => {
    //obtener id de equipo por nombre

    if (jugador) {
      return {
        id: jugador.idFmrte ? jugador.idFmrte : null,
        idFmrte: jugador.idFmrte ? jugador.idFmrte : null,
        nombre: jugador.nombre ? jugador.nombre : null,
        nacionalidad_id: jugador.nacionalidad_id
          ? jugador.nacionalidad_id
          : null,
        equipo_id: jugador.equipo_id ? jugador.equipo_id : 1,
        altura: jugador.altura ? jugador.altura : null,
        peso: jugador.peso ? jugador.peso : null,
        ca: jugador.ca ? jugador.ca : null,
        cp: jugador.cp ? jugador.cp : null,
        valor: jugador.valor ? jugador.valor : null,
        edad: jugador.edad ? jugador.edad : null,
        posiciones: jugador.posiciones ? jugador.posiciones : null,
        velocidad: jugador.velocidad ? jugador.velocidad : null,
        aceleracion: jugador.aceleracion ? jugador.aceleracion : null,
        agilidad: jugador.agilidad ? jugador.agilidad : null,
        equilibrio: jugador.equilibrio ? jugador.equilibrio : null,
        salto: jugador.salto ? jugador.salto : null,
        habZurda: jugador.habZurda ? jugador.habZurda : null,
        habDiestra: jugador.habDiestra ? jugador.habDiestra : null,
        formaNatural: jugador.formaNatural ? jugador.formaNatural : null,
        resistencia: jugador.resistencia ? jugador.resistencia : null,
        fuerza: jugador.fuerza ? jugador.fuerza : null,
        pBalonesAereos: jugador.pBalonesAereos ? jugador.pBalonesAereos : null,
        pMandoArea: jugador.pMandoArea ? jugador.pMandoArea : null,
        pComunicacion: jugador.pComunicacion ? jugador.pComunicacion : null,
        pExentricidad: jugador.pExentricidad ? jugador.pExentricidad : null,
        pSaquesManos: jugador.pSaquesManos ? jugador.pSaquesManos : null,
        pSaquesPuerta: jugador.pSaquesPuerta ? jugador.pSaquesPuerta : null,
        pUnoContraUno: jugador.pUnoContraUno ? jugador.pUnoContraUno : null,
        pReflejos: jugador.pReflejos ? jugador.pReflejos : null,
        pSalidas: jugador.pSalidas ? jugador.pSalidas : null,
        pSalidaDePunios: jugador.pSalidaDePunios
          ? jugador.pSalidaDePunios
          : null,
        pAgarreBalon: jugador.pAgarreBalon ? jugador.pAgarreBalon : null,
        agresividad: jugador.agresividad ? jugador.agresividad : null,
        anticipacion: jugador.anticipacion ? jugador.anticipacion : null,
        valentia: jugador.valentia ? jugador.valentia : null,
        serenidad: jugador.serenidad ? jugador.serenidad : null,
        concentracion: jugador.concentracion ? jugador.concentracion : null,
        deciciones: jugador.deciciones ? jugador.deciciones : null,
        determinacion: jugador.determinacion ? jugador.determinacion : null,
        talento: jugador.talento ? jugador.talento : null,
        influencia: jugador.influencia ? jugador.influencia : null,
        desmarques: jugador.desmarques ? jugador.desmarques : null,
        colocacion: jugador.colocacion ? jugador.colocacion : null,
        trabajoEquipo: jugador.trabajoEquipo ? jugador.trabajoEquipo : null,
        creatividad: jugador.creatividad ? jugador.creatividad : null,
        lucha: jugador.lucha ? jugador.lucha : null,
        corners: jugador.corners ? jugador.corners : null,
        centros: jugador.centros ? jugador.centros : null,
        regate: jugador.regate ? jugador.regate : null,
        remate: jugador.remate ? jugador.remate : null,
        primerToque: jugador.primerToque ? jugador.primerToque : null,
        lanzadorFaltas: jugador.lanzadorFaltas ? jugador.lanzadorFaltas : null,
        rematesCabeza: jugador.rematesCabeza ? jugador.rematesCabeza : null,
        tirosLejanos: jugador.tirosLejanos ? jugador.tirosLejanos : null,
        saquesLargoLateral: jugador.saquesLargoLateral
          ? jugador.saquesLargoLateral
          : null,
        marcaje: jugador.marcaje ? jugador.marcaje : null,
        pases: jugador.pases ? jugador.pases : null,
        penalty: jugador.penalty ? jugador.penalty : null,
        entradas: jugador.entradas ? jugador.entradas : null,
        tecnica: jugador.tecnica ? jugador.tecnica : null,
      };
    } else {
      return null;
    }
  });

  try {
    const queryEquipos = await equipo.findAll({
      attributes: ["id", "nombre"],
    });

    if (queryEquipos.length > 0) {
      await queryEquipos.forEach(async (equipo) => {
        jugadoresBase.forEach(async (jugador) => {
          if (jugador.equipo_id == equipo.nombre) {
            jugador.equipo_id = equipo.id;
          }
        });
      });
    }
    if (jugadoresBase.length > 0) {
      await jugador.bulkCreate(jugadoresBase);
      res.json({
        message: "Jugadores Base creado correctamente",
        status: 200,
        jugadoresBase,
        file: req.file,
      });
    }
  } catch (e) {
    httpError(res, e);
  }
};

const createEquiposBase = async (req, res) => {
  const workbook = XLSX.readFile(req.file.path);
  const sheet_name_list = workbook.SheetNames;
  const worksheet = workbook.Sheets[sheet_name_list[0]];
  const data = XLSX.utils.sheet_to_json(worksheet);

  try {
    const equiposBase = await data.map((equipo) => {
      return {
        id: equipo.idFmrte ? equipo.idFmrte : null,
        idFmrte: equipo.idFmrte ? equipo.idFmrte : null,
        nombre: equipo.nombre,
        nombre_corto: equipo.nombre_corto ? equipo.nombre_corto : null,
        nacionalidad_id: equipo.nacionalidad_id,
        torneo_id: equipo.torneo_id ? equipo.torneo_id : null,
      };
    });

    if (equiposBase.length > 0) {
      await equipo.bulkCreate(equiposBase);
      res.json({
        message: "Equipos creados correctamente",
        status: 200,
        equiposBase,
        file: req.file,
      });
    }
  } catch (e) {
    httpError(res, e);
  }
};

const createFixture = async (req, res) => {
  const workbook = XLSX.readFile(req.file.path);
  const sheet_name_list = workbook.SheetNames;
  const worksheet = workbook.Sheets[sheet_name_list[0]];
  const data = XLSX.utils.sheet_to_json(worksheet);

  try {
    const fixtureBase = await data.map((fixture) => {
      return {
        num_fecha: fixture.num_fecha || null,
        equipo_local: fixture.equipo_local || null,
        equipo_visitante: fixture.equipo_visitante || null,
        torneo_id: fixture.torneo_id || null,
      };
    });

    if (fixtureBase.length > 0) {
      await fixture.bulkCreate(fixtureBase);    
      res.json({
        message: "Fixture creado correctamente",
        status: 200,
        fixtureBase,
      });
    }
  } catch (e) {
    httpError(res, e);
  }
};

module.exports = { createJugadoresBase, createEquiposBase, createFixture };
