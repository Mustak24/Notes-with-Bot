import alertMsgs from "@/Functions/alertMsgs";
import connectToDb from "../Middlewares/connectToDb";
import verifyJwtToken from "../Middlewares/verifyJwtToken";
import NotesSchema from "../Schemas/NotesSchema";

async function callback(req, res) {
    const {noteId} = req.headers
    if(!noteId) return res.json({miss: false, alert: alertMsgs('internal-server-error')});
    try{
        const note = NotesSchema.findById(noteId);
        if(!note) return res.json({miss: false, alert: alertMsgs('internal-server-error')})
        return res.json({miss: false, note})
    } catch(e){
        console.log(e)
        return res.json({miss: false, alert: alertMsgs('internal-server-error')})
    }
}