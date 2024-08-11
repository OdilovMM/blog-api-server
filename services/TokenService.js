const jwt = require("jsonwebtoken");
const Token = require("../models/tokenModel");

class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET_ACCESS, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET_REFRESH, {
      expiresIn: "15d",
    });

    return { accessToken, refreshToken };
  }

  async saveToken(userId, refreshToken) {
    const existToken = await Token.findOne({ usr: userId });

    if (existToken) {
      existToken.refreshToken = refreshToken;
      return existToken.save();
    }
    const token = await Token.create({ user: userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken) {
    return await Token.findOneAndDelete({ refreshToken });
  }

  validateRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET_REFRESH);
    } catch (error) {
      return null;
    }
  }

  validateAccessToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET_ACCESS);
    } catch (error) {
      return null;
    }
  }

  async findToken(refreshToken) {
    return await Token.findOne({ refreshToken });
  }
}

module.exports = new TokenService();
