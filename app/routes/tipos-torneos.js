const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();
const {getTiposTorneos} = require('../controllers/torneos')


//getTiposTorneos
router.get('/obtenerTipos', getTiposTorneos)


module.exports = router