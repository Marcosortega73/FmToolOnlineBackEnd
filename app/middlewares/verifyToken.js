const jwt =require('jsonwebtoken');
const { tokenVerificationError } = require('../utils/tokenManager.js');

//middelware


const verifyToken = (req,res,next) => {
    console.log("LLEGANDO verify", req.headers)

    let token;

    let authHeader = undefined;
    if(req.headers.authorization)
    {
        authHeader = req.headers.authorization;
    }else
    {
        if(req.get('Authorization'))
        {
            authHeader = req.get('Authorization');
        }
    }

    console.log("22 llega a AUTH", authHeader);
    if(!authHeader)
    {
        const error = new Error('No autenticado, necesita hacer login.');
        error.statusCode = 401;
        throw error;
    }

    token = authHeader

    if(!token){
        throw new Error('No Bearer')
    }
    if(token){
        token = token.split(" ")[1];

        
        console.log("==================================>>>>>>",token)

        try{
            const payload = jwt.verify(token,process.env.SECRET)
            req.uid = payload.uid
            console.log("DENTRO DEL TRY", req.uid)
            console.log("payload",payload)
            next()
            
        }catch(e){
           
            return res.status(401)
            .send({error:tokenVerificationError[e.message]})
        }
    }
}

module.exports = verifyToken;