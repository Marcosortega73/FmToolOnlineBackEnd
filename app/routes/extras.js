const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();
const {getUsersStates,getDashboard} = require('../controllers/extrasController')

router.get('/usersState', getUsersStates )
router.get('/obtenerDashboard', getDashboard )


module.exports = router