import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";

// Read the token from request and check if its valid:
export const authMiddleware = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    // Verify token and extract the user id:
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      return res.status(401).json({
        error: "User no longer exists",
      });
    }
    // We set it into req object, so in controller req, it will be accessible:
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
        error: "Not authorized, token failed",
      });
  }
};
