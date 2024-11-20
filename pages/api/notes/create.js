import verifyJwtToken from "../Middlewares/verifyJwtToken";

const { default: alertMsgs } = require("@/Functions/alertMsgs");
const { default: connectToDb } = require("../Middlewares/connectToDb");
const { default: NotesSchema } = require("../Schemas/NotesSchema");

async function callback(req, res) {
    const {userId} = req
    const {title, content} = req.body.note
    try{
        let note = await NotesSchema.create({
            title, content, userId
        })
        return res.json({miss: true, note, alert: alertMsgs('note-create-done')})
    } catch(e){
        console.log(e)
        return res.json({miss: false, alert: alertMsgs('internal-server-error')})
    }
}


const halper = (req, res) => connectToDb(req, res, callback)

export default (req,  res) => verifyJwtToken(req, res, halper)