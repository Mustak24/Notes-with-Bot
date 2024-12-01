import alertMsgs from "@/Functions/alertMsgs";
import connectToDb from "../Middlewares/connectToDb";
import NotesSchema from "../Schemas/NotesSchema";

async function callback(req, res) {
    const {noteid} = req.headers;
    if(!noteid) return res.json({miss: false, alert: alertMsgs('internal-server-error')});
    try{
        const note = await NotesSchema.findById(noteid);
        if(!note) return res.json({miss: false, alert: alertMsgs('internal-server-error')})
        return res.json({miss: false, note})
    } catch(e){
        console.log(e)
        return res.json({miss: false, alert: alertMsgs('internal-server-error')})
    }
}

export default (req, res) => connectToDb(req, res, callback)