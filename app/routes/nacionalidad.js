const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();
const {getItems,getItem,createItems,updateItems,deleteItems,getItemsbyRegion} = require('../controllers/nacionalidades')

router.get('/obtenerNacionalidades', getItems )

router.get('/:id', getItem)

router.post('/', createItems)

//nacionalidadxregion
router.get('/nacionalidadxregion/:id', getItemsbyRegion)


router.patch('/:id', updateItems)

router.delete('/:id', deleteItems)


module.exports = router