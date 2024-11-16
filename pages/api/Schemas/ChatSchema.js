import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    chat: [{type: Object}],
    title: String,
    time: {type: Date, default: Date.now}
})