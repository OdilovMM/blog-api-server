const AuthService = require("../services/AuthService");

class AuthController {
  async register(req, res, next) {
    try {
      const { name, email, password, mobile } = req.body;
      const { userDto } = await AuthService.register(
        name,
        email,
        password,
        mobile
      );
      res.status(201).json({ message: "Registered successfully", userDto });
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

  async login(req, res, next) {}

  async logout(req, res, next) {}
}

module.exports = new AuthController();
