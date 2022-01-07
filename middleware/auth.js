import jwt from "jsonwebtoken";


const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    !token && res.status(401).send("access denied")
  
    token &&
    jwt.verify(token, process.env.JWT_SECRET, (err, verifiedToken) => {
      err && res.status(403).json({message:err.message})
      req.tokenExp = verifiedToken.exp
      req.role = verifiedToken.role
      req.uid = verifiedToken.uid
      next()
    })

  } catch (error) {
    return res.status(500)
  }
};

export default auth;