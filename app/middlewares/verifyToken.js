const jwt =require('jsonwebtoken');
const { tokenVerificationError } = require('../utils/tokenManager.js');

//middelware


const verifyToken = (req,res,next) => {
    console.log("LLEGANDO verify", req.headers)
    let token = req.headers['authorization']

    if(!token){
        throw new Error('No Bearer')
    }
    if(token){
        token = token.split(" ")[1];
        console.log(token)

        try{
            const payload = jwt.verify(token,process.env.SECRET)
            req.uid = payload.uid
            next()
            
        }catch(e){

           
            return res.status(401)
            .send({error:tokenVerificationError[e.message]})
        }
    }
}

module.exports = verifyToken;