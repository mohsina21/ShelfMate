import React, { useState } from "react";
import { GoogleGenAI } from "@google/genai"; // ✅ Updated Import

// ✅ Load API Key correctly
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const Mainpage = () => {
  const [query, setQuery] = useState("");
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);

  if (!apiKey) {
    console.error("🚨 API Key is missing! Make sure your .env file is set up correctly.");
    return <div className="text-red-500 font-bold">API Key is missing! Check console.</div>;
  }

  const ai = new GoogleGenAI({ apiKey }); // ✅ Initialize AI with API Key

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);

    try {
      const chat = ai.chats.create({
        model: "gemini-2.0-flash",
        history: [
          {
            role: "user",
            parts: [{ text: "Hello" }],
          },
          {
            role: "model",
            parts: [{ text: "Great to meet you. What would you like to know?" }],
          },
        ],
      });

      const stream = await chat.sendMessageStream({
        message: query,
      });

      let response = "";
      for await (const chunk of stream) {
        response += chunk.text;
      }

      setResponseText(response || "No response found. Try again.");
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponseText("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setQuery("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Ask Anything About Books 📚
        </h1>

        <div className="flex space-x-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your book-related question..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition disabled:bg-gray-400"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        <div className="mt-6 p-4 bg-gray-200 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700">Answer:</h2>
          <p className="text-gray-800 mt-2">
            {loading ? "Thinking..." : responseText || "Your answer will appear here."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
