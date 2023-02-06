import { config } from "dotenv";
config();
import mongoose from "mongoose";
import connectDB from "../config/dbConnection.js";
connectDB();
import permissions from '../models/permissions.js';

const data = [
    {
        "name": "manage-all",
        "description": "Manage All",
        "action": "manage",
        "subject": "all"
    },{
        "name": "read-user",
        "description": "Read User",
        "action": "read",
        "subject": "User"
    },{
        "name": "create-user",
        "description": "Create User",
        "action": "create",
        "subject": "User"
    },{
        "name": "update-user",
        "description": "Update User",
        "action": "update",
        "subject": "User"
    },{
        "name": "delete-user",
        "description": "Delete User",
        "action": "delete",
        "subject": "User"
    },{
        "name": "read-permission",
        "description": "Read Permission",
        "action": "read",
        "subject": "Permission"
    },{
        "name": "create-permission",
        "description": "Create Permission",
        "action": "create",
        "subject": "Permission"
    },{
        "name": "update-permission",
        "description": "Update Permission",
        "action": "update",
        "subject": "Permission"
    },{
        "name": "delete-permission",
        "description": "Delete Permission",
        "action": "delete",
        "subject": "Permission"
    },{
        "name": "read-role",
        "description": "Read Role",
        "action": "read",
        "subject": "Role"
    },{
        "name": "create-role",
        "description": "Create Role",
        "action": "create",
        "subject": "Role"
    },{
        "name": "update-role",
        "description": "Update Role",
        "action": "update",
        "subject": "Role"
    },{
        "name": "delete-role",
        "description": "Delete Role",
        "action": "delete",
        "subject": "Role"
    }
];

const seedDB = async () => {
    console.log("Deleting existing data")
    await permissions.deleteMany({});
    console.log("Seeding data")
    await permissions.insertMany(data);
}

seedDB().then(() => {
    console.log("Seeding complete")
    mongoose.connection.close();
});
