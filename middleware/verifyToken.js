const jwt = require('jsonwebtoken');
const { getToken } = require('../util/token');

module.exports = function verifyToken(req, res, next) {
  const token = getToken( req ); 
    console.log(token);
    if(!token) return res.status(401).send('Access denied!');
    try {
        const verified = jwt.verify(token,process.env.TOKEN_SECRECT);
        req.user = verified;
        return next();
    } catch (err) {
        console.log(err);
        return res.status(400).send('Invalid Token');
    }
}; 