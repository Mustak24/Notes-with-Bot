import alertMsgs from '@/Functions/alertMsgs';
import mongoose  from 'mongoose';


export default async function connectToDb(req, res ,callback){
    if(mongoose.connections[0].readyState) return callback(req, res);
    let url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@notes-with-bot.ff84r.mongodb.net/WebsiteData`;
    try{
        await mongoose.connect(url);
        return callback(req, res);
    } catch(e){
        console.log(e)
        return res.status(500).json({alert:alertMsgs('internal-server-error'), miss: false});
    }
}