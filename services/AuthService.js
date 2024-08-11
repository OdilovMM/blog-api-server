const UserDto = require("../dtos/UserDto");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

class AuthService {
  async register(name, email, password, mobile) {
    const isExistUser = await User.findOne({ email });
    const isMobileInUser = await User.findOne({ mobile });
    if (isExistUser) {
      throw new Error("Email already in use, please login to continue");
    }
    if (isMobileInUser) {
      throw new Error("Mobile already in use, please use another");
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      mobile,
      email,
      password: hashPassword,
    });
    const userDto = new UserDto(user);

    // email

    // jwt

    // token

    return { userDto };
  }

  async verification(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User is not defined");
    }

    user.isVerified = true;
    await user.save();
  }
}

module.exports = new AuthService();
