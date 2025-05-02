import { NextResponse } from "next/server";
import OpenAI from "openai";

import handleError from "@/lib/handlers/error";

export async function POST() {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      store: true,
      messages: [
        {
          role: "user",
          content: `Find the example of daily sentence around 5 - 20 words in Javanese language so it can be more accurate. because sometimes your vocabulary and grammar are still wrong. So make sure more to be correct. The sentence must relate to our daily life or daily activity. Like "Mbah lagi midhangetaken siyaran wayang kulit ing televisi", "Astane ibu kena cat tembok", "Sinta lagi njahit ageman rasukane Ibu", "Wingenane simbah tindak mrene" , etc. But I want the grammar to be correct and the vocabulary to be in correct Javanese, try searching the internet for a correct Javanese dictionary, it has to be very accurate.
          And then give me also the translation in English and Indonesian. Your format answer is JSON string like this:

            {
              "javanese": "",
              "english": "",
              "indonesian": ""
            }

          Don't make it into a code, just a regular text but you provide it like JSON format, and don't say anything else other than give me the JSON string.`,
        },
      ],
    });

    const reply = response.choices[0].message.content;

    return NextResponse.json({ reply });
  } catch (error) {
    return handleError(error, "api");
  }
}
