const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    const passedToken = req.header('auth-token');
    if(!token || (token && (passedToken != token.accessToken)))
        return res.status(401).send({status: "error", message: "unauthorized.."});
        try {
            const verify_Token = jwt.verify(token.accessToken, process.env.JWT_KEY);
            req.user = verify_Token;
            next();
        } catch (error) {
            const err = error.message;
            res.status(401).send({status: "error", message: "invalid token!"})
        }
}

module.exports = verifyToken;