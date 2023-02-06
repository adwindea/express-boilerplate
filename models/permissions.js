import mongoose from "mongoose";

const PermissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    action: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true,
    }
});

export default mongoose.model('Permission', PermissionSchema);
