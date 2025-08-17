import { Router } from "express";
import {
  checkAuth,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Public routes
router.get("/auth", verifyJWT, checkAuth)
router.post("/register", registerUser);
router.post("/login", loginUser);

// Secured routes
router.post("/logout", logoutUser);

export default router;
