import jwt from "jsonwebtoken";
import User from "../models/users.js";
import config from "../config/jwt.js";

//register user
const register = (req, res) => {
    // Ambil data user dari form
    const { fullname, email, username, password, phone } = req.body;

    // Buat objek user baru
    const user = new User({ fullname, email, username, password, phone });

    user.save((error) => {
        if (error) {
            res.status(500).send({ message: 'Error menyimpan user' });
        } else {
            res.send({ message: 'User berhasil didaftarkan' });
        }
    });
};


// Login user
const login = (req, res) => {
    User.findOne({ username: req.body.username }).populate({path: 'roles', populate: {path: 'permissions'}})
        .then(user => {
        // Jika user tidak ditemukan
        if (!user) {
            return res.status(404).json({
            success: false,
            message: 'Username tidak ditemukan'
            });
        }

        // Verifikasi password
        user.verifyPassword(req.body.password, (err, isMatch) => {
            if (err) throw err;

            // Jika password salah
            if (!isMatch) {
                return res.status(400).json({
                    success: false,
                    message: 'Password salah'
                });
            }

            let permissions = [];
            user.roles.forEach(role => {
                role.permissions.forEach(permission => {
                    permissions.push({
                        action: permission.action,
                        subject: permission.subject
                    });
                });
            });

            // Membuat token
            const token = jwt.sign({ 
                id: user._id,
                permissions: permissions,
            }, config.secretOrKey, {
                expiresIn: 86400 // 1 hari
            });

            res.json({
                success: true,
                token: `Bearer ${token}`,
                // user: {
                //     id: user._id,
                //     fullname: user.fullname,
                //     email: user.email,
                //     username: user.username,
                //     phone: user.phone,
                //     aiotku_id: user.aiotku_id,
                //     roles: user.roles
                // }
            });
        });
    })
    .catch(err => console.log(err));
};

// Mendapatkan user saat ini
const currentUser = (req, res) => {
    res.json({
        id: req.user._id,
        fullname: req.user.fullname,
        email: req.user.email,
        username: req.user.username,
        phone: req.user.phone,
        aiotku_id: req.user.aiotku_id,
        roles: req.user.roles
    });
};

export default {
    login,
    register,
    currentUser
}

