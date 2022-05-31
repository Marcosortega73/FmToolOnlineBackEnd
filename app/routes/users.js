const express = require('express');
const router = express.Router();
const {getItems,getItem,createItems,updateItems,deleteItems} = require('../controllers/users')

router.get('/', getItems )
router.get('/:id', getItem)
router.post('/', createItems)
router.patch('/:id', updateItems)
router.delete('/:id', deleteItems)


module.exports = router