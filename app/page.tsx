"use client";

import { useState } from "react";
import TopicInput from "../components/TopicInput";
import ExplanationCard from "../components/ExplanationCard";

export default function HomePage() {
  const [topic, setTopic] = useState<string>("");
  const [explanation, setExplanation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // This function returns Promise<void> and works with onExplain
  const handleExplain = async (inputTopic: string): Promise<void> => {
    const trimmedTopic = inputTopic.trim();
    if (!trimmedTopic) {
      setError("Please enter a topic to continue.");
      return;
    }

    setTopic(trimmedTopic);
    setExplanation("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: trimmedTopic }),
      });

      const data: { explanation?: string; error?: string } = await res.json();

      if (res.ok && data.explanation) {
        setExplanation(data.explanation);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch explanation. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl text-center font-bold mt-8 text-black">Student AI Explainer</h1>

      <TopicInput onExplain={handleExplain} />

      {loading && (
        <p className="text-center mt-4 text-gray-500">Generating explanation...</p>
      )}

      {error && <p className="text-center mt-4 text-red-500">{error}</p>}

      {explanation ? (
        <ExplanationCard topic={topic} explanation={explanation} />
      ) : null}
    </div>
  );
}