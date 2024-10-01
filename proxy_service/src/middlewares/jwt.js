const { CognitoJwtVerifier } = require('aws-jwt-verify');
const config = require('../config/config')

const verifier = CognitoJwtVerifier.create({
    userPoolId: "us-west-2_K8R8OCoCQ",
    tokenUse: "access",
    clientId: config.canidateClientId
})

// Middleware to check if JWT token is provided, validate it, and extract user
const checkJwt = async (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Typically, the token is provided as "Bearer <token>"
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Malformed token' });
  }

  try {
    const payload = await verifier.verify(token);
    req.user = payload
    console.log(payload)
    
    next()
  } catch {
    return res.status(401).json({ message: "Invalid or Expired Token" })
  }
};

module.exports = checkJwt;
