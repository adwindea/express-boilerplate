import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    phone: {
        type: String
    },
    aiotku_id: {
        type: String
    },
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role'
        }
    ]
});

// Hash password sebelum disimpan
UserSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
        });
    });
});

// Metode untuk memverifikasi password
UserSchema.methods.verifyPassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

export default mongoose.model('Users', UserSchema);
