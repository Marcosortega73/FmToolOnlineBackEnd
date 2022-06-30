const fs = require('fs')
const pathRouter = `${__dirname}`
const path = require('path')

const multer = require('multer');

const uploadFiles = async () => {
console.log(pathRouter)

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        var ruta =  path.join(pathRouter,'..','data','uploads','baseJugadores')
        console.log(ruta)
        if(!fs.existsSync(ruta)){
            fs.mkdirSync(ruta)
        }
        cb(null, ruta)
    },

    filename: (req, file, cb)=>{
        cb(null, file.originalname)
    }
}
)
const upload = multer({storage }).single('file')

return upload
}

module.exports = uploadFiles