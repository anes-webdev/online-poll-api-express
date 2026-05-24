import express from "express";
import { createPoll, deletePoll, editPoll, getPoll, getPolls } from "../controllers/pollController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);
router.get("/", getPolls);
router.get("/:id", getPoll);
router.delete("/:id", deletePoll);
router.put("/:id", editPoll);
router.post("/", createPoll);

export default router;
