//descargar un archivo
const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();



router.get('/download/:file', (req, res) => {
    const file = `${__dirname}/../data/plantillas/${req.params.file}`;
    res.download(file); // Set disposition and send it.
    


});

module.exports = router
