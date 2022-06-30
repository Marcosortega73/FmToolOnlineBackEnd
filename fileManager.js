
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const uploadFiles = () => {
console.log(__dirname)
const storage = multer.diskStorage({
    
    destination: 
    (req, file, cb)=>{
        var carpeta =req.file.originalname
        var ruta = '../../uploads/'+carpeta
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

return storage


}
module.exports = uploadFiles






