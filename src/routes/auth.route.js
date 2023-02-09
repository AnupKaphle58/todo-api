// Packages
import express from "express";

// Controllers
import { authController } from "../controller/index.js";

// Middlewares
// import protect from "../middlewares/protect";

const { signup, signin } = authController;

const router = express.Router();

router.post("/login", signin);

router.post("/register", signup);

// router.post("/logout", logout);

// router.post("/tokens", refreshTokens);

export default router;
