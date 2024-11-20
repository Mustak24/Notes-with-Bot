import ChatSchema from "../Schemas/ChatSchema";
import verifyJwtToken from "../Middlewares/verifyJwtToken";
import connectToDb from "../Middlewares/connectToDb";
import alertMsgs from "@/Functions/alertMsgs";

async function callback(req, res) {
    const {chatid} = req.headers
    if(!chatid) return res.json({miss: false, alert: alertMsgs('internal-server-error')})
    try{
        const chatInfo = await ChatSchema.findById(chatid)
        res.json({miss: true, chatInfo})
    }catch(e){
        res.json({miss: false, alert: alertMsgs('internal-server-error')})
    }
}

export default (req, res) => connectToDb(req, res, callback)

