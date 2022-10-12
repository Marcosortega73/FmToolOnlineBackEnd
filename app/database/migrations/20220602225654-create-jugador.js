'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Jugadores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      idFmrte: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nacionalidad_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Nacionalidades',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      equipo_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'Equipos',
          key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'

    },
      altura: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      peso: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ca: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      cp: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      valor: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      edad : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      posiciones: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      velocidad: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      aceleracion: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      agilidad: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      equilibrio: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      salto: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      habZurda : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      habDiestra : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      formaNatural : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      resistencia : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      fuerza : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      pBalonesAereos : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      pMandoArea : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      pComunicacion : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      pExentricidad : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      pSaquesManos : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      pSaquesPuerta : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      pUnoContraUno : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      pReflejos : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      pSalidas : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      pSalidaDePuños : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      pAgarreBalon : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      agresividad : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      anticipacion : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      valentia  : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      serenidad : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      concentracion : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      deciciones  : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      determinacion : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      talento : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      influencia : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      desmarques : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      colocacion : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      trabajoEquipo : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      creatividad : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      lucha : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      corners : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      centros : { 
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      regate : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      remate : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      primerToque : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      lanzadorFaltas : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      rematesCabeza : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      tirosLejanos : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      saquesLargoLateral : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      marcaje : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      pases : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      penalty : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      entradas : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      tecnica : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      adadptabilidad : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      ambicion : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      resistencia : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      polemica : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      lealtad : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      presion : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      profesionalidad : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      deportividad : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      temperamento : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      reputacionMundial : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      fechaNacimiento : {
        type: Sequelize.DATE,
        allowNull: true,
      },
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Jugadores');
  }
};