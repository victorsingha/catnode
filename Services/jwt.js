const jwt = require('jsonwebtoken');

const key = process.env.TOKEN_KEY || "4nbiu$%$2c67r7#GH@!gr2^%FGVC#RT@S@"

function generateAccessToken(obj) {
    return jwt.sign(obj, key, { expiresIn: '6400s' });
  }


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.status(401).send({StatusCode:'F',StatusMessage:"Unauthorized"});
  
    jwt.verify(token, key, (err,obj) => {
      if (err) return res.status(403).send({StatusCode:'F',StatusMessage:"Forbidden"});
      req=obj
      next()
    })
  }

  module.exports = {generateAccessToken,authenticateToken}

  