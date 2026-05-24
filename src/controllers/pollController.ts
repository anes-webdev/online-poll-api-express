import type { Request, Response } from "express";
import { prisma } from "../config/db.js";

const polls = async (_req: Request, res: Response) => {
  const polls = await prisma.poll.findMany();
  res.status(200).json(polls);
};

export { polls };
