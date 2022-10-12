const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();
const {getItems,getItem,createItems,updateItems,deleteItems,confirmCretateFixture} = require('../controllers/fixture')

router.get('/obtenerTorneos', getItems )

router.get('/:id', getItem)

router.post('/crearFixture', createItems)

router.post('/confirmarFixture', confirmCretateFixture)


//getTiposTorneos
router.post('/tipo', getItems)


router.patch('/actualizarTorneo/:id', updateItems)

router.delete('eliminarTorneo/:id', deleteItems)



module.exports = router