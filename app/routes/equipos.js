const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();
const {getItems,getItem,createItems,updateItems,deleteItems,equiposxnacion} = require('../controllers/equipos')

router.get('/obtenerEquipos', getItems )

router.get('/:id', getItem)

router.post('/createEquipo',verifyToken, createItems)

//continente_id
router.get('/equiposxnacion/:id', equiposxnacion)


router.put('/:id', updateItems)


router.delete('/deleteEquipo/:id', deleteItems)


module.exports = router