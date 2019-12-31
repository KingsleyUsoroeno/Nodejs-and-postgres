const Jwt = require("jsonwebtoken");
const SECRET_KEY = "asterix-needs-permit-a-38";
// NOT PERMITABLE FOR A REAL WORLD APPLICATION USE A .DOTENV FILE INSTEAD

function verifyUser(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ error: "Access Denied" });

  try {
    const privateKey = process.env.TOKEN_SECRET || SECRET_KEY;
    const verified = Jwt.verify(token, privateKey);
    req.user = verified;
    console.log(req.user);
    next();
  } catch (error) {
    res.status(400).send("Access Denied");
  }
}

const verifyToken = (req, res, next) => {
  const token = req.query.token;
  // console.log(`user token is ` + token);

  // Jwt takes the token and verifies it , if the token is verified with an error we throw a 401 ,
  // unauthorised error
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      // 401 Unauthorized -- 'Incorrect token'
      res.status(401).json({
        message: "user is unAuthorised"
      });
    }else{
      req.user = decoded;
    }
    console.log(req.user);
    
    next();
  });
};

module.exports =  {
  verifyToken,
  verifyUser
};
