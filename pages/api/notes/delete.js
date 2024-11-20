import alertMsgs from "@/Functions/alertMsgs";
import connectToDb from "../Middlewares/connectToDb";
import NotesSchema from "../Schemas/NotesSchema";

async function callback(req, res) {
    const {noteId} = req.headers;
    if(!noteId) return res.json({miss: false, alert: alertMsgs('internal-server-error')});
    try{
        let note = await NotesSchema.findByIdAndDelete(noteId);
        return res.json({miss: true, alert: {type: 'success', title: 'Note Deleted', dec: `note that id is ${note._id} will be deleted`}});
    } catch(e){
        return res.json({miss: false, alert: alertMsgs('internal-server-error')})
    }
}

export default (req, res) => connectToDb(req, res, callback)