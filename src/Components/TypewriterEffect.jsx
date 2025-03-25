"use client";

import { cn } from "../lib/utils";
import { motion, stagger, useAnimate, useInView } from "motion/react";
import { useEffect } from "react";

export const TypewriterEffect = ({
  words = [ "ShelfMate"], // ✅ Ensure words is an array by default
  className,
  cursorClassName,
}) => {
  if (!Array.isArray(words)) {
    console.error("TypewriterEffect: 'words' should be an array");
    return null; // Prevents rendering if words is invalid
  }

  // Split text inside words into an array of characters
  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text ? word.text.split("") : [], // ✅ Ensure text is split correctly
  }));

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          display: "inline-block",
          opacity: 1,
          width: "fit-content",
        },
        {
          duration: 0.3,
          delay: stagger(0.1),
          ease: "easeInOut",
        }
      );
    }
  }, [isInView, animate]); // ✅ Added animate to dependency array

  const renderWords = () => (
    <motion.div ref={scope} className="inline">
      {wordsArray.map((word, idx) => (
        <div key={`word-${idx}`} className="inline-block">
          {word.text.map((char, index) => (
            <motion.span
              key={`char-${index}`}
              className={cn(
                "dark:text-white text-black opacity-0 hidden",
                word.className
              )}
            >
              {char === " " ? "\u00A0" : char} {/* ✅ Ensures spaces are preserved */}
            </motion.span>
          ))}
          <span>&nbsp;</span> {/* ✅ Adds space between words */}
        </div>
      ))}
    </motion.div>
  );
  
  return (
    <div
      className={cn(
        "text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center",
        className
      )}
    >
      {renderWords()}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-blue-500",
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};

export const TypewriterEffectSmooth = ({
  words = [], // ✅ Default value to avoid errors
  className,
  cursorClassName,
}) => {
  if (!Array.isArray(words)) {
    console.error("TypewriterEffectSmooth: 'words' should be an array");
    return null; // Prevents rendering if words is invalid
  }

  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text ? word.text.split("") : [], // ✅ Ensure text is processed correctly
  }));

  const renderWords = () => (
    <div>
      {wordsArray.map((word, idx) => (
        <div key={`word-${idx}`} className="inline-block">
          {word.text.map((char, index) => (
            <span
              key={`char-${index}`}
              className={cn("dark:text-white text-black ", word.className)}
            >
              {char}
            </span>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className={cn("flex space-x-1 my-6", className)}>
      <motion.div
        className="overflow-hidden pb-2"
        initial={{ width: "0%" }}
        whileInView={{ width: "fit-content" }}
        transition={{ duration: 2, ease: "linear", delay: 1 }}
      >
        <div
          className="text-xs sm:text-base md:text-xl lg:text:3xl xl:text-5xl font-bold"
          style={{ whiteSpace: "nowrap" }}
        >
          {renderWords()}{" "}
        </div>{" "}
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className={cn(
          "block rounded-sm w-[4px] h-4 sm:h-6 xl:h-12 bg-blue-500",
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};
