const db = require("../database/database");
const { validationResult } = require("express-validator");
const User = require("../model/user");

const isBodyValid = (req, res) => {
  const { errors } = validationResult(req);
  if (errors.length > 0) {
    res.status(400).json({ message: errors });
    return false;
  }
  return true;
};

class UserController {
  static async addUser(req, res) {
    if (!isBodyValid(req, res)) return;
    const user = req.body;
    const newUser = new User(user);
    await newUser.save();
    res.status(201).json({ message: "User berhasil ditambahkan" });
  }

  static async getAllUsers(req, res) {
    const users = await User.find().select({ _id: 0, name: 1, email: 1, linkImgProfile: 1 }).exec();
    res.status(200).json(users);
  }

  static async updateUser(req, res) {
    if (!isBodyValid(req, res)) return;
    const user = req.body;
    await User.findOneAndUpdate({ email: user.email }, user).exec();
    res.status(200).json({ message: "User berhasil diupdate" });
  }

  static async deleteUser(req, res) {
    const user = req.body;
    await User.findOneAndDelete({ email: user.email }).exec();
    res.status(200).json({ message: `User ${user.email} berhasil dihapus` });
  }

  static async getUserData(req, res) {
    const user = req.body;
    const userData = await User.findOne({ email: user.email }).exec();
    res.status(200).json(userData);
  }
}

module.exports = UserController;
