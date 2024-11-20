import alertMsgs from '@/Functions/alertMsgs';
import jwt from 'jsonwebtoken';
import UserSchema from '../Schemas/UserSchema';
import connectToDb from '../Middlewares/connectToDb';

async function callback(req, res){
    const {token} = req.headers;
    if(!token) return res.json({miss: false, alert: alertMsgs('interval-server-error')});
    try{
        const {id} = jwt.verify(token, process.env.JWT_KEY);
        const user = await UserSchema.findById(id).select({password: 0})
        if(!user) return res.json({miss: false, alert: alertMsgs('internal-server-error')});
        return res.json({miss: true, user})
    } catch(e){
        console.log(e)
        return res.json({miss: false, alert: alertMsgs('internal-server-error')})
    }
}

export default (req, res) => connectToDb(req, res, callback)