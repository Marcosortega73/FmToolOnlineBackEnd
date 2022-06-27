const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();
const {getItems,getItem,createItems,updateItems,deleteItems} = require('../controllers/equipos')

router.get('/obtenerEquipos', getItems )

router.get('/:id', getItem)

router.post('/createEquipo',verifyToken, createItems)


router.patch('/:id', updateItems)


router.delete('/:id', deleteItems)


module.exports = router