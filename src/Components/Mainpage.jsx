import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const Mainpage = () => {
  const [query, setQuery] = useState("");
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  if (!apiKey) {
    return <div className="text-red-500 font-bold">API Key is missing! Check .env file.</div>;
  }

  const ai = new GoogleGenerativeAI(apiKey);

  const autoResize = () => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    autoResize();
  }, [query]);

  const appendAmazonLinks = (response) => {
    const parts = response.split("\n").filter(line => line.trim() !== "");
    const formatted = parts.map((line, index) => {
      // First paragraph is the intro about the topic
      if (index === 0 && !line.includes(":")) {
        return `<p class="mb-4 italic text-gray-200">${line.trim()}</p>`;
      }
  
      // Expected format: Book Title: Description
      const [title, ...descParts] = line.split(":");
      if (!descParts.length) return `<p>${line.trim()}</p>`; // Fallback for non-formatted lines
  
      const description = descParts.join(":").trim();
      const amazonLink = `https://www.amazon.com/s?k=${encodeURIComponent(title.trim())}`;
      return `<p><a href="${amazonLink}" target="_blank" rel="noopener noreferrer" class="text-yellow-300 font-semibold underline">${title.trim()}</a>: ${description}</p>`;
    });
  
    return formatted.join("");
  };
  

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponseText("");

    try {
      const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
      Provide a short informative paragraph about the topic: "${query}".
      
      Then recommend 5 relevant books in this format:
      Book Title: Short description.
      
      Do NOT use bullets or stars. Just separate them by line breaks.
      Only the book title should be a clickable link.
      `;
      const result = await model.generateContent(prompt);
      const response = await result.response.text();

      const formatted = appendAmazonLinks(response);
      setResponseText(formatted || "No suggestions found.");
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponseText("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setQuery("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white flex flex-col items-center px-4 py-8 font-sans">
      <h1 className="text-4xl font-bold text-center mb-2">📚 Ask Anything About Books</h1>
      <p className="text-lg text-gray-300 mb-6">Get book recommendations and clickable links instantly!</p>
      <hr className="border-gray-600 w-1/2 mb-10" />

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
            className="bg-[#7356dd] hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition disabled:bg-gray-400"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>

      <div
        className={`transition-all duration-500 ease-in-out bg-[#ffffff1a] text-white p-6 rounded-lg shadow-lg min-h-[180px] ${
          responseText ? "w-full max-w-5xl" : "w-full max-w-3xl"
        }`}
      >
        <h2 className="text-xl font-semibold mb-3">Answer:</h2>
        <div
          className="text-base leading-relaxed space-y-3"
          dangerouslySetInnerHTML={{
            __html: loading ? "Thinking..." : responseText || "Your answer will appear here.",
          }}
        />
      </div>
    </div>
  );
};

export default Mainpage;
