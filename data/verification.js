const Jwt = require("jsonwebtoken");
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;
// NOT PERMITABLE FOR A REAL WORLD APPLICATION USE A .DOTENV FILE INSTEAD

function verifyUser(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ error: "Access Denied" });

  try {
    const verified = Jwt.verify(token, SECRET_KEY);
    req.user = verified;
    console.log(req.user);
    next();
  } catch (error) {
    res.status(400).send("Access Denied");
  }
}

const verifyToken = (req, res, next) => {

  var token = req.headers['auth-token'];
  if(!token) return res.status(401).send({
    auth: false,
    message: 'No token provided.'
  })

  Jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if(err) return res.status(500).send({
      auth: false,
      message:'Failed to authenticate token'
    })

    console.log('decoded user is ' + decoded);
    next();
  })
};

module.exports =  {
  verifyToken,
  verifyUser
};
