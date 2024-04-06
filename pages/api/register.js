import {User} from "@/models/User";
import { mongooseConnect } from "@/lib/mongoose";
import bcrypt from "bcryptjs"
import {NextResponse} from "next/server";

const POST = async (request) => {
    const { email, password } = await request.body;

    await mongooseConnect();

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return new NextResponse("Email is already in use", { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 5);
        const newUser = new User({
            email,
            password: hashedPassword,
            admin: true,
        });

        await newUser.save();
        return new NextResponse("user is registered", { status: 200 });
    } catch (err) {
        return new NextResponse(err, {
            status: 500,
        });
    }
};

export default POST;
