const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();
const {getItems,getItem,createItems,cargarEstadisticas,getManagerBySeason,getJugadoresBySeason,getEquiposBySeason,updateItems,deleteItems} = require('../controllers/seasons')

router.get('/obtenerSeasons', getItems )

router.get('/:id', getItem)

router.get('/getJugadoresBySeason/:id', getJugadoresBySeason)
//getManagerBySeason

router.get('/getManagerBySeason/:id', getManagerBySeason)

router.get('/getEquiposBySeason/:id', getEquiposBySeason)

router.post('/crearSeason', createItems)
router.post('/cargarEstadisticas', cargarEstadisticas)


router.patch('/actualizarSeason/:id', updateItems)

router.delete('eliminarSeason/:id', deleteItems)


module.exports = router