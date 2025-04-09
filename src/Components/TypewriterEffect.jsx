"use client";

import { cn } from "../lib/utils";
import { motion, stagger, useAnimate, useInView } from "motion/react";
import { useEffect } from "react";

// ───────────────────────────────────────────
// TYPEWRITER EFFECT
// ───────────────────────────────────────────
export const TypewriterEffect = ({
  words = ["ShelfMate"],
  className,
  cursorClassName,
}) => {
  if (!Array.isArray(words)) {
    console.error("TypewriterEffect: 'words' should be an array");
    return null;
  }

  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text ? word.text.split("") : [],
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
  }, [isInView, animate]);

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
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
          <span>&nbsp;</span>
        </div>
      ))}
    </motion.div>
  );

  return (
    <div className={cn("font-bold", className)} style={{ whiteSpace: "nowrap" }}>
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

// ───────────────────────────────────────────
// SMOOTH TYPEWRITER EFFECT
// ───────────────────────────────────────────
export const TypewriterEffectSmooth = ({
  words = [],
  className,
  cursorClassName,
}) => {
  if (!Array.isArray(words)) {
    console.error("TypewriterEffectSmooth: 'words' should be an array");
    return null;
  }

  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text ? word.text.split("") : [],
  }));

  const renderWords = () => (
    <div>
      {wordsArray.map((word, idx) => (
        <div key={`word-${idx}`} className="inline-block">
          {word.text.map((char, index) => (
            <span
              key={`char-${index}`}
              className={cn("dark:text-white text-black", word.className)}
            >
              {char}
            </span>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className={cn("font-bold inline-flex items-center", className)} style={{ whiteSpace: "nowrap" }}>
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
          "inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-blue-500 ml-1",
          cursorClassName
        )}
      />
    </div>
  );
};
