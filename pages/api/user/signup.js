import alertMsgs from "@/Functions/alertMsgs";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserSchema from "../Schemas/UserSchema";
import connectToDb from "../Middlewares/connectToDb";

async function callback(req, res) {
    if(req.method !== 'POST') return res.json({miss: false, alert:alertMsgs('invalid-method-call')});
    const {username, password} = req.body;
    if(!(username && password)) return res.json({miss: false, alert:alertMsgs('internal-server-error')});
    try{
        if(await UserSchema.findOne({username})) return res.json({miss: false, alert: alertMsgs('username-not-available')})
        const passwordHash = await bcrypt.hash(password, await bcrypt.genSalt(10));
        const user = await UserSchema.create({username, password: passwordHash});
        const token = jwt.sign({id: user._id}, process.env.JWT_KEY);
        res.cookies = {token}
        return res.json({miss: true, alert: alertMsgs('signup-done')}, token);
    } catch(e){
        console.log(e)
        return res.json({miss: false, alert:alertMsgs('internal-server-error')});
    }

}

export default (req, res) => connectToDb(req, res, callback);
