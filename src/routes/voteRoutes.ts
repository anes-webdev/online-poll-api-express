import express from "express";
import { registerVote } from "../controllers/voteController.js";

const router = express.Router();

router.post("/", registerVote);

export default router;
