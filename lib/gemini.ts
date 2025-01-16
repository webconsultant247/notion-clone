"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";
// const { GoogleGenerativeAI } = require("@google/generative-ai");

if (!process.env.GEMINI_API_KEY) {
  throw new Error("process.env.GEMINI_API_KEY is not set!");
}

const geminiApiKey = process.env.GEMINI_API_KEY;

export const requestGemini = async (prompt: string) => {
  try {
    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    console.log(result);
    return {
      status: true,
      response: result.response.text(),
    };
  } catch (error) {
    console.error("Failed to fetch:", error);
    return {
      status: false,
      response: error || "Failed to use GEMINI API",
    };
  }
};

export const chatWithGemini = async (prompt: string, data: string) => {
  const genAI = new GoogleGenerativeAI(geminiApiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `You are an assistant helping with user to chat to a document. I will provide JSON file of markdown for the document. Using this answer, answer the user in the clearest possible way. The document is about ${data}`,
  });
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: `My question is ${prompt}` }],
      },
    ],
  });
};
