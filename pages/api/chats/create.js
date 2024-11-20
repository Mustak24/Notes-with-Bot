import { genChatName } from "@/Functions/halper";
import verifyJwtToken from "../Middlewares/verifyJwtToken";

const { default: alertMsgs } = require("@/Functions/alertMsgs");
const { default: ChatSchema } = require("../Schemas/ChatSchema");
const { default: connectToDb } = require("../Middlewares/connectToDb");

async function callback(req, res) {
    const {userId} = req;
    const {msg} = req.body.chat
    try{  
        const chatName = await genChatName(msg);
        if(!chatName) return res.json({miss: false, alert: alertMsgs('internal-server-error')});
        const chat = await ChatSchema.create({
            userId, 
            name: chatName,
            chat: [{
                sender: 'self', msg
            }]
        });
        return res.json({miss: true, chatId: chat._id})
    } catch(e){
        console.log(e)
        return res.json({miss: false, alert: alertMsgs('internal-server-error')})
    }
}

const hapler = (req, res) => connectToDb(req, res, callback)

export default (req, res) => verifyJwtToken(req, res, hapler);