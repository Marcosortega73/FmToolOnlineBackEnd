const jwt = require('jsonwebtoken')

const generateToken = (uid) => {
    const expiresIn = 60 * 60 * 24 
     try {
        const token = jwt.sign({ uid }, process.env.SECRET, { expiresIn});
        return {token,expiresIn};
    } catch (e) {
        throw new Error(e); 
    }
}

const generateRefreshToken = (uid,res) => {
    const expiresIn = 60 * 60 * 24 * 30;
    try {
        const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, { expiresIn});

        res.cookie('refreshToken', refreshToken, {
            expires: new Date(Date.now() + expiresIn*1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });

        
    } catch (e) {
        throw new Error(e);
    }
}

const tokenVerificationError = {
    "ivalidToken": "Token no valido",
    "expiredToken": "Token Expirado",
    "invalidSignature": "Token Invalido",
    "invalidIssuer": "Token Invalido",
    "No Bearer": "Utiliza formato bearer",
    "jwt malformed": "Token malformado",
}
module.exports = {generateRefreshToken, generateToken, tokenVerificationError};