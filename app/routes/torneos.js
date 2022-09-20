const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();
const {getItems,getItem,createItems,updateItems,deleteItems,getTiposTorneos} = require('../controllers/torneos')

router.get('/obtenerTorneos', getItems )

router.get('/:id', getItem)

router.post('/crearTorneo', createItems)

//getTiposTorneos
router.post('/tipo', getItems)


router.patch('/actualizarTorneo/:id', updateItems)

router.delete('eliminarTorneo/:id', deleteItems)


module.exports = router