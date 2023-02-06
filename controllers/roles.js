import Role from "../models/roles.js";

// Mendapatkan semua role
const getRoles = (req, res) => {
    Role.find()
        .then(roles => res.json(roles))
        .catch(err => res.status(404).json({ error: 'Tidak ada role' }));
};

// Mendapatkan role dengan ID tertentu
const getRole = (req, res) => {
    Role.findById(req.params.id)
        .then(role => res.json(role))
        .catch(err => res.status(404).json({ error: 'Role tidak ditemukan' }));
};

// Menambahkan role baru
const addRole = (req, res) => {
    const newRole = new Role({
        name: req.body.name,
        description: req.body.description,
        permissions: req.body.permissions
    });

    newRole
        .save()
        .then(role => res.json(role))
        .catch(err => console.log(err));
};

// Mengupdate role dengan ID tertentu
const updateRole = (req, res) => {
    Role.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                name: req.body.name,
                description: req.body.description,
                permissions: req.body.permissions
            }
        },
        { new: true }
    )
        .then(role => res.json(role))
        .catch(err => res.status(404).json({ error: 'Role tidak ditemukan' }));
};

// Menghapus role dengan ID tertentu
const deleteRole = (req, res) => {
    Role.findByIdAndRemove(req.params.id)
        .then(() => res.json({ success: true }))
        .catch(err => res.status(404).json({ error: 'Role tidak ditemukan' }));
};

export default {
    getRoles,
    getRole,
    addRole,
    updateRole,
    deleteRole
}