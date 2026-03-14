interface ExplanationCardProps {
  topic: string;
  explanation: string;
}

export default function ExplanationCard({ topic, explanation }: ExplanationCardProps) {
  return (
    <div className="w-full max-w-9xl p-6 border rounded-md shadow-lg mt-6 bg-gray-50 min-h-125 overflow-y-auto">
      <h2 className="text-xl font-bold mb-2 text-center">Topic: {topic}</h2>
      <p className="text-gray-800 whitespace-pre-wrap">{explanation}</p>
    </div>
  );
}