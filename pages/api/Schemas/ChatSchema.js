import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    chat: [{
        msg: String,
        sender: String,
        time: {type: Date, default: Date.now}
    }],
    name: String,
    time: {type: Date, default: Date.now}
})

export default mongoose.models.Chats || mongoose.model('Chats', ChatSchema);