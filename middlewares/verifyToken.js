const jwt =require('jsonwebtoken')

//middelware


const verifyToken = (req,res,next) => {
    let token = req.headers['authorization']

    if(token){
        token = token.split(" ")[1];
        console.log(token)

        try{
            const verificadoOk = jwt.verify(token, process.env.SECRET)

            next();
        }catch(e){

            res.status(400).json({error: true, mensaje: "Token Invalido"})
        }
    }

   
}

module.exports = verifyToken;