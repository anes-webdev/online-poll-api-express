import express from "express";
import { polls } from "../controllers/pollController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);
router.get("/", polls);

export default router;
