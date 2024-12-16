import alertMsgs from "@/Functions/alertMsgs";
import connectToDb from "../Middlewares/connectToDb";
import NotesSchema from "../Schemas/NotesSchema";

async function callback(req, res){
    if(req.method == 'GET') return res.json({miss: false, alert: alertMsgs('invalit-call-method')})
    const {id, title, content} = req.body.noteInfo
    try{
        const note = await NotesSchema.findByIdAndUpdate(id, {title, content})
        return res.json({miss: true, note, alert: {type: 'success', title: 'Note Update', dec: `note id no. ${note._id} will be updated.`}})
    } catch(e){
        console.log(e)
        return res.json({miss: false, alert: alertMsgs('internal-server-error')})
    }
}

export default (req, res) => connectToDb(req, res, callback)