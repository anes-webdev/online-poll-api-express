import { NextFunction } from "express";
import { prisma } from "../config/db.js";
import type { Request, Response } from "express";

export const requirePollOwner =
  () => async (req: Request, res: Response, next: NextFunction) => {
    const pollId = req.params.id as string;
    const userId = req.user.id;
    const poll = await prisma.poll.findUnique({
      where: { id: pollId },
    });
    if (!poll) {
      return res.status(404).json({ message: "The poll not found" });
    }
    if (poll.createdBy !== userId) {
      return res.status(403).json({ message: "Not allowed" });
    }
    next();
  };
