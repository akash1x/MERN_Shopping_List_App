if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  //Check for token
  if (!token)
    return res.status(401).json({ msg: "No Token,authorization denied" }); //401 : unauthorized access to a some page
  try {
    //Verify token
    const decoded = jwt.verify(token, process.env.jwtSecret);
    // Add user from payload
    //payload is having user id as we have set while signing the jwt
    console.log("Decode" + decoded.id);
    req.user = decoded;
    next();
  } catch {
    res.status(400).json({ msg: "Token not valid" });
  }
}

module.exports = auth;
