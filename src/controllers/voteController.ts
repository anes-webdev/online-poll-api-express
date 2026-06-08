import { RegisterVoteBody } from "../types/vote.types.js";
import type { Request, Response } from "express";
import { prisma } from "../config/db.js";
import { generateId } from "../utils/generateId.js";
import { emitNewVote } from "../config/socket.js";
import {
  DEMO_USER_POLL_LIMIT,
  DEMO_USER_VOTE_LIMIT,
} from "../constants/limits.js";

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
      // Check demo user limits:
      const poll = await prisma.poll.findUnique({
        where: { id: pollId },
        include: { creator: true, participants: true },
      });
      if (poll?.creator.role === "demo" && poll.participants.length === DEMO_USER_VOTE_LIMIT)
        return res.status(403).json({
          message: `This poll has reached the demo limit of ${DEMO_USER_VOTE_LIMIT} votes.`,
        });

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

      const participantVote = await prisma.participant.findUnique({
        where: { id: participant.id },
        select: {
          id: true,
          name: true,
          votes: {
            select: { option: { select: { id: true, name: true } } },
          },
        },
      });

      emitNewVote(pollId, {
        name: participantVote?.name,
        id: participantVote?.id,
        choices: participantVote?.votes.map((vote) => vote.option),
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
