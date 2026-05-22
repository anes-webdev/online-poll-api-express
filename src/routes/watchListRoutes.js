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
// We validate request body before sending query to DB:
router.post("/", validateRequest(addToWatchListSchema), addToWatchList);
router.get("/", getAllWatchLists);
// With params:
router.delete("/:id", removeFromWatchList);

export default router;
