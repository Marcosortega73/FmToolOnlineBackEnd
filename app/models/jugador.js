"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Jugador extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Jugador.belongsTo(models.Equipo, {
        foreignKey: "equipo_id",
      });
      Jugador.belongsTo(models.Nacionalidad, {
        foreignKey: "nacionalidad_id",
      });
       //jugador
       Jugador.hasMany(models.Season, {
        foreignKey: 'jugador_mvp_id',
      });

      //jugador goleador
      Jugador.hasMany(models.Season, {
        foreignKey: 'jugador_goleador_id',
      });

      //jugador asistente
      Jugador.hasMany(models.Season, {
        foreignKey: 'jugador_asistente_id',
      });
    }
  }
  Jugador.init(
    { 
      idFmrte:DataTypes.INTEGER,
      nombre: DataTypes.STRING,
      nacionalidad_id: DataTypes.INTEGER,
      equipo_id: DataTypes.BIGINT,
      altura: DataTypes.STRING,
      peso: DataTypes.STRING,
      ca: DataTypes.INTEGER,
      cp: DataTypes.INTEGER,
      valor: DataTypes.INTEGER,
      edad: DataTypes.INTEGER,
      posiciones: DataTypes.STRING,
      velocidad: DataTypes.INTEGER,
      aceleracion: DataTypes.INTEGER,
      agilidad: DataTypes.INTEGER,
      equilibrio: DataTypes.INTEGER,
      salto: DataTypes.INTEGER,
      habZurda : DataTypes.INTEGER,
      habDiestra : DataTypes.INTEGER,
      formaNatural : DataTypes.INTEGER,
      resistencia : DataTypes.INTEGER,
      fuerza : DataTypes.INTEGER,
      pBalonesAereos : DataTypes.INTEGER,
      pMandoArea : DataTypes.INTEGER,
      pComunicacion : DataTypes.INTEGER,
      pExentricidad : DataTypes.INTEGER,
      pSaquesManos : DataTypes.INTEGER,
      pSaquesPuerta : DataTypes.INTEGER,
      pUnoContraUno : DataTypes.INTEGER,
      pReflejos : DataTypes.INTEGER,
      pSalidas : DataTypes.INTEGER,
      pSalidaDePuños : DataTypes.INTEGER,
      pAgarreBalon : DataTypes.INTEGER,
      agresividad : DataTypes.INTEGER,
      anticipacion : DataTypes.INTEGER,
      valentia : DataTypes.INTEGER,
      serenidad : DataTypes.INTEGER,
      concentracion : DataTypes.INTEGER,
      deciciones : DataTypes.INTEGER,
      determinacion : DataTypes.INTEGER,
      talento : DataTypes.INTEGER,
      influencia : DataTypes.INTEGER,
      desmarques : DataTypes.INTEGER,
      colocacion : DataTypes.INTEGER,
      trabajoEquipo : DataTypes.INTEGER,
      creatividad : DataTypes.INTEGER,
      lucha : DataTypes.INTEGER,
      corners : DataTypes.INTEGER,
      centros : DataTypes.INTEGER,
      regate : DataTypes.INTEGER,
      remate : DataTypes.INTEGER,
      primerToque : DataTypes.INTEGER,
      lanzadorFaltas : DataTypes.INTEGER,
      rematesCabeza : DataTypes.INTEGER,
      tirosLejanos : DataTypes.INTEGER,
      saquesLargoLateral : DataTypes.INTEGER,
      marcaje : DataTypes.INTEGER,
      pases : DataTypes.INTEGER,
      penalty : DataTypes.INTEGER,
      entradas : DataTypes.INTEGER,
      tecnica : DataTypes.INTEGER,
     /*  adadptabilidad : DataTypes.INTEGER,
      ambicion : DataTypes.INTEGER,
      resistencia : DataTypes.INTEGER,
      polemica : DataTypes.INTEGER,
      lealtad : DataTypes.INTEGER,
      presion : DataTypes.INTEGER,
      profesionalidad : DataTypes.INTEGER,
      deportividad : DataTypes.INTEGER,
      temperamento : DataTypes.INTEGER,
      reputacionMundial: DataTypes.INTEGER, */
    
    },
    {
      sequelize,
      modelName: "Jugador",
      tableName: "jugadores",
      timestamps: false,
    }
  );
  return Jugador;
};

/*

idFmrte	nombre	nacionalidad_id	equipo_id	altura	peso	ca	cp	valor	edad	posiciones	velocidad	aceleracion	agilidad	
equilibrio	salto	habZurda	formaNatural	habDiestra	resistencia	fuerza	pbalonesAereos	pmandoArea	pcomunicacion	pexentricidad	
psaquesManos	psaquesPuerta	punoContraUno	preflejos	psalidas	psalidaDePuños	pAgarreBalon	agresividad	anticipacion	valentia	
serenidad	concentracion	deciciones	determinacion	talento	influencia	desmarques	colocacion	trabajoEquipo	creatividad	
lucha	corners	centros	regate	remate	primerToque	LanzadorFaltas	rematesCabeza	tirosLejanos	saquesLargoLateral	
marcaje	pase	penalty	entradas	tecnica


*/
