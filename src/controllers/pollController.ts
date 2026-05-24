import type { Request, Response } from "express";
import { prisma } from "../config/db.js";
import { CreatePollBody } from "../types/poll.types.js";
import { generateId } from "../utils/generateId.js";

const getPolls = async (req: Request, res: Response) => {
  // Todo: add search, filter:
  const polls = await prisma.poll.findMany({
    where: { createdBy: req.user.id },
    include: {
      participants: true,
    },
  });
  const pollsWithParticipantCount = polls.map((poll) => {
    return {
      ...poll,
      participantsCount: poll.participants.length,
    };
  });
  res.status(200).json(pollsWithParticipantCount);
};
// Todo: Test user specific polls:
const getPoll = async (req: Request, res: Response) => {
  const pollId = req.params.id as string;
  const userId = req.user.id;
  const poll = await prisma.poll.findUnique({
    where: { id: pollId },
    include: {
      options: true,
    },
  });
  if (!poll) {
    return res.status(404).json({ message: "The poll not found" });
  }
  if (poll?.createdBy !== userId) {
    return res.status(403).json({ message: "Not allowed" });
  }
  return res.status(200).json(poll);
};

const createPoll = async (
  req: Request<{}, {}, CreatePollBody>,
  res: Response,
) => {
  // Todo: add middleware for this:
  const { title, description, options } = req.body;

  try {
    await prisma.$transaction(async (prisma) => {
      const createdPoll = await prisma.poll.create({
        data: { id: generateId(), title, description, createdBy: req.user.id },
      });

      await prisma.option.createMany({
        data: options.map((option) => ({
          id: generateId(),
          optionName: option.optionName,
          pollId: createdPoll.id,
        })),
      });

      res.status(201).json(createdPoll);
    });
  } catch {
    res.status(500).json({
      message: "Something went wrong while creating the poll",
    });
  }
};

const deletePoll = async (req: Request, res: Response) => {
  const pollId = req.params.id as string;
  const userId = req.user.id;
  const poll = await prisma.poll.findUnique({
    where: { id: pollId },
    include: {
      options: true,
    },
  });
  if (!poll) {
    return res.status(404).json({ message: "The poll not found" });
  }
  if (poll?.createdBy !== userId) {
    return res.status(403).json({ message: "Not allowed" });
  }
  await prisma.poll.delete({ where: { id: pollId } });
  return res.status(200).json({ message: "Poll successfully deleted" });
};

// Todo: add validation middleware:
const editPoll = async (
  req: Request<{ id: string }, {}, CreatePollBody>,
  res: Response,
) => {
  const { title, description } = req.body;
  const pollId = req.params.id as string;
  const userId = req.user.id;
  const poll = await prisma.poll.findUnique({
    where: { id: pollId },
    include: {
      options: true,
    },
  });
  if (!poll) {
    return res.status(404).json({ message: "The poll not found" });
  }
  if (poll?.createdBy !== userId) {
    return res.status(403).json({ message: "Not allowed" });
  }
  const updatedPoll = await prisma.poll.update({
    where: { id: pollId },
    data: { title, description },
  });
  res.status(200).json({ message: "The poll successfully updated", data: updatedPoll });
};

export { getPolls, getPoll, createPoll, deletePoll, editPoll };
