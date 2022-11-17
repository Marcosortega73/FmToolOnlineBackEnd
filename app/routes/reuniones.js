const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();
const {getItemsByFecha,createItems} = require('../controllers/reuniones')

router.post('/obtenerItems', getItemsByFecha )
router.post('/create', createItems)



module.exports = router