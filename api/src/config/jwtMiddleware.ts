const { expressjwt: jwt } = require("express-jwt");
const jwks = require("jwks-rsa");

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 15,
    jwksUri: "https://dev-nxuk8wmn.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://juka-production.up.railway.app/",
  issuer: "https://dev-nxuk8wmn.us.auth0.com/",
  algorithms: ["RS256"],
});

export default jwtCheck;
