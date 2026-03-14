import { NextResponse } from "next/server";
import { generateExplanation } from "../../../lib/aiClient";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const topic = body.topic as string;

    if (!topic || topic.trim() === "") {
      return NextResponse.json({ error: "Please enter a topic to continue." }, { status: 400 });
    }

    const explanation = await generateExplanation(topic);
    return NextResponse.json({ explanation });

  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
  }
}