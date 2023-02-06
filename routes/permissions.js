import express from "express";
const router = express.Router();
import authMiddleware from "../middleware/auth.js";
import permission from "../middleware/permission.js";

import permissionsController from "../controllers/permissions.js";

// Mendapatkan semua permission
router.get(
    '/',
    authMiddleware,
    permission('get', 'Permission'),
    permissionsController.getPermissions
);

// Mendapatkan permission dengan ID tertentu
router.get(
    '/:id',
    authMiddleware,
    permission('get', 'Permission'),
    permissionsController.getPermission
);

// Menambahkan permission baru
router.post(
    '/',
    authMiddleware,
    permission('create', 'Permission'),
    permissionsController.addPermission
);

// Mengupdate permission dengan ID tertentu
router.put(
    '/:id',
    authMiddleware,
    permission('update', 'Permission'),
    permissionsController.updatePermission
);

// Menghapus permission dengan ID tertentu
router.delete(
    '/:id',
    authMiddleware,
    permission('delete', 'Permission'),
    permissionsController.deletePermission
);

export default router;
