import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};

const userSchema = new mongoose.Schema(
    {
        // Firebase UID
        uid: {
            type: String,
            required: true,
            unique: true,
            index: true
        },

        emp_id: {
            type: String,
            required: true,
            unique: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true
        },

        department: {
            type: String,
            required: true
        },

        phone_number: {
            type: String,
            unique: true,
            sparse: true // allows null but enforces uniqueness if present
        },

        email_verified: {
            type: Boolean,
            default: false
        },

        role: {
            type: String,
            enum: ["ADMIN", "EMPLOYEE"],
            default: "EMPLOYEE"
        },

        is_active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,        // adds createdAt & updatedAt
        strict: "throw"          // 🔥 reject extra fields
    }
);

const User = mongoose.model("User", userSchema);

export { connectDB, User }
