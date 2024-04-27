import { User } from "@/models/User";
import { mongooseConnect } from "@/lib/mongoose";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { email, password, admin } = req.body;

        try {
            await mongooseConnect();

            if (admin === true) {
                return res.status(400).json({ error: "You cannot register as an admin" });
            }

            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(400).json({ error: "Email is already in use" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                email,
                password: hashedPassword,
                admin: false,
            });

            await newUser.save();
            return res.status(200).json({ message: "User is registered" });
        } catch (err) {
            console.error("Error registering user:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        return res.status(405).json({ error: "Method Not Allowed" });
    }
}
