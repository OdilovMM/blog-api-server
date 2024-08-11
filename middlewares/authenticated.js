const { UnauthenticatedError } = require("../errors");
const TokenService = require("../services/TokenService");

module.exports = function (req, res, next) {
  try {
    const authorization = req.headers.authorization;
    const accessToken = authorization.split(" ")[1];

    if (!accessToken) {
      throw new Error(
        UnauthenticatedError("You are not logged in! Please Log in")
      );
    }
    if (!authorization) {
      throw new Error(
        UnauthenticatedError("You are not logged in! Please Log in")
      );
    }

    const userData = TokenService.validateAccessToken(accessToken);
    if (!userData) {
      throw new Error(
        UnauthenticatedError("You are not logged in! Please Log in")
      );
    }

    req.user = userData;
    next();
  } catch (error) {
    throw new Error(
      new UnauthenticatedError("You are not logged in! Please Log in")
    );
  }
};
