import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_APIKEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});


export default async function gemini(msg) {
    const result = await model.generateContent(msg);
    return result.response.text();
}   
