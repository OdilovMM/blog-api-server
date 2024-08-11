const AuthService = require("../services/AuthService");

class AuthController {
  async register(req, res, next) {
    try {
      const { name, email, password, mobile } = req.body;
      const data = await AuthService.register(name, email, password, mobile);
      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res.status(201).json({ message: "Registered successfully", data });
    } catch (error) {
      console.log(error);
    }
  }

  async verification(req, res, next) {
    try {
      const { userId } = req.params;
      await AuthService.verification(userId);
      return res.json({ message: "User activated" });
    } catch (error) {
      console.log(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const data = await AuthService.login(email, password);
      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res.status(201).json({ message: "Logged in successfully", data });
    } catch (error) {
      console.log(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await AuthService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.status(200).json({ message: "Logging out...", token });
    } catch (error) {
      console.log(error);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const data = await AuthService.refresh(refreshToken);
      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new AuthController();
