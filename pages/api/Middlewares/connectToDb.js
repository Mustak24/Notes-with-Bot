import mongoose  from 'mongoose';

export default async function connectToDb(req, res ,callback){
    if(mongoose.connections[0].readyState) return callback(req, res);
    // const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@newqualitymarble.jhzfz.mongodb.net/WebsiteData?appName=newqualitymarble`;
    try{
        await mongoose.connect('mongodb://localhost:27017/chat-bot');
        return callback(req, res);
    } catch(e){
        return res.status(500).json({alert:{type: 'error', title: 'Error', dec: 'Internal server error !!!'}, done: false});
    }
}