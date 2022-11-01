const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();
const {getItems,createItems,getGoleadoresByTorneo} = require('../controllers/estadisticas')

router.get('/obtenerEstadisticas', getItems )

router.post('/cargarEstadisticas',createItems);



router.get('/obtenerGoleadores/:id', getGoleadoresByTorneo);


module.exports = router