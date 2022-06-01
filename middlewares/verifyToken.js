const jwt =require('jsonwebtoken')

//middelware


const verifyToken = (req,res,next) => {
    let token = req.headers['authorization']

    if(!token){
        throw new Error('No Bearer')
    }

    if(token){
        token = token.split(" ")[1];
        console.log(token)

        try{
            const payload = jwt.verify(token,process.env.SECRET)
            console.log(payload)
            req.uid = payload.uid
            next()
            
        }catch(e){

            const TokenVerificationError = {
                "ivalidToken": "Token no valido",
                "expiredToken": "Token Expirado",
                "invalidSignature": "Token Invalido",
                "invalidIssuer": "Token Invalido",
                "No Bearer": "Utiliza formato bearer",
                "jwt malformed": "Token malformado",
            }
            return res.status(401)
            .send({error:TokenVerificationError[e.message]})
        }
    }

   
}

module.exports = verifyToken;