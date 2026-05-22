import express from "express";
import {
  addToWatchList,
  getAllWatchLists,
  removeFromWatchList,
} from "../controllers/watchListController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { addToWatchListSchema } from "../validators/watchlistValidators.js";

const router = express.Router();

router.use(authMiddleware);
router.post("/", validateRequest(addToWatchListSchema), addToWatchList);
router.get("/", getAllWatchLists);
router.delete("/:id", removeFromWatchList);

export default router;
