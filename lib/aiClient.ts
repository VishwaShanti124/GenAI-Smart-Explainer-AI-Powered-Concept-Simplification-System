import axios from "axios";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Function to call OpenRouter
async function callOpenRouter(prompt: string) {
  if (!OPENROUTER_API_KEY) throw new Error("OpenRouter API key missing");

  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200,
    },
    {
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data?.choices?.[0]?.message?.content || null;
}

// Function to call Gemini API
async function callGemini(prompt: string) {
  if (!GEMINI_API_KEY) throw new Error("Gemini API key missing");

  const response = await axios.post(
    "https://api.gemini.com/v1/ai/chat/completions", // Example endpoint, replace with actual Gemini endpoint
    {
      model: "gemini-1.5",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200,
    },
    {
      headers: {
        "Authorization": `Bearer ${GEMINI_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data?.choices?.[0]?.message?.content || null;
}

// Exported function – tries OpenRouter first, then Gemini
export async function generateExplanation(topic: string) {
  if (!topic || topic.trim() === "") throw new Error("Topic is required");

  const prompt = `Explain the topic '${topic}' in simple terms for a student.`;

  try {
    // Try OpenRouter first
    const openRouterResult = await callOpenRouter(prompt);
    if (openRouterResult) return openRouterResult;

    // If OpenRouter returns null or empty, fallback to Gemini
    return await callGemini(prompt);
  } catch (error: unknown) {
    console.warn("OpenRouter failed, trying Gemini...", error);

    try {
      return await callGemini(prompt);
    } catch (gemError: unknown) {
      if (gemError instanceof Error) throw new Error(`Gemini also failed: ${gemError.message}`);
      throw new Error("Both OpenRouter and Gemini failed");
    }
  }
}