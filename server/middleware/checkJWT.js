const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const axios = require("axios");
const { checkout } = require("../routes/userRoutes");

const { auth } = require('express-oauth2-jwt-bearer');

// const verifyJWT = jwt(
//     {
//         secret: jwks.expressJwtSecret({
//             cache: true,
//             rateLimit: true,
//             jwksRequestsPerMinute: 5,
//             jwksUri: 
//         }),
//         audience: "http://localhost:3000/api",
//         algorithms: ["RS256"],
//         issuer: "https://dev-0lt12h56mf6ceiaa.us.auth0.com/"
//     }
// )

const jwtCheck = auth({
    audience: 'http://localhost:3000/api',
    issuerBaseURL: 'https://dev-0lt12h56mf6ceiaa.us.auth0.com/',
    tokenSigningAlg: 'RS256'
  });
  
module.exports = jwtCheck;













