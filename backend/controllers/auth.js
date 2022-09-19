import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    // bcrypt
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    await newUser.save();
    res.status(201).send("user created");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    // check user in db
    if (!user) return next(createError(404, "user not found"));

    // compare against pass in db
    const isPass = await bcrypt.compare(req.body.password, user.password);

    // in case pass is wrong
    if (!isPass) return next(createError(400, "Incorrect credentials"));

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};