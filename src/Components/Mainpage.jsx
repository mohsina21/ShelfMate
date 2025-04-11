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

  const formatResponse = (response) => {
    const lines = response.split("\n").filter(line => line.trim() !== "");
    let formatted = "";
    let books = [];

    lines.forEach((line, index) => {
      const linkMatch = line.match(/\((https?:\/\/www\.amazon\.com\/[^)]+)\)/);
      const hasDash = line.includes(" - ");

      if (index === 0 && !hasDash) {
        formatted += `<p class="mb-4 italic text-gray-200"><strong>Answer:</strong> ${line.trim()}</p>`;
      }

      if (line.includes("Here are some book recommendations")) {
        formatted += `<p class="mt-4 font-bold text-white">Here are some book recommendations based on your prompt:</p>`;
      }

      if (hasDash && linkMatch) {
        books.push(line);
      }
    });

    if (books.length) {
      const recommendations = books.map(book => {
        const linkMatch = book.match(/\((https?:\/\/www\.amazon\.com\/[^)]+)\)/);
        const [titlePart, ...descPart] = book.split(" - ");
        const title = titlePart.trim();
        const description = descPart.join(" - ").replace(/\(https?:\/\/.*?\)/, "").trim();
        const url = linkMatch ? linkMatch[1] : "#";

        return `<p><a href="${url}" target="_blank" rel="noopener noreferrer" class="text-yellow-300 font-semibold underline">${title}</a>: ${description}</p>`;
      });

      formatted += `<div class="mt-6 space-y-2">${recommendations.join("")}</div>`;
    }

    return formatted || "No suggestions found.";
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponseText("");

    try {
      const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
Answer the following book-related question in a paragraph:

"${query}"

Then, on a new line, include the following statement in bold:
**Here are some book recommendations based on your question:**

After that, list relevant books in this format (no markdown, no bullet points):
Title - Short Description (Amazon Product Link)

Formatting rules:
- The title should be plain text (not in brackets).
- Only include direct Amazon product links (e.g., https://www.amazon.com/dp/XXXXXXXXXX).
- Do not use markdown, bullets, or any extra formatting.
- Only the title should be clickable in the output.

Example:
The Hobbit - A fantasy adventure novel. (https://www.amazon.com/dp/B003ZX71RW)
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response.text();
      const formatted = formatResponse(response);

      setResponseText(formatted);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponseText("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setQuery("");
    }
  };

  return (
    <div className="min-h-screen bg-[#020618] text-white flex flex-col items-center px-4 py-8 font-sans">
      <h1 className="text-4xl font-bold text-center mb-2">Ask Anything About Books</h1>
      <hr className="border-gray-600 w-1/2 mb-10" />

      <div className="flex flex-col items-center space-y-4 w-full max-w-2xl mb-8">
        <div className="flex space-x-2 w-full">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your book-related question..."
            className="flex-1 px-4 py-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-3 rounded-lg transition disabled:bg-gray-400"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>

      {responseText && (
        <div className="transition-all duration-500 ease-in-out bg-[#ffffff1a] text-white p-6 rounded-lg shadow-lg w-full max-w-5xl">
          <div
            className="text-base leading-relaxed space-y-3"
            dangerouslySetInnerHTML={{
              __html: loading ? "Thinking..." : responseText,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Mainpage;
