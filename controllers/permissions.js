import Permission from "../models/permissions.js";

// Mendapatkan semua permission
const getPermissions = (req, res) => {
    console.log(req.user);
    Permission.find()
        .then(permissions => res.json(permissions))
        .catch(err => res.status(404).json({ error: 'Tidak ada permission' }));
};

// Mendapatkan permission dengan ID tertentu
const getPermission = (req, res) => {
    Permission.findById(req.params.id)
        .then(permission => res.json(permission))
        .catch(err =>
            res.status(404).json({ error: 'Permission tidak ditemukan' })
    );
};

// Menambahkan permission baru
const addPermission = (req, res) => {
    const newPermission = new Permission({
        name: req.body.name,
        description: req.body.description,
        action: req.body.action,
        subject: req.body.subject
    });

    newPermission
        .save()
        .then(permission => res.json(permission))
        .catch(err => console.log(err));
};

// Mengupdate permission dengan ID tertentu
const updatePermission = (req, res) => {
    Permission.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                name: req.body.name,
                description: req.body.description,
                action: req.body.action,
                subject: req.body.subject,
            }
        },
        { new: true }
    )
        .then(permission => res.json(permission))
        .catch(err =>
        res.status(404).json({ error: 'Permission tidak ditemukan' })
    );
};

// Menghapus permission dengan ID tertentu
const deletePermission = (req, res) => {
    Permission.findByIdAndRemove(req.params.id)
        .then(() => res.json({ success: true }))
        .catch(err =>
        res.status(404).json({ error: 'Permission tidak ditemukan' })
    );
};

export default {
    getPermissions,
    getPermission,
    addPermission,
    updatePermission,
    deletePermission
}