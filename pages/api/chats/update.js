import alertMsgs from "@/Functions/alertMsgs";
import connectToDb from "../Middlewares/connectToDb";
import NotesSchema from "../Schemas/NotesSchema";

async function callback(req, res){
    if(req.method == 'GET') return res.json({miss: false, alert: alertMsgs('invalit-call-method')})
    const {chatId, Chat} = req.body.chatInfo
    try{
        const chat = await NotesSchema.findByIdAndUpdate(chatId, {Chat})
        return res.json({miss: true, chat})
    } catch(e){
        console.log(e)
        return res.json({miss: false, alert: alertMsgs('internal-server-error')})
    }
}

export default (req, res) => connectToDb(req, res, callback)