import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import {getToken} from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;
export default async function handle(req, res) {
    const { method } = req;

    if (method === 'GET') {
        if (req.query?.id) {
            return res.json(await Product.findOne({ _id: req.query.id }));
        } else {
           return res.json(await Product.find());
        }
    }

    const token = await getToken({ req, secret });

    if (!token || !token.sub) {
        return res.status(401).json({ message: 'Accès non autorisé. Jeton manquant ou invalide.' });
    }
    await mongooseConnect();

    if (method === 'POST') {
        const { title, description, price, images, category } = req.body;

        const productDoc = await Product.create({
            title,
            description,
            price,
            images,
            category
        })

        res.json(productDoc);
    }

    if (method === 'PUT') {
        const { title, description, price, _id, images, category } = req.body;
        await Product.updateOne({ _id }, {
            title, description, price, images, category
        });
        res.json(true);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Product.deleteOne({_id:req.query?.id});
            res.json(true)
        }
    }
}