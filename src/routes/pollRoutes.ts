import express from "express";
import {
  createPoll,
  deletePoll,
  editPoll,
  getPoll,
  getPolls,
  getPollVotes,
} from "../controllers/pollController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { createPollSchema, editPollSchema } from "../validators/pollSchema.js";
import { requirePollOwner } from "../middleware/requirePollOwner.js";

const router = express.Router();

router.use(authMiddleware);
router.get("/", getPolls);
router.get("/:id", requirePollOwner(), getPoll);
router.get("/:id/votes", requirePollOwner(), getPollVotes);
router.delete("/:id", requirePollOwner(), deletePoll);
router.put("/:id", requirePollOwner(), validateRequest(editPollSchema), editPoll);
router.post("/", validateRequest(createPollSchema), createPoll);

export default router;
