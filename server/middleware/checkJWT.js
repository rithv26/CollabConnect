const { auth } = require('express-oauth2-jwt-bearer');

const jwtCheck = auth({
    audience: 'http://localhost:3000/api',
    issuerBaseURL: 'https://dev-0lt12h56mf6ceiaa.us.auth0.com/',
    tokenSigningAlg: 'RS256'
  });
  
module.exports = jwtCheck;