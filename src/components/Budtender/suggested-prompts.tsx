import { ArrowUp } from 'lucide-react';
import React from 'react';

type Props = {
  handleSendPremadeMessage: (message: string) => void;
};

function SuggestedPrompts({ handleSendPremadeMessage }: Props) {
  return (
    <div className="flex flex-col gap-y-2 px-1 w-full">
      <div className="flex-col sm:flex-row flex gap-2">
        <button
          onClick={() =>
            handleSendPremadeMessage(
              'Describe effects of weed on cognitive functions.',
            )
          }
          className="flex flex-row px-5 py-3 border border-zinc-600 rounded-md hover:bg-zinc-600/40 justify-between items-center w-full group"
        >
          <div className="flex flex-col items-start">
            <span className="text-sm">Describe effects of weed</span>
            <span className="text-xs text-zinc-400">
              on cognitive functions.
            </span>
          </div>
          <div className="p-0.5 bg-zinc-900/60 ml-4 rounded group-hover:opacity-100 group-hover:scale-100 scale-0 opacity-0 transition-all duration-300">
            <ArrowUp className="w-5 h-5" />
          </div>
        </button>
        <button
          onClick={() =>
            handleSendPremadeMessage(
              'How does weed impact physical coordination?',
            )
          }
          className="flex flex-row px-5 py-3 border border-zinc-600 rounded-md hover:bg-zinc-600/40 justify-between items-center w-full group"
        >
          <div className="flex flex-col items-start">
            <span className="text-sm">How does weed impact </span>
            <span className="text-xs text-zinc-400">
              physical coordination?
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
            handleSendPremadeMessage(
              "Summarize weed's influence on mood and emotions.",
            )
          }
          className="flex flex-row px-5 py-3 border border-zinc-600 rounded-md hover:bg-zinc-600/40 justify-between items-center w-full group"
        >
          <div className="flex flex-col items-start">
            <span className="text-sm">Summarize weed&apos;s influence </span>
            <span className="text-xs text-zinc-400">on mood and emotions.</span>
          </div>
          <div className="p-0.5 bg-zinc-900/60 ml-4 rounded group-hover:opacity-100 group-hover:scale-100 scale-0 opacity-0 transition-all duration-300">
            <ArrowUp className="w-5 h-5" />
          </div>
        </button>
        <button
          onClick={() =>
            handleSendPremadeMessage(
              'Recommend 4 strains that work well with Durban Poison.',
            )
          }
          className="flex flex-row px-5 py-3 border border-zinc-600 rounded-md hover:bg-zinc-600/40 justify-between items-center w-full group"
        >
          <div className="flex flex-col items-start">
            <span className="text-sm">Recommend 4 strains that</span>
            <span className="text-xs text-zinc-400">
              work well with Durban Poison.
            </span>
          </div>
          <div className="p-0.5 bg-zinc-900/60 ml-4 rounded group-hover:opacity-100 group-hover:scale-100 scale-0 opacity-0 transition-all duration-300">
            <ArrowUp className="w-5 h-5" />
          </div>
        </button>
      </div>
    </div>
  );
}

export default SuggestedPrompts;
