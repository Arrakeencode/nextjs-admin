import {model, models, Schema} from "mongoose";

const CommandSchema = new Schema({
    line_items:Object,
    name:String,
    email:String,
    city:String,
    zip:String,
    address:String,
    country:String,
    paid:Boolean,
    shipped:Boolean
}, {
    timestamps: true,
});

export const Command = models?.Command || model('Command', CommandSchema);