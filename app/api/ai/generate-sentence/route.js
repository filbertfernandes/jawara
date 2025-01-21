import { NextResponse } from "next/server";
import OpenAI from "openai";

import handleError from "@/lib/handlers/error";

export async function POST() {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      store: true,
      messages: [
        {
          role: "user",
          content: `Generate sentence in Javanese language around 5 - 20 words. The sentence must relate to our daily life or daily activity. Like "I love fishing every weekend", "Yesterday I just watched a really good movie named Interstellar", "I love to eat fried chicken, but not too much because it's unhealthy!", etc.

            And then give me also the translation in English and Indonesian. Your format answer is JSON string like this:

            {
              "javanese": "",
              "english": "",
              "indonesian": ""
            }

            Don't make it into a code, just a regular text but you provide it like JSON format, and don't say anything else other than give me the JSON string.`,
        },
      ],
    });

    const reply = response.choices[0].message.content;
    // const reply = `{ "javanese": "Aku seneng mangan sega liwet bareng keluarga saben akhir minggu.", "english": "I love to eat liwet rice with my family every weekend.", "indonesian": "Saya suka makan nasi liwet bersama keluarga setiap akhir pekan." }`; // TO BE DELETED

    return NextResponse.json({ reply });
  } catch (error) {
    return handleError(error, "api");
  }
}
