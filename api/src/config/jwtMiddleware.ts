require("dotenv").config();
const JWKS_URI = process.env.JWKS_URI;
const JWT_ISSUER = process.env.JWT_ISSUER;
const { expressjwt: jwt } = require("express-jwt");
const jwks = require("jwks-rsa");

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri: JWKS_URI,
  }),
  audience: "https://cattle-tracker-api.com",
  issuer: JWT_ISSUER,
  algorithms: ["RS256"],
});

export default jwtCheck;
