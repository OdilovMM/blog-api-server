const AuthService = require("../services/AuthService");
const { StatusCodes } = require("http-status-codes");

class AuthController {
  async register(req, res, next) {
    const { name, email, password, mobile } = req.body;
    const data = await AuthService.register(name, email, password, mobile);
    res.cookie("refreshToken", data.refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res
      .status(StatusCodes.CREATED)
      .json({ message: "Registered successfully", data });
  }

  async verification(req, res, next) {
    const { userId } = req.params;
    await AuthService.verification(userId);
    return res.status(StatusCodes.OK).json({ message: "User activated" });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const data = await AuthService.login(email, password);
    res.cookie("refreshToken", data.refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res
      .status(StatusCodes.OK)
      .json({ message: "Logged in successfully", data });
  }

  async logout(req, res, next) {
    const { refreshToken } = req.cookies;
    const token = await AuthService.logout(refreshToken);
    res.clearCookie("refreshToken");
    return res
      .status(StatusCodes.OK)
      .json({ message: "Logging out...", token });
  }

  async refreshToken(req, res, next) {
    const { refreshToken } = req.cookies;
    const data = await AuthService.refresh(refreshToken);
    res.cookie("refreshToken", data.refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  }
}

module.exports = new AuthController();
