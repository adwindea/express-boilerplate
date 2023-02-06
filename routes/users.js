import express from "express";
const router = express.Router()
import usersController from "../controllers/users.js";
import authMiddleware from "../middleware/auth.js";
import permission from "../middleware/permission.js";


router.get("/", authMiddleware, permission('read', 'User'), usersController.getUsers)
router.get("/:id", authMiddleware, permission('read', 'User'), usersController.getUser)
router.put("/:id", authMiddleware, permission('update', 'User'), usersController.updateUser)
router.delete("/:id", authMiddleware, permission('delete', 'User'), usersController.deleteUser)

export default router