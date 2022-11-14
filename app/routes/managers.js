const express = require('express');
const router = express.Router();
const {getItems,createItems,updateItems,deleteItems,getManagers} = require('../controllers/managers.js')

router.get('/obtenerManagers', getItems )
router.post('/register', createItems)
router.get('/getManagers', getManagers)
router.patch('/:id', updateItems)
router.delete('/:id', deleteItems)


module.exports = router