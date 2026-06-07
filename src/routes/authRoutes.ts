import express from "express";
import { signin, logout, demoSignin } from "../controllers/authController.js";

const router = express.Router();

// router.post("/signup", signup);
router.post("/signin", signin);
router.post("/demo-signin", demoSignin);
router.post("/logout", logout);

export default router;
