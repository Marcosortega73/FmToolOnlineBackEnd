'use strict'
require('dotenv').config()

const express = require('express')

// importacion de middlewares
const helmet = require('helmet')
var cors = require('cors')
var logger = require('morgan')



//Importar Rutas
const routes = require('./app/routes')

var  cookieParser  =  require ( 'cookie-parser' );



const app = express()
const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
  }

//middlewares
app.use(cors(corsOptions))

app.use(cookieParser())
const PORT = process.env.PORT || 5000


app.use(helmet());
app.use(logger('tiny'))

//Para leer .json
app.use(express.json())
app.use(express.urlencoded({ extended: false }))



//Usar Rutas
app.use('/api', routes)



app.listen(PORT, () => console.log(`Comenzando proyecto final en http://localhost:${PORT} !`))


module.exports = app;