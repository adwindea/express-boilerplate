import express from "express";
const router = express.Router();
import authMiddleware from "../middleware/auth.js";
import permission from "../middleware/permission.js";

import rolesController from "../controllers/roles.js";

// Mendapatkan semua role
router.get(
    '/',
    authMiddleware,
    permission('read', 'Role'),
    rolesController.getRoles
);

// Mendapatkan role dengan ID tertentu
router.get(
    '/:id',
        authMiddleware,
        permission('read', 'Role'),
    rolesController.getRole
);

// Menambahkan role baru
router.post(
    '/',
    authMiddleware,
    permission('create', 'Role'),
    rolesController.addRole
);

// Mengupdate role dengan ID tertentu
router.put(
    '/:id',
    authMiddleware,
    permission('update', 'Role'),
    rolesController.updateRole
);

// Menghapus role dengan ID tertentu
router.delete(
    '/:id',
    authMiddleware,
    permission('delete', 'Role'),
    rolesController.deleteRole
);

export default router;
