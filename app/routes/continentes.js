const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();
const {getItems,getItem,createItems,updateItems,deleteItems} = require('../controllers/continentes')

router.get('/obtenerContinentes', getItems )

router.get('/:id', getItem)

router.post('/', createItems)

router.patch('/:id', updateItems)

router.delete('/:id', deleteItems)


module.exports = router