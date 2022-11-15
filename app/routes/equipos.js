const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();
const {getItems,getEquipos,createItems,updateItems,deleteItems,equiposxnacion,getEquiposTorneos} = require('../controllers/equipos')

router.get('/obtenerEquipos', getItems )

router.get('/getEquiposTorneos', getEquipos)

router.post('/createEquipo',verifyToken, createItems)

//continente_id
router.get('/equiposxnacion/:id', equiposxnacion)

//equiposSearch
router.get('/equiposSearch/:search', getItems)


router.put('/:id', updateItems)


router.delete('/deleteEquipo/:id', deleteItems)


module.exports = router