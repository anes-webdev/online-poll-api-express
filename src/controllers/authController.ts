import type { Request, Response } from "express";
import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

// const signup = async (req: Request, res: Response) => {
//   const { name, email, password } = req.body;
//   const user = await prisma.user.findUnique({ where: { email: email } });
//   if (user) {
//     return res
//       .status(400)
//       .json({ error: "User already exists with this email" });
//   }

//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(password, salt);
//   const newUser = await prisma.user.create({
//     data: {
//       name,
//       email,
//       password: hashedPassword,
//     },
//   });
//   const token = generateToken(newUser.id, res);
//   res.status(201).json({
//     status: "success",
//     data: {
//       user: {
//         id: newUser.id,
//         name,
//         email,
//       },
//       token,
//     },
//   });
// };

const signin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await prisma.user.findFirst({ where: { username, password } });
  if (!user) {
    return res.status(404).send("Invalid email or password");
  }
  // const isPasswordValid = await bcrypt.compare(password, user.password);
  // if (!isPasswordValid) {
  //   return res.status(404).json({ error: "Invalid email or password" });
  // }
  const token = generateToken(user.id, res);
  res.status(201).send(token);
};

const logout = async (_req: Request, res: Response) => {
  res.cookie("JWT", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};

export { signin, logout };
