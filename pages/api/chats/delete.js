import alertMsgs from "@/Functions/alertMsgs";
import connectToDb from "../Middlewares/connectToDb";
import ChatSchema from "../Schemas/ChatSchema";

async function callback(req, res) {
    const {chatId} = req.headers;
    if(!chatId) return res.json({miss: false, alert: alertMsgs('internal-server-error')});
    try{
        let chat = await ChatSchema.findByIdAndDelete(chatId);
        return res.json({miss: true, alert: {type: 'success', title: 'Chat Deleted', dec: `Chat that id is ${chat._id} will be deleted`}});
    } catch(e){
        return res.json({miss: false, alert: alertMsgs('internal-server-error')})
    }
}

export default (req, res) => connectToDb(req, res, callback)