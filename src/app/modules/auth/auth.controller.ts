import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../user/user.model";
import ApiError from "../../../errors/ApiError";
import config from "../../../config";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(201).send("User has been created.");
  } catch (err) {
    next(err);
  }
};
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) throw new ApiError(405, "User not found");

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) throw new ApiError(400, "Wrong password or username");

    const token = jwt.sign(
      {
        id: user._id,
      },
      config.jwt_key!
    );

    // const { password, ...info } = user;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(user);
  } catch (err) {
    next(err);
  }
};

const logout = async (req: Request, res: Response) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};

export const AuthController = {
  register,
  login,
  logout,
};
