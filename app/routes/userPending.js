const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken.js');
const {registerPending,getItems,rechazarItems,filterUserpending,loginUsers,getDataUser} = require('../controllers/userPending');

router.post('/register', registerPending);

//obtener usuarios agregar verify token

router.get('/getUsersPending', getItems);
router.get('/dataUser',verifyToken, getDataUser);

//get filter userpending
router.get('/filterUserpending/:filter', filterUserpending);

//rechazar
router.put('/rechazar', rechazarItems);

router.post('/login', loginUsers);




module.exports = router