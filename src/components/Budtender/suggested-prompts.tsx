'use client';

import { ArrowUp, RefreshCw } from 'lucide-react';
import React, { useState } from 'react';

type Props = {
  handleSendPremadeMessage: (message: string) => void;
};

const prompts = [
  'Describe effects of weed\n on cognitive functions.',
  'How does weed impact\n physical coordination?',
  "Summarize weed's influence\n on mood and emotions.",
  'Recommend 4 strains that\n work well with Durban Poison.',
  'Explain the role of THC and CBD\n in medicinal cannabis use.',
  'Discuss the potential risks\n of long-term cannabis use.',
  'Outline the legal status\n of cannabis in various countries.',
  'Compare the effects of indica\n versus sativa strains.',
  'Detail the process of obtaining\n a medical marijuana card.',
  'Analyze the impact of cannabis\n on sleep patterns and quality.',
  'Explain the entourage effect\n in cannabis consumption.',
  'Describe the benefits of\n microdosing cannabis.',
  'Discuss the potential risks\n of cannabis use during pregnancy.',
  'Explain the difference between\n hemp and marijuana.',
  'Recommend 3 strains that\n help with anxiety and depression.',
  'Summarize the effects of cannabis\n on appetite and metabolism.',
];

function SuggestedPrompts({ handleSendPremadeMessage }: Props) {
  const [randomPrompts, setPrompts] = useState(
    prompts.sort(() => Math.random() - 0.5).slice(0, 4),
  );

  return (
    <div className="relative w-full">
      <button
        className="absolute right-0 -top-3 rounded-full p-1 bg-zinc-900/60 hover:bg-zinc-900/80 transition-color duration-300 z-10"
        onClick={() =>
          setPrompts(prompts.sort(() => Math.random() - 0.5).slice(0, 4))
        }
      >
        <RefreshCw className='size-4' />
      </button>
      <div className="flex flex-col gap-y-2 px-1 w-full">
        <div className="flex-col sm:flex-row flex gap-2">
          <button
            onClick={() =>
              handleSendPremadeMessage(randomPrompts[0]!.replace('\n', ' '))
            }
            className="flex flex-row px-5 py-3 border border-zinc-600 rounded-md hover:bg-zinc-600/40 justify-between items-center w-full group"
          >
            <div className="flex flex-col items-start">
              <span className="text-sm">
                {randomPrompts[0]?.split('\n')[0]}
              </span>
              <span className="text-xs text-zinc-400">
                {randomPrompts[0]?.split('\n').pop()}
              </span>
            </div>
            <div className="p-0.5 bg-zinc-900/60 ml-4 rounded group-hover:opacity-100 group-hover:scale-100 scale-0 opacity-0 transition-all duration-300">
              <ArrowUp className="w-5 h-5" />
            </div>
          </button>
          <button
            onClick={() =>
              handleSendPremadeMessage(randomPrompts[1]!.replace('\n', ' '))
            }
            className="flex flex-row px-5 py-3 border border-zinc-600 rounded-md hover:bg-zinc-600/40 justify-between items-center w-full group"
          >
            <div className="flex flex-col items-start">
              <span className="text-sm">
                {randomPrompts[1]?.split('\n')[0]}
              </span>
              <span className="text-xs text-zinc-400">
                {randomPrompts[1]?.split('\n').pop()}
              </span>
            </div>
            <div className="p-0.5 bg-zinc-900/60 ml-4 rounded group-hover:opacity-100 group-hover:scale-100 scale-0 opacity-0 transition-all duration-300">
              <ArrowUp className="w-5 h-5" />
            </div>
          </button>
        </div>
        <div className="flex-row gap-x-2 hidden sm:flex">
          <button
            onClick={() =>
              handleSendPremadeMessage(randomPrompts[2]!.replace('\n', ' '))
            }
            className="flex flex-row px-5 py-3 border border-zinc-600 rounded-md hover:bg-zinc-600/40 justify-between items-center w-full group"
          >
            <div className="flex flex-col items-start">
              <span className="text-sm">
                {randomPrompts[2]?.split('\n')[0]}
              </span>
              <span className="text-xs text-zinc-400">
                {randomPrompts[2]?.split('\n').pop()}
              </span>
            </div>
            <div className="p-0.5 bg-zinc-900/60 ml-4 rounded group-hover:opacity-100 group-hover:scale-100 scale-0 opacity-0 transition-all duration-300">
              <ArrowUp className="w-5 h-5" />
            </div>
          </button>
          <button
            onClick={() =>
              handleSendPremadeMessage(randomPrompts[3]!.replace('\n', ' '))
            }
            className="flex flex-row px-5 py-3 border border-zinc-600 rounded-md hover:bg-zinc-600/40 justify-between items-center w-full group"
          >
            <div className="flex flex-col items-start">
              <span className="text-sm">
                {randomPrompts[3]?.split('\n')[0]}
              </span>
              <span className="text-xs text-zinc-400">
                {randomPrompts[3]?.split('\n').pop()}
              </span>
            </div>
            <div className="p-0.5 bg-zinc-900/60 ml-4 rounded group-hover:opacity-100 group-hover:scale-100 scale-0 opacity-0 transition-all duration-300">
              <ArrowUp className="w-5 h-5" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuggestedPrompts;
