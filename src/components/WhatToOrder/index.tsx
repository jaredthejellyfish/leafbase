"use client";

import { Bot, Loader } from "lucide-react";

import React, { useState } from "react";

function WhatToOrder() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  async function streamedCompletion() {
    setLoading(true);
    try {
      const response = await fetch("/api/generate/what-to-order");
      if (!response.ok || !response.body) {
        throw response.statusText;
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      const loopRunner = true;
      while (loopRunner) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        const decodedChunk = decoder.decode(value, { stream: true });
        setText((answer) => (answer + decodedChunk).replace('"', ""));
      }
    } catch (error) {
      setText("Error generating recommendation...");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg border border-zinc-100 bg-white px-4 py-3 shadow-md dark:border-transparent dark:bg-zinc-900">
      <h3 className="mb-1.5 text-xl font-bold">Suggested Order:</h3>
      {text.length > 0 ? (
        <p className="text-zinc-400">{text}</p>
      ) : (
        <button
          onClick={() => streamedCompletion()}
          className="flex flex-row items-center justify-center gap-x-2 rounded border border-zinc-300 py-2 pl-3 pr-4 dark:border-zinc-600"
        >
          {loading ? (
            <>
              <Loader
                className="p-1 text-green-700"
                width={31}
                height={31}
                style={{
                  animation: "spin 1s linear infinite",
                }}
              />{" "}
              <span className="mt-0.5 font-medium text-zinc-500 dark:text-zinc-400">
                Generating recommendation
              </span>
            </>
          ) : (
            <>
              <Bot className="p-1 text-green-700" width={31} height={31} />
              <span className="mt-0.5 font-medium text-zinc-500 dark:text-zinc-400">
                Generate recommendation
              </span>
            </>
          )}
        </button>
      )}
    </div>
  );
}

export default WhatToOrder;
