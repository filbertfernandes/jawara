import { NextResponse } from "next/server";
// import OpenAI from "openai";

import handleError from "@/lib/handlers/error";

export async function POST(request) {
  // const openai = new OpenAI({
  //   apiKey: process.env.OPENAI_API_KEY,
  // });

  const { javanese, english, indonesian, userAnswer } = await request.json();

  try {
    // const response = await openai.chat.completions.create({
    //   model: "gpt-3.5-turbo",
    //   store: true,
    //   messages: [
    //     {
    //       role: "system",
    //       content: `
    //       You are a very helpful Javanese language teacher, you are friendly and good at explain the student.
    //       Now you're giving your student a task, you provide an english / indonesian sentence, and you tell your student to translate the sentence into Javanese language.
    //       Here is the sentence that you gave:
    //       "javanese": "${javanese}", "english": "${english}", "indonesian": "${indonesian}"
    //       The student answer should match the "javanese" one to be correct.
    //     `,
    //     },
    //     {
    //       role: "user",
    //       content: `
    //       You gave the student this sentence: "${english}"
    //       Here is your student javanese translation answer: "${userAnswer}"
    //       The correct answer should be: "${javanese}"
    //       You should reply the student with this json format (but don't make it into a code, just a plain text but in json):
    //       { isTrue: boolean, "feedback": "", "explanation": "" }
    //        isTrue will be true if correct, and false if wrong. Also if the student give a blank answer "", it should be wrong.
    //        The "feedback" is like an appreciation, if student is correct, could be "Awesome!", "Amazing!", "Nice job!" or anything in your mind. If student is wrong, could be "Don't give up!", "Try again!", or anything in your mind.
    //        The "explanation" is your explanation of the translation. Explain it by first tell the right sentence (if incorrect), and then breakdown the Javanese sentence. You don't have to tell the user the English sentence because user already know that, focus explaining the Javanese sentence. If user is correct, just breakdown, don't have to tell the right sentence.
    //       `,
    //     },
    //   ],
    // });

    // const reply = response.choices[0].message.content;
    const reply = `{ "isTrue": true, "feedback": "Amazing!", "explanation": "Is this the real life? Is this just fantasy? Caught in a landslide no escape from reality. Open your eyes, look to the skies and see, I'm just a poor boy i need no sympathy. Because i'm easy come, easy go, little high, little low. Anyway the wind blows doesn't really matter to me, to me.. Mama just killed a man, put a gun againts his head, pulled my trigger now he's dead, mama life had just begun, but now I've gone and thrown it all away." }`; // TO BE DELETED

    return NextResponse.json({ reply });
  } catch (error) {
    return handleError(error, "api");
  }
}
