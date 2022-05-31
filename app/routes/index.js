const express = require('express');
const router = express.Router();
const fs = require('fs')

const pathRouter = `${__dirname}`;


const removeExtension = (fileName) =>{
    return fileName.split('.').shift()
}

fs.readdirSync(pathRouter).filter((file)=>{

    const newFile = removeExtension(file)
    const skipe = ['index'].includes(newFile)

    if(!skipe){

        router.use(`/${newFile}`, require(`./${newFile}`))

        console.log('Cargar Ruta ',newFile)
    }
    

router.get('*', (req,res)=>{
    res.status(404),
    res.send({error:'No Existe La Ruta'})
})
})


module.exports = router