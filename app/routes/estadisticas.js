const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();
const {getItems,cargarRojas,cargarGoleadores,cargarAsistencias,cargarAmarillas,cargarMvp,getGoleadoresByTorneo,cargarLesionRoja,cargarLesionNaranja} = require('../controllers/estadisticas')

router.get('/obtenerEstadisticas', getItems )

router.post('/cargarRojas',cargarRojas);


//amarillas
router.post('/cargarAmarillas',cargarAmarillas);

router.post('/cargarLesionNaranja',cargarLesionNaranja)

router.post('/cargarLesionRoja',cargarLesionRoja)

router.post('/cargarMvp',cargarMvp)

//Goleador
router.post('/cargarGoleadores',cargarGoleadores)

//asistencias
router.post('/cargarAsistencias',cargarAsistencias)


router.get('/obtenerGoleadores/:id', getGoleadoresByTorneo);


module.exports = router