import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

/**
 * DecryptedText Component
 * 
 * Props:
 * - text (string): The original text to reveal.
 * - speed (number, default: 50): Speed of character reveal.
 * - maxIterations (number, default: 10): How many times the scramble animation runs.
 * - sequential (boolean, default: false): If true, characters reveal in order.
 * - revealDirection ("start" | "end" | "center", default: "start"): Where the text starts revealing.
 * - useOriginalCharsOnly (boolean, default: false): If true, shuffles only characters from original text.
 * - characters (string): Allowed characters for random scrambling.
 * - className (string): Class applied to revealed characters.
 * - encryptedClassName (string): Class applied to scrambled characters.
 * - parentClassName (string): Class applied to the top-level span container.
 */

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  ...props
}) {
  const [displayText, setDisplayText] = useState(text);
  const [revealedIndices, setRevealedIndices] = useState(new Set());
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (hasAnimated) return; // Prevent re-running
    setHasAnimated(true);

    let interval;
    let currentIteration = 0;

    const getNextIndex = (revealedSet) => {
      const length = text.length;
      switch (revealDirection) {
        case "start":
          return revealedSet.size;
        case "end":
          return length - 1 - revealedSet.size;
        case "center": {
          const middle = Math.floor(length / 2);
          const offset = Math.floor(revealedSet.size / 2);
          const nextIndex = revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;
          if (nextIndex >= 0 && nextIndex < length && !revealedSet.has(nextIndex)) {
            return nextIndex;
          }
          for (let i = 0; i < length; i++) {
            if (!revealedSet.has(i)) return i;
          }
          return 0;
        }
        default:
          return revealedSet.size;
      }
    };

    const availableChars = useOriginalCharsOnly
      ? Array.from(new Set(text.split(""))).filter((char) => char !== " ")
      : characters.split("");

    const shuffleText = (originalText, revealedSet) => {
      return originalText
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (revealedSet.has(i)) return originalText[i];
          return availableChars[Math.floor(Math.random() * availableChars.length)];
        })
        .join("");
    };

    interval = setInterval(() => {
      setRevealedIndices((prev) => {
        if (sequential && prev.size < text.length) {
          const nextIndex = getNextIndex(prev);
          const newRevealed = new Set(prev);
          newRevealed.add(nextIndex);
          setDisplayText(shuffleText(text, newRevealed));
          return newRevealed;
        } else {
          setDisplayText(shuffleText(text, prev));
          currentIteration++;
          if (currentIteration >= maxIterations) {
            clearInterval(interval);
            setDisplayText(text);
          }
          return prev;
        }
      });
    }, speed);

    return () => clearInterval(interval);
  }, []); // Runs only on mount

  return (
    <motion.span
      ref={containerRef}
      className={`inline-block whitespace-pre-wrap ${parentClassName}`}
      {...props}
    >
      <span className="sr-only">{displayText}</span>
      <span aria-hidden="true">
        {displayText.split("").map((char, index) => (
          <span key={index} className={revealedIndices.has(index) ? className : encryptedClassName}>
            {char}
          </span>
        ))}
      </span>
    </motion.span>
  );
}
