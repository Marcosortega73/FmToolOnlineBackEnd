const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();
const {getItems,getItem,createItems,updateItems,deleteItems} = require('../controllers/seasons')

router.get('/obtenerSeasons', getItems )

router.get('/:id', getItem)

router.post('/crearSeason', createItems)


router.patch('/actualizarSeason/:id', updateItems)

router.delete('eliminarSeason/:id', deleteItems)


module.exports = router