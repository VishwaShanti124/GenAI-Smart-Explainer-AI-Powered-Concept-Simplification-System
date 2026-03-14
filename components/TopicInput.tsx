"use client";

import { useState, ChangeEvent } from "react";

// Props interface
export interface TopicInputProps {
  onExplain: (topic: string) => void;
}

// Default export
export default function TopicInput(props: TopicInputProps) {
  const { onExplain } = props;
  const [input, setInput] = useState<string>("");

  const handleClick = () => {
    const trimmedInput = input.trim();
    if (trimmedInput) {
      onExplain(trimmedInput);
      setInput(""); // Optional: clear input after sending
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto mt-8">
      <input
        type="text"
        placeholder="Enter a topic"
        value={input}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="button"
        onClick={handleClick}
        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Explain Topic
      </button>
    </div>
  );
}