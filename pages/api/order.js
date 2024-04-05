import {mongooseConnect} from "@/lib/mongoose";
import {Command} from "@/models/Command";


export default async function handle(req, res) {
    const { method } = req;

    await mongooseConnect();


    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Command.findOne({ _id: req.query.id }));
        } else {
            res.json(await Command.find({ shipped: true }));
        }
    }
    if (method === 'DELETE') {
        if (req.query?.id) {
            await Command.deleteOne({_id: req.query?.id});
            res.json(true)
        }
    }
}