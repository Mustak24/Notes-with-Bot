import ChatSchema from "../Schemas/ChatSchema";
import connectToDb from "../Middlewares/connectToDb";
import verifyJwtToken from "../Middlewares/verifyJwtToken";
import alertMsgs from "@/Functions/alertMsgs";

async function callback(req, res) {
    const {userId} = req
    try{
        const chats = await ChatSchema.find({userId});
        return res.json({miss: true, chats})
    } catch(e){
        return res.json({miss: false, alert: alertMsgs('internal-server-error')})
    }
}

const helper = (req, res) => connectToDb(req, res, callback);

export default (req, res) => verifyJwtToken(req, res, helper)
