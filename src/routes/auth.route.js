// Packages
import express from "express";

// Controllers
import { authController } from "../controller/index.js";

// Middlewares
import protect from "../middleware/protect.js";

const { signup, signin, logout } = authController;

const router = express.Router();

router.post("/login", signin);

router.post("/register", signup);

router.use(protect);

router.post("/logout", logout);

export default router;
