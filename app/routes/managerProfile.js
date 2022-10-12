const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();
const {verifyMail,getItem,validateMail,updateEmail,deleteItems,updateProfile,updatePassword,updateUsername} = require('../controllers/managerProfile')

router.get('/verifyMail',verifyToken, verifyMail )

router.get('/:id', getItem)

router.post('/validateMail',verifyToken, validateMail)

router.put('/updateClient',verifyToken,updateEmail)


router.put('/changePassword',verifyToken,updatePassword)


router.put('/updateUsername',verifyToken,updateUsername)



router.put('/updateProfile',verifyToken,updateProfile)


router.delete('/deleteEquipo/:id', deleteItems)


module.exports = router