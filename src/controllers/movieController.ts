import type { Request, Response } from "express";
import { prisma } from "../config/db.js";

const movies = async (_req: Request, res: Response) => {
  const movies = await prisma.movie.findMany();
  res.status(200).json(movies);
};

export { movies };
