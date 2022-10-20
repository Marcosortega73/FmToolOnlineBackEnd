const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();
const {getItems,getItem,createItems,updateItems,deleteItems,confirmCretateFixture,getItemsFilter} = require('../controllers/fixture')

router.get('/obtenerFixture', getItems )

//prueba
/* router.get('/get', ((req,res)=>{
    res.send('hola')
}) ) */

router.get('/fixtureByTorneo/:id', getItem)

router.get('/filtros/:id', getItemsFilter )

router.post('/crearFixture', createItems)

router.post('/confirmarFixture', confirmCretateFixture)


//getTiposTorneos
router.post('/tipo', getItems)


router.post('/actualizarPartido', updateItems)

router.delete('eliminarTorneo/:id', deleteItems)



module.exports = router