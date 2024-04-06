import {model, Schema, models} from "mongoose";



const UserSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: false,
        },
        admin: {
            type: Boolean,
        }
    },
    { timestamps: true }
);

export const User = models.User || model('User', UserSchema);