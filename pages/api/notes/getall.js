import verifyJwtToken from "../Middlewares/verifyJwtToken";
import connectToDb from "../Middlewares/connectToDb";
import NotesSchema from "../Schemas/NotesSchema";
import alertMsgs from "@/Functions/alertMsgs";

async function callback(req, res){
    const {userId} = req;
    if(!userId) return res.json({miss: false, alert: alertMsgs('internal-server-error')})
    try{
        const notes = await NotesSchema.find({userId});
        return res.json({miss: false, notes});
    } catch(e){
        console.log(e)
        res.json({miss: false, alert: alertMsgs('internal-server-error')})
    }
}

const halper = (req, res) => connectToDb(req, res, callback)

export default (req, res) => verifyJwtToken(req, res, halper)