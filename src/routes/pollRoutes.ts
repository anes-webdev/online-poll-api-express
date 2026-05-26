import express from "express";
import {
  createPoll,
  deletePoll,
  editPoll,
  getPoll,
  getPolls,
} from "../controllers/pollController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { createPollSchema, editPollSchema } from "../validators/pollSchema.js";

const router = express.Router();

router.use(authMiddleware);
router.get("/", getPolls);
router.get("/:id", getPoll);
router.delete("/:id", deletePoll);
router.put("/:id", validateRequest(editPollSchema), editPoll);
router.post("/", validateRequest(createPollSchema), createPoll);

export default router;
