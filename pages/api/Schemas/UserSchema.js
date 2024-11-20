import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, minlength: 3, maxlength: 30},
    password: {type: String, required: true, minlength: 8},  
    notesId: [{type: mongoose.Schema.Types.ObjectId, ref: 'Notes'}],
    chatsId: [{type: mongoose.Schema.Types.ObjectId, ref: 'Chats'}],
    AcCreateTime: {type: Date, default: Date.now},
})

export default mongoose.models.Users || mongoose.model('Users', UserSchema)