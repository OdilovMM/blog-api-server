const UserDto = require("../dtos/UserDto");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const TokenService = require("./TokenService");
const EmailService = require("./EmailService");

class AuthService {
  async register(name, email, password, mobile) {
    if (!name || !email || !password || !mobile) {
      throw new Error("Please provide all your credentials");
    }
    const isExistUser = await User.findOne({ email });
    const isMobileInUser = await User.findOne({ mobile });
    if (isExistUser) {
      throw new Error("Email already in use!");
    }
    if (isMobileInUser) {
      throw new Error("Mobile already in use!");
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      mobile,
      email,
      password: hashPassword,
    });

    const userDto = new UserDto(user);
    await EmailService.sendMail(
      email,
      `${process.env.API_URL}/api/auth/verification/${userDto.id}`
    );

    const tokens = TokenService.generateToken({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { user: userDto, ...tokens };
  }

  async verification(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User is not defined");
    }
    user.isVerified = true;
    await user.save();
  }

  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("You are not registered");
    }

    if (!password || !email) {
      throw new Error("Please enter all credentials");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error("Password does not match");
    }

    const userDto = new UserDto(user);
    const tokens = TokenService.generateToken({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { user: userDto, ...tokens };
  }

  async logout(refreshToken) {
    return await TokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new Error("Unauthorized");
    }
    const userPayload = TokenService.validateRefreshToken(refreshToken);
    const tokenDB = await TokenService.findToken(refreshToken);
    if (!userPayload || !tokenDB) {
      throw new Error("Unauthorized");
    }
    const user = await User.findById(userPayload.id);
    const userDto = new UserDto(user);

    const tokens = TokenService.generateToken({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { user: userDto, ...tokens };
  }

  async getUsers() {
    return await User.find();
  }
}

module.exports = new AuthService();
