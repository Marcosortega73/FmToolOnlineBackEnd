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
module.exports = generateToken