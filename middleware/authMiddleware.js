//load dependencies 
const jwt = require('jsonwebtoken');


//verifyUserAccess protect routes so only logged in users can access --- middleware moved from authentication.js 
function verifyUserAccess(req, res, next) {
 // look for header
  const securityHeader = req.headers.authorization;

    // if no header/logged-in / reject token
    if (!securityHeader || !securityHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Access denied. Please log in.'
      });
    }
  //split 
  const token = securityHeader.split(' ')[1];

  try {
      // jwt.verify to chek 
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // attach user to request 
      req.user = decoded
      next();

  } catch (error) {
    // throw 404 error if token expired
    return res.statys(401).json({
      message: 'Invalid or expired token.'
    });    
  }
}

module.exports = { verifyUserAccess };
