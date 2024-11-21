import alertMsgs from '@/Functions/alertMsgs';
import mongoose  from 'mongoose';


const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@notes-with-bot.ff84r.mongodb.net/?retryWrites=true&w=majority&appName=Notes-with-Bot`;

export default async function connectToDb(req, res ,callback){
    if(mongoose.connections[0].readyState) return callback(req, res);
    try{
        await mongoose.connect(url);
        console.log('done')
        return callback(req, res);
    } catch(e){
        console.log(e)
        return res.status(500).json({alert:alertMsgs('internal-server-error'), done: false});
    }
}