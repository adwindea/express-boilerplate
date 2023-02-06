import User from "../models/users.js";

// Mendapatkan semua user
const getUsers = (req, res) => {
    User.find().select("-password")
        .then(users => res.json(users))
        .catch(err => res.status(404).json({ error: 'Tidak ada user' }));
};

// Mendapatkan user dengan ID tertentu
const getUser = (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(404).json({ error: 'User tidak ditemukan' }));
};

// Menambahkan user baru
const addUser = (req, res) => {
    const newUser = new User({
        fullname: req.body.fullname,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        active: req.body.active,
        phone: req.body.phone,
        aiotku_id: req.body.aiotku_id,
        roles: req.body.roles
    });

    newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
};

// Mengupdate user dengan ID tertentu
const updateUser = (req, res) => {
    User.findByIdAndUpdate(
        req.params.id,
        {
        $set: {
            fullname: req.body.fullname,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            active: req.body.active,
            phone: req.body.phone,
            aiotku_id: req.body.aiotku_id,
            roles: req.body.roles
        }
        },
        { new: true }
    )
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ error: 'User tidak ditemukan', message: err }));
};

// Menghapus user dengan ID tertentu
const deleteUser = (req, res) => {
    User.findByIdAndRemove(req.params.id)
        .then(() => res.json({ success: true }))
        .catch(err => res.status(404).json({ error: 'User tidak ditemukan' }));
};

export default {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser
}