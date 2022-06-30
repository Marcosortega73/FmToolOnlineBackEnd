/*
*
* NOTA: no se pudo vincular con middleware
*
const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();
const { createJugadoresBase} = require('../controllers/uploadsArchivos')
const uploadFiles = require('../middlewares/fileManager');
router.post('/', uploadFiles , (req, res) => {
    res.send(req.file)
}
)
module.exports = router 
*
*
*
*/


const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();
const { createJugadoresBase, createEquiposBase} = require('../controllers/uploadsArchivos')
const fs = require('fs')
const pathRouter = `${__dirname}`
const path = require('path')

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        var ruta =  path.join(pathRouter,'..','data','uploads','baseJugadores')
        console.log(ruta)
        if(!fs.existsSync(ruta)){
            fs.mkdirSync(ruta)
        }
        cb(null, ruta)  // ruta donde se guardara el archivo
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname) // nombre del archivo
    }
}
)

const upload = multer({storage }) // nombre del input


router.post('/jugadores', upload.single('file') , createJugadoresBase)
router.post('/equipos', upload.single('equipo') , createEquiposBase)


module.exports = router