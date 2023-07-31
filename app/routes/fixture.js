const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();
const {getItems,getItem,getItemsFilterView,createItems,createItemsExcel,updateItems,deleteItems,confirmCretateFixture,getItemsFilter,resetItem} = require('../controllers/fixture')

router.get('/obtenerFixture', getItems )
router.get('/fixtureByTorneo/:id', getItem)
router.get('/filtros/:id', getItemsFilter )
router.get('/filtrosView/:id', getItemsFilterView )

router.post('/crearFixture', createItems)
router.post('/crearFixtureByExcel', createItemsExcel)
router.post('/confirmarFixture', confirmCretateFixture)
router.post('/tipo', getItems)
router.post('/actualizarPartido', updateItems)


router.delete('eliminarTorneo/:id', deleteItems)
router.put('/resetPartido/:id', resetItem)



module.exports = router