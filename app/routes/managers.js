const express = require('express');
const router = express.Router();
const {getItem,createItems,updateItems,deleteItems} = require('../controllers/managers.js')

router.get('/', getItem )
router.post('/', createItems)
router.patch('/:id', updateItems)
router.delete('/:id', deleteItems)


module.exports = router