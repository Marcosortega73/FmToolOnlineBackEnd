const res = require("express/lib/response");

const httpError = (res,err)=>{
    console.log(err)
    res.status(500,err);
    res.send({error:'Error en el Servidor'})
}


const obtenerRespuestas= (codigo) =>{
    switch(codigo){
        case 200:
            return {
                message:'OK',
                status:200
            }
        case 401:
            return {
                message:'Sin autorizacion',
                status:401
            }
        case 404:
            return {
                message:'No existe el recurso',
                status:404
            }
        case 500:
            return {
                message:'Erron interno del servidor',
                status:500
            }
        default:
            return {
                message:'Error en el Servidor',
                status:500


    }

    }
}

const messageError = (codigo) =>{
    switch(codigo){
        case 001:
            return 'No se pudo crear el usuario'
        case 002:
            return 'No se pudo actualizar el usuario'
        case 003:
            return 'No se pudo eliminar el usuario'
        case 004:
            return 'No se pudo obtener el usuario'
        case 005:
            return 'No se pudo obtener los usuarios'
        case 006:
            return 'No se pudo obtener el usuario por id'
        case 007:
            return 'No se pudo obtener el usuario por nombre'
            break;
      /*   case 008:
            return 'No se pudo obtener el usuario por email';
        case 009:
            return 'No se pudo obtener el usuario por password'
        case 010:
            return 'No se pudo obtener el usuario por nacionalidad'
        case 011:
            return 'No se pudo obtener el usuario por club'
        case 012:
            return 'No se pudo obtener el usuario por altura'
        case 013:
            return 'No se pudo obtener el usuario por peso'
        case 014:
            return 'No se pudo obtener el usuario por ca'
        case 015:
            return 'No se pudo obtener el usuario por cp'
        case 016:
            return 'No se pudo obtener el usuario por valor'
        case 017:
            return 'No se pudo obtener el usuario por id'
        case 018:
            return 'No se pudo obtener el usuario por id'
        case 019:
            return 'No se pudo obtener el usuario por id'
        case 020:
            return 'No se pudo obtener el usuario por id'
        case 021:
            return 'No se pudo obtener el usuario por id'
        case 022:
            return 'No se pudo obtener el usuario por id'
        case 023:
            return 'No se pudo obtener el usuario por id'
        case 024:
            return 'No se pudo obtener el usuario por id'
        case 025:
            return 'No se pudo obtener el usuario por id' */ 
            default:
            return 'Error en el Servidor'
    }
}








module.exports = {httpError,obtenerRespuestas, messageError};