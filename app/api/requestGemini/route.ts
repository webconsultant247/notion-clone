import { NextRequest, NextResponse } from "next/server";
import { requestGemini } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Parse JSON body
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { message: "Prompt is required" },
        { status: 400 }
      );
    }

    const result = await requestGemini(prompt); // Call your server-side function
    if (result.status) {
      return NextResponse.json({
        message: result.response,
        status: true,
      }); // Return JSON response
    } else {
      return NextResponse.json({
        message: "Failed to get response from Gemini",
        status: false,
      });
    }
  } catch (error) {
    console.error("Error in /api/requestGemini:", error);
    return NextResponse.json({
      message: "Failed to get response from Gemini",
      status: false,
    });
  }
}
