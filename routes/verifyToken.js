const jwt = require('jsonwebtoken');

module.exports = function(req, res, ext){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access denied!');
}

try {
    const verified = jwt.verify(token,process.env.TOKEN_SECRECT);
    req.user = verify;
} catch (err) {
    res.status(400).send('Invalid Token');
}