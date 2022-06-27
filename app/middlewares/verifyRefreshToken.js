const { tokenVerificationError } = require("../utils/tokenManager");
const jwt = require("jsonwebtoken");

const verifyRefreshToken = (req, res, next) => {
    try { 
        const refreshTokenCookie = req.cookies.refreshToken;
        if(!refreshTokenCookie) throw new Error("No hay token");
        const {uid} = jwt.verify(refreshTokenCookie,process.env.JWT_REFRESH);
        req.uid = uid;
        next(); 
      } catch (e) {   
        return res.status(401)
        .send({error:tokenVerificationError[e.message]})
    }
  }

module.exports = verifyRefreshToken;