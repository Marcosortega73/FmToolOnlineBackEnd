const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();
const {getItems} = require('../controllers/estadisticas')

router.get('/obtenerEstadisticas', getItems )


module.exports = router