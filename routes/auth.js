import express from "express";
const router = express.Router();
import authController from "../controllers/auth.js";
import authMiddleware from "../middleware/auth.js";

// Login user
router.post('/login', authController.login);
router.post('/register', authController.register);

// Mendapatkan user saat ini
router.get(
    '/current',
    authMiddleware,
    authController.currentUser
);

export default router;
