import dynamic from 'next/dynamic';
import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { cn } from '@/lib/utils/cn';

const StrainCards = dynamic(() => import('./strain-card'), {
  ssr: false,
});

function genDateString(dateString?: string) {
  const date = new Date(dateString ? Date.parse(dateString) : Date.now());

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
}

function preprocessMarkdown(content: string) {
  const strainRegex = /\[strain:(.+?)}]}]/g;

  return content.replace(strainRegex, (match, json) => {
    try {
      const data = JSON.parse(json + '}]}') as { strains?: unknown[] };

      if (
        Array.isArray(data) ||
        (data.strains && Array.isArray(data.strains))
      ) {
        const encodedJson = encodeURIComponent(JSON.stringify(data));

        return `![strain-${encodedJson}]()`;
      } else {
        return match;
      }
    } catch (error) {
      return '';
    }
  });
}

function Message({
  author,
  content,
  date,
  name,
}: {
  name: string;
  author: 'user' | 'budtender';
  content: string;
  date?: string;
}) {
  const processedContent = preprocessMarkdown(content);

  const components = {
    img: ({ alt }: { alt: string }) => {
      const match = /^strain-(.+)/.exec(alt);
      if (!match?.[1]) return null;
      if (match) {
        try {
          const strains = JSON.parse(decodeURIComponent(match[1])) as {
            strains: {
              slug: string;
              image: string;
              name: string;
            }[];
          };
          return <StrainCards strains={strains.strains} />;
        } catch (error) {
          return null;
        }
      }
      return null;
    },
  };

  return (
    <div
      className={cn(
        'w-full flex flex-col gap-y-1',
        author === 'user' && 'items-end',
      )}
    >
      <span className={'font-medium text-sm'}>{name}</span>
      <div
        className={cn(
          'bg-zinc-900 text-white px-4 pt-2.5 pb-1 rounded-xl rounded-bl-none flex flex-col overflow-y-scroll max-w-[90%] border dark:border-transparent shadow',
          author === 'user' &&
            'bg-white text-black rounded-br-none rounded-bl-xl',
        )}
      >
        {/* @ts-expect-error - peens */}
        <Markdown remarkPlugins={[remarkGfm]} components={components}>
          {processedContent}
        </Markdown>
        <div className="w-full flex flex-row justify-end text-xs items-end">
          <span>{genDateString(date)}</span>
        </div>
      </div>
    </div>
  );
}

export default Message;
