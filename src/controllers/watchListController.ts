import type { Request, Response } from "express";
import { prisma } from "../config/db.js";

const getAllWatchLists = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const allWatchLists = await prisma.watchListItem.findMany({
    where: { userId: userId },
  });
  res.status(200).json(allWatchLists);
};

const addToWatchList = async (req: Request, res: Response) => {
  const { movieId, status, rating, notes } = req.body;
  const movie = await prisma.movie.findUnique({ where: { id: movieId } });
  if (!movie) return res.status(404).json({ error: "Movie not found" });
  const watchListItemExists = await prisma.watchListItem.findUnique({
    where: {
      userId_movieId: {
        userId: req.user.id,
        movieId: movieId,
      },
    },
  });
  if (watchListItemExists) {
    return res.status(400).json({ error: "Movie already in the watch List" });
  }
  const watchListItem = await prisma.watchListItem.create({
    data: {
      userId: req.user.id,
      movieId,
      status: status || "PLANNED",
      rating,
      notes,
    },
  });
  res.status(201).json({
    status: "success",
    data: {
      watchListItem,
    },
  });
};

const removeFromWatchList = async (req: Request, res: Response) => {
  const watchListId = req.params.id as string;
  const watchListItem = await prisma.watchListItem.findUnique({
    where: { id: watchListId },
  });
  if (!watchListItem) {
    return res.status(404).json({ error: "The watch list not found" });
  }
  if (watchListItem.userId !== req.user.id) {
    return res.status(403).json({ error: "Not allowed" });
  }
  await prisma.watchListItem.delete({ where: { id: watchListId } });
  return res.status(200).json("Successfully deleted");
};

export { addToWatchList, removeFromWatchList, getAllWatchLists };
