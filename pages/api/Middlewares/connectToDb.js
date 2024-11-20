import alertMsgs from '@/Functions/alertMsgs';
import mongoose  from 'mongoose';

export default async function connectToDb(req, res ,callback){
    if(mongoose.connections[0].readyState) return callback(req, res);
    try{
        await mongoose.connect('mongodb://localhost:27017/chat-bot');
        return callback(req, res);
    } catch(e){
        console.log(e)
        return res.status(500).json({alert:alertMsgs('internal-server-error'), done: false});
    }
}