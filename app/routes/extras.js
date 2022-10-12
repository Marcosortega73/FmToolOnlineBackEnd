const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();
const {getUsersStates} = require('../controllers/extrasController')

router.get('/usersState', getUsersStates )


module.exports = router