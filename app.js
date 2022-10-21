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

//Hola mundo
app.use('/holaMundo', (req, res) => {
    res.send('Hola Mundo')
}
)

//prueba luis
/* app.use('/test', (req, res) => {

    const arrObject = [
        {
            nombre: 'Federico',
            apellido: 'Montero',
            edad: 25
        },
        {
            nombre: 'Federico',
            apellido: 'Montero',
            edad: 25
        },
        {
            nombre: 'Federico',
            apellido: 'Montero',
            edad: 26
            
        },
        {

            nombre: 'Federico',
            apellido: 'Montero',
            edad: 27
        }
      ]
       
            21/10/2022	 0:00	C-Planta	L2	DOC:	34162096	DIAZ	GUSTAVO	HENISA
            21/10/2022	 0:00	C-Planta	L2	DOC:	39497107	FROLA MENDIZABAL	FLORENCIA	HENISA
            21/10/2022	 0:00	C-Planta	L2	DOC:	39497107	FROLA MENDIZABAL	FLORENCIA	HENISA
            21/10/2022	 0:00	C-Planta	L2	DOC:	28238450	ARGUELLO	DIEGO	HENISA
            21/10/2022	 0:00	C-Planta	L2	DOC:	16542086	VELEZ	DANIEL	HENISA
            21/10/2022	 0:00	C-Planta	L2	DOC:	44794631	BENITEZ	RAMIRO	HENISA
      
      const arrObject2 = [
        {
            fecha: '21/10/2022',
            hora: '0:00',
            area: 'C-Planta',
            linea: 'L2',
            doc: '34162096',
            apellido: 'DIAZ',
            nombre: 'GUSTAVO',
            empresa: 'HENISA'
        },
        {

            fecha: '21/10/2022',
            hora: '0:00',
            area: 'C-Planta',
            linea: 'L2',
            doc: '39497107',
            apellido: 'FROLA MENDIZABAL',
            nombre: 'FLORENCIA',
            empresa: 'HENISA'
        },
        {
           
            fecha: '21/10/2022',
            hora: '0:00',
            area: 'C-Planta',
            linea: 'L2',
            doc: '39497107',
            apellido: 'FROLA MENDIZABAL',
            nombre: 'FLORENCIA',
            empresa: 'HENISA'
        },
        {
           
            fecha: '21/10/2022',
            hora: '0:00',
            area: 'C-Planta',
            linea: 'L2',
            doc: '28238450',
            apellido: 'ARGUELLO',
            nombre: 'DIEGO',
            empresa: 'HENISA'
        },
        {

            fecha: '21/10/2022',
            hora: '0:00',
            area: 'C-Planta',
            linea: 'L2',
            doc: '16542086',
            apellido: 'VELEZ',
            nombre: 'DANIEL',
            empresa: 'HENISA'
        },
        {

            fecha: '21/10/2022',
            hora: '0:00',
            area: 'C-Planta',
            linea: 'L2',
            doc: '44794631',
            apellido: 'BENITEZ',
            nombre: 'RAMIRO',
            empresa: 'HENISA'
        }
      ]

      var arrObject3 = arrObject2 

      //comparar la hora de entrada y salida y si hay repetidos

      for (let i = 0; i < arrObject2.length; i++) {
        var element = arrObject2[i];
        console.log(element)
        for (let j = 1; j < arrObject2.length; j++) {
            var element2 = arrObject2[j];
            if(element.doc === element2.doc && element.fecha === element2.fecha && element.hora === element2.hora){
                console.log('repetido')
                //borrar el repetido y sumarle 1 a la cantidad
                arrObject3.splice(j, 1)
                console.log(arrObject3)



            }
        }
      } 




      //comparar objetos dentro de un array
    res.send(arrObject3)
}) */


//Usar Rutas
app.use('/api', routes)



app.listen(PORT, () => console.log(`Comenzando proyecto final en http://localhost:${PORT} !`))


module.exports = app;