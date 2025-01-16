import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Ensure API key is set
if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in the environment!");
}

const geminiApiKey = process.env.GEMINI_API_KEY;

/**
 * Handles the chat with the Gemini model.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { systemInstruction, userMessage } = body;

    if (!userMessage) {
      return NextResponse.json(
        { error: "userMessage is required" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    // Initialize the chat history with the user message
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemInstruction }],
        },
        {
          role: "user",
          parts: [{ text: userMessage }],
        },
      ],
    });

    // Process the user message and stream the result
    const resultStream = await chat.sendMessageStream(userMessage);
    let response = "";
    for await (const chunk of resultStream.stream) {
      response += chunk.text();
    }

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error in chatGemini API:", error);
    return NextResponse.json(
      { error: "Failed to communicate with Gemini" },
      { status: 500 }
    );
  }
}
