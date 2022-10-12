const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();
const {getItems,getItemById,createItems,updateItems,deleteItems,getTiposTorneos,createEquiposByTorneo} = require('../controllers/torneos')

router.get('/obtenerTorneos', getItems )


router.post('/crearTorneo', createItems)

//getTiposTorneos
router.post('/tipo', getItems)

//getTorneoById
router.get('/obtenerTorneo/:id', getItemById)


router.patch('/actualizarTorneo/:id', updateItems)

router.delete('eliminarTorneo/:id', deleteItems)

router.post('/crearEquiposByTorneo', createEquiposByTorneo)



module.exports = router