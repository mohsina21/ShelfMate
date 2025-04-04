import React, { useState, useRef, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const Mainpage = () => {
  const [query, setQuery] = useState("");
  const [responseText, setResponseText] = useState("");
  const [streamingText, setStreamingText] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  if (!apiKey) {
    
    return <div className="text-red-500 font-bold">API Key is missing! Check console.</div>;
  }

  const ai = new GoogleGenAI({ apiKey });

  const autoResize = () => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    autoResize();
  }, [query]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponseText("");
    setStreamingText("");

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

      let finalText = "";
      for await (const chunk of stream) {
        finalText += chunk.text;
        const cleanedChunk = chunk.text
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          .replace(/\*(.*?)\*/g, "$1");
        setStreamingText((prev) => prev + cleanedChunk);
      }

      const formattedResponse = finalText
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "$1");

      setResponseText(formattedResponse || "No response found. Try again.");
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponseText("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setQuery("");
    }
  };

  return (
    <div className="min-h-screen bg-[#020618] text-white flex flex-col items-center px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">
        Ask Anything About Books 📚
      </h1>
      <hr className="border-gray-400 w-1/2 mb-10" />

    
      <div className="flex flex-col items-center space-y-4 w-full max-w-2xl mb-8">
        <div className="flex space-x-2 w-full">
          <textarea
            ref={inputRef}
            rows={1}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your book-related question..."
            className="flex-1 p-3 rounded-lg resize-none overflow-hidden text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition disabled:bg-gray-400"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>

 
      <div
        className={`transition-all duration-500 ease-in-out bg-white text-black p-6 rounded-lg min-h-[180px] ${
          responseText || streamingText ? "w-full max-w-5xl" : " w-full max-w-3xl"
        }`}
      >
        <h2 className="text-lg font-semibold mb-2">Answer:</h2>
        <p
          className="text-base leading-relaxed whitespace-pre-line"
          dangerouslySetInnerHTML={{
            __html: loading
              ? streamingText || "Thinking..."
              : responseText || "Your answer will appear here.",
          }}
        />
      </div>
    </div>
  );
};

export default Mainpage;
