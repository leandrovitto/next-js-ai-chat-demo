import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextRequest } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
/* const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}); */

const openai = new OpenAI();

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);
  const messages: ChatCompletionMessageParam[] = body.messages ?? [];

  console.log("Messages ", messages);

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
