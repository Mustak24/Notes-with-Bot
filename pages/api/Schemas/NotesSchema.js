import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    title: String,
    content: String,
    time: {type: Date, default: Date.now}
})

export default mongoose.models.Notes || mongoose.model('Notes', NoteSchema)