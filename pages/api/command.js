import { getToken } from "next-auth/jwt";
import { mongooseConnect } from "@/lib/mongoose";
import { Command } from "@/models/Command";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handle(req, res) {
    const { method } = req;

    const token = await getToken({ req, secret });

    if (!token || !token.sub) {
        return res.status(401).json({ message: 'Accès non autorisé. Jeton manquant ou invalide.' });
    }

    await mongooseConnect();

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Command.findOne({ _id: req.query.id }));
        } else if (req.query?.shipped === 'true') {
            res.json(await Command.find({ shipped: true }));
        } else {
            res.json(await Command.find({ shipped: false }));
        }
    }

    if (method === 'PUT') {
        const { shipped, _id } = req.body;
        await Command.updateOne({ _id }, { shipped });
        res.json(true);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Command.deleteOne({_id: req.query.id});
            res.json(true);
        }
    }
}
