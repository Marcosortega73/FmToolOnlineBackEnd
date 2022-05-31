'use strict'
require('dotenv').config()

const express = require('express')

// importacion de middlewares
const helmet = require('helmet')
var cors = require('cors')
var logger = require('morgan')


//Importar Rutas
const routes = require('./app/routes')


const app = express()
const PORT = process.env.PORT || 5000

var corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }

//middlewares
app.use(cors(corsOptions))
app.use(helmet());
app.use(logger('tiny'))

//Para leer .json
app.use(express.json())



// app.get('/', (req, res) => res.send('hola mundo'))

//Usar Rutas
app.use('/api', routes)

app.listen(PORT, () => console.log(`Comenzando proyecto final en http://localhost:${PORT} !`))


module.exports = app;