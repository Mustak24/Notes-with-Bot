import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_APIKEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});


export default async function gemini(msg) {
  try{
    const result = await model.generateContent(msg);
    return result.response.text();
  } catch(e){
    console.log(e)
    return 'Internal Server Error Come in Bot Api'
  }
}