"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
import { TypewriterEffect } from "./TypeWriterEffect";

export function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
      >
   <div className="flex flex-col items-center justify-center min-h-screen pt-0 -mt-16">
  <TypewriterEffect
    words={[{ text: "ShelfMate" }]}
    className="bg-gradient-to-br from-slate-300 to-slate-500 opacity-50 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-7xl"
    cursorClassName="bg-white"
  />
  <TypewriterEffect
    words={[{ text: `Read smarter, discover better.` }]}
    className="mt-2 text-lg text-slate-400 opacity-50 md:text-2xl"
    cursorClassName="hidden"
  />
</div>

      </motion.h1>
    </LampContainer>
  );
}

export const LampContainer = ({ children, className }) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 w-full rounded-md",
        className
      )}
    >
      <div className="relative flex w-full flex-1 items-center justify-center isolate z-0">
        {/* ✅ Keeping the Shadow & Slate Fixed */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute  top-0 right-1/2 h-56 w-[30rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-[100%] left-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-[100%] left-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "33rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute top-2 left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-40 h-[100%] right-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-[100%] right-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* ✅ Fixed Shadow & Slate Position */}
        <div className="absolute top-0 h-48 w-full bg-slate-950 blur-2xl"></div>
        <div className="absolute top-0 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute top-0 inset-auto z-50 h-36 w-[28rem] rounded-full bg-cyan-500 opacity-50 blur-3xl"></div>

        {/* ✅ Keeping Shadow & Slate Fixed */}
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "29rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute top-0 inset-auto z-30 h-36 w-64 rounded-full bg-cyan-400 blur-2xl"
        ></motion.div>

        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "35rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute top-0 inset-auto z-50 h-0.5 w-[30rem] bg-cyan-400"
        ></motion.div>

        {/* ✅ Removed Extra Gap by Eliminating -translate-y */}
        <div className="absolute top-0 inset-auto z-40 h-44 w-full bg-slate-950"></div>
      </div>

      {/* ✅ Removed Extra Gap Here */}
      <div className="relative z-50 flex flex-col items-center px-5">{children}</div>
    </div>
  );
};
