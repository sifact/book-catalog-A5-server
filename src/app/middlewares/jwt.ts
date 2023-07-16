import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ApiError from "../../errors/ApiError";
import config from "../../config";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.accessToken;
  if (!token) throw new ApiError(401, "You are not authenticated!");

  jwt.verify(token, config.jwt_key!, async (err: any, payload: any) => {
    if (err) return new ApiError(403, "Token is not valid!");
    req.userId = payload.id;

    next();
  });
};
