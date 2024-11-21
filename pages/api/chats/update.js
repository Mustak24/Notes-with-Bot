import alertMsgs from "@/Functions/alertMsgs";
import connectToDb from "../Middlewares/connectToDb";
import ChatSchema from "../Schemas/ChatSchema";

async function callback(req, res){
    if(req.method == 'GET') return res.json({miss: false, alert: alertMsgs('invalit-call-method')})
    const {chatId, newMsg} = req.body.chatInfo
    try{
        let Chat = await ChatSchema.findById(chatId);
        Chat.chat.push(newMsg)
        Chat = await Chat.save();
        return res.json({miss: true, chat: Chat.chat})
    } catch(e){
        console.log(e)
        return res.json({miss: false, alert: alertMsgs('internal-server-error')})
    }
}

export default (req, res) => connectToDb(req, res, callback)