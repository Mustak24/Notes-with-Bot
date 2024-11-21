import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import connectToDb from '../Middlewares/connectToDb';
import alertMsgs from '@/Functions/alertMsgs';
import UserSchema from '../Schemas/UserSchema';

async function callback(req, res) {
    if(req.method !== 'POST') return res.json({miss: false, alert: alertMsgs('invalid-method-call')});
    const {username, password} = req.body;
    if(!(username && password)) return res.json({miss: false, alert: alertMsgs('internal-server-error')});
    try{
        const user = await UserSchema.findOne({username});
        if(!user) return res.json({miss: false, alert: alertMsgs('invalid-info')})

        const validUser = await bcrypt.compare(password, user.password);
        if(!validUser) return res.json({miss: false, alert: alertMsgs('invalid-info')});

        const token = jwt.sign({id: user._id}, process.env.JWT_KEY);
        res.cookies = {token}
        return res.json({miss: true, alert: alertMsgs('login-done'), token})
    } catch(e){
        console.log(e)
        return res.json({miss: false, alert: alertMsgs('internal-server-error')});
    }
}

export default (req, res) => connectToDb(req, res, callback);