import jwt, { type SignOptions } from "jsonwebtoken";
import type { Response } from "express";

export const generateToken = (userId: string, res: Response) => {
  const payload = { id: userId };
  const signOptions: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN || "7d") as SignOptions["expiresIn"],
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET!, signOptions);
  res.cookie("JWT", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
  return token;
};
