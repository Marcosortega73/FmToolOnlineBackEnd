const express = require('express');
const router = express.Router();
const {refreshToken,getItems,logout,getItem,createItems,updateItems,deleteItems, getUserAdmin} = require('../controllers/administradores.js');
const { bodyRegisterValidator, bodyLoginValidator } = require('../middlewares/validatorManager.js');
const verifyRefreshToken = require('../middlewares/verifyRefreshToken.js');
const verifyToken = require('../middlewares/verifyToken.js');

router.get('/refresh',verifyRefreshToken, refreshToken)

router.get('/getUsers', getItems)

router.post('/login',bodyLoginValidator,getItem )

router.get('/dataUser',verifyToken, getUserAdmin)

router.get('/logout',verifyToken, logout)

router.post('/register',bodyRegisterValidator, createItems)

router.patch('/:id', updateItems)

router.delete('/:id', deleteItems)


module.exports = router