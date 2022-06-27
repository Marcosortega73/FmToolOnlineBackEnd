const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();
const {getItems,getItem,createItems,updateItems,deleteItems} = require('../controllers/jugadores')

router.get('/obtenerJugadores' , getItems )

router.get('/:id', getItem)

router.post('/crearJugador',verifyToken, createItems)

router.put('/:id', updateItems)

router.delete('/eliminarJugador/:id', deleteItems)


module.exports = router