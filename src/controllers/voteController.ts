import { RegisterVoteBody } from "../types/vote.types.js";
import type { Request, Response } from "express";
import { prisma } from "../config/db.js";
import { generateId } from "../utils/generateId.js";

const registerVote = async (
  req: Request<{}, {}, RegisterVoteBody>,
  res: Response,
) => {
  const { participantName, optionIds } = req.body;
  try {
    await prisma.$transaction(async (prisma) => {
      let pollId = "";
      // Check options are valid:
      for (let optionId of optionIds) {
        const option = await prisma.option.findUnique({
          where: { id: optionId },
        });
        if (!option)
          return res.status(400).json({ message: "Options are not valid" });
        if (!pollId!) {
          pollId = option.pollId;
        } else {
          if (pollId !== option.pollId)
            return res
              .status(400)
              .json({ message: "All options must be from the same poll" });
        }
      }

      const participant = await prisma.participant.create({
        data: { id: generateId(), name: participantName, pollId },
      });

      await prisma.vote.createMany({
        data: optionIds.map((optionId) => ({
          id: generateId(),
          optionId,
          participantId: participant.id,
        })),
      });

      res.status(201).json({ message: "The vote successfully registered" });
    });
  } catch {
    res.status(500).json({
      message: "Something went wrong while registering the vote",
    });
  }
};

export { registerVote };
