import jwt from 'jsonwebtoken';
import alertMsgs from '@/Functions/alertMsgs';

export default async function(req, res, callback){
    const {token} = req.headers;
    if(!token) return res.json({miss: false, alert: alertMsgs('token-not-found')});
    try{
        const {id} = jwt.verify(token, process.env.JWT_KEY);
        req.userId = id
        return callback(req, res);
    } catch(e){
        console.log(e)
        return res.json({miss: false, alertMsgs: alertMsgs('internal-server-error')})
    }
}