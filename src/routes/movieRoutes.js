import express from "express";
import { movies } from "../controllers/movieController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

// This way the middleware will be applied to all routes in this file
router.use(authMiddleware);
// If you want to apply middleware to only 1 route you can write it this way:
// router.get("/", authMiddleware, movies);
router.get("/", movies);

export default router;