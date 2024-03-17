import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { cn } from '@l/utils/cn';

function genDateString(dateString?: string) {
  const date = new Date(dateString ? Date.parse(dateString) : Date.now());

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
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
  return (
    <div className={cn('w-full flex flex-col gap-y-1', author === 'user' && "items-end")}>
      <span className={'font-medium text-sm'}>{name}</span>
      <div
        className={cn(
          'bg-zinc-900 text-white px-4 pt-2.5 pb-1 rounded-xl rounded-bl-none flex flex-col overflow-y-scroll max-w-[90%]',
          author === 'user' &&
            'bg-white text-black rounded-br-none rounded-bl-xl',
        )}
      >
        <Markdown remarkPlugins={[[remarkGfm, { singleTilde: false }]]} className={"flex flex-col gap-y-3"}>
          {content}
        </Markdown>
        <div className="w-full flex flex-row justify-end text-xs items-end">
          <span>{genDateString(date)}</span>
        </div>
      </div>
    </div>
  );
}

export default Message;
