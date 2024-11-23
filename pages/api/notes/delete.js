import alertMsgs from "@/Functions/alertMsgs";
import connectToDb from "../Middlewares/connectToDb";
import NotesSchema from "../Schemas/NotesSchema";

async function callback(req, res) {
    const {noteid} = req.headers;
    console.log(req.headers)
    if(!noteid) return res.json({miss: false, alert: alertMsgs('internal-server-error')});
    try{
        let note = await NotesSchema.findByIdAndDelete(noteid);
        return res.json({miss: true, alert: {type: 'success', title: 'Note Deleted', dec: `note that id is ${note._id} will be deleted`}});
    } catch(e){
        return res.json({miss: false, alert: {type: 'error', title: 'fail', dec: 'due to some error note do not deleted.'}})
    }
}

export default (req, res) => connectToDb(req, res, callback)