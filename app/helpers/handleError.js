const res = require("express/lib/response");

const httpError = (res,err)=>{
    console.log(err)
    res.status(500);
    res.send({error:'Error en el Servidor'})
}

module.exports = {httpError};