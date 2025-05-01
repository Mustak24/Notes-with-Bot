import alertMsgs from "@/Functions/alertMsgs";
import connectToDb from "../Middlewares/connectToDb";
import verifyJwtToken from "../Middlewares/verifyJwtToken";
import UserSchema from "../Schemas/UserSchema";

async function next02(req, res) {
    if(req.method != 'GET') return res.json({alert: alertMsgs('invalid-method-call'), miss: false});
    let {userId} = req;
    try{
        let user = await UserSchema.findById(userId);
        if(!user) return res.json({miss: false});
        return res.json({user, miss: true});
    }catch(e) {
        return res.json({alert: alertMsgs('internal-server-error'), miss: false})
    }
}

const next01 = (req, res) => connectToDb(req, res, next02);

export default (req, res) => verifyJwtToken(req, res, next01);