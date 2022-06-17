const jwt = require('jsonwebtoken');

const key = process.env.TOKEN_KEY || "4nbiu$%$2c67r7#GH@!gr2^%FGVC#RT@S@"

function generateAccessToken(obj) {
    return jwt.sign(obj, key, { expiresIn: '1800s' });
  }


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, key, (err,obj) => {
    //   console.log(err)
      if (err) return res.sendStatus(403)
      req=obj
      next()
    })
  }

  module.exports = {generateAccessToken,authenticateToken}

  