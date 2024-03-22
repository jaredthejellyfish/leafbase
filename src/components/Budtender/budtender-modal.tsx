'use client';

import { useChat } from 'ai/react';
import type { Message as AIMessage } from 'ai/react';
import { Send, Trash } from 'lucide-react';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';
import { FaRegStopCircle } from 'react-icons/fa';
import { RiMessage2Line } from 'react-icons/ri';
import { useLocalStorage } from 'usehooks-ts';

import Modal from '@c/Modal';

import { cn } from '@l/utils/cn';

import { names } from './data';
import Message from './message';

const SuggestedPrompts = dynamic(() => import('./suggested-prompts'), {
  ssr: false,
});

function BudtenderModal({ userName }: { userName: string }) {
  const [name, setName] = useLocalStorage('budtender-name', '');
  const [storedMessages, setStoredMessages] = useLocalStorage<AIMessage[]>(
    'budtender-messages',
    [],
  );

  const [open, setOpen] = useState(false);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    setMessages,
    append,
  } = useChat({
    api: '/api/generate/chat',
    initialMessages: storedMessages,
    onFinish: (message) => {
      setStoredMessages((storedMessages) => [...storedMessages, message]);
    },
    body: {
      system_message: {
        id: `${Date.now()}-system`,
        role: 'system',
        content: `As an AI model named ${name}, you are programmed to function as a virtual budtender, working for Leafbase, the most extensive online database of cannabis strains. Your primary role is to assist users by answering their questions about cannabis, its safe usage, and its potential effects. You possess a vast knowledge base on all things related to cannabis. However, you are programmed to prioritize user safety and will not provide information that could potentially harm the user. Additionally, you are designed to maintain a strict focus on cannabis-related topics and will not respond to queries outside of this scope.`,
      },
    },
  });
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!name) {
      const newName =
        names[Math.floor(Math.random() * names.length)] ?? 'Budtender';
      setName(newName);
    }
  }, [name, setName]);

  function handleSubmitMessage(e: React.FormEvent<HTMLFormElement>) {
    handleSubmit(e);

    const newMessage: AIMessage = {
      id: (storedMessages.length + 1).toString(),
      role: 'user',
      content: (e.currentTarget.elements[0] as HTMLInputElement).value,
      createdAt: new Date(),
    };

    setStoredMessages((storedMessages) => [...storedMessages, newMessage]);
  }

  async function handleSendPremadeMessage(message: string) {
    const newMessage: AIMessage = {
      id: (storedMessages.length + 1).toString(),
      role: 'user',
      content: message,
      createdAt: new Date(),
    };

    setStoredMessages((storedMessages) => [...storedMessages, newMessage]);
    await append(newMessage);
  }

  function clearMessages() {
    setStoredMessages([]);
    setMessages([]);
    setName('');
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'fixed bottom-5 right-5 size-[3.2em] p-2.5 hover:bg-zinc-300 dark:hover:bg-zinc-500 trasition-color duration-300 rounded-full shadow-xl dark:bg-zinc-700 border-zinc-800 border-2 opacity-100 transition-all scale-100 z-50 flex items-center justify-center',
          open && 'scale-0',
        )}
      >
        <RiMessage2Line className="size-full" />
      </button>
      <Modal
        open={open}
        setOpen={setOpen}
        containerClass="sm:max-w-3xl"
        title={`Chatting with - ${name}` ?? 'Budtender'}
      >
        <div
          className={cn(
            'flex w-full flex-col md:max-h-[650px] max-h-[80dvh] overflow-scroll gap-y-3 relative min-h-56',
            !messages.length && 'items-center justify-center',
          )}
          ref={chatContainerRef}
        >
          {messages.length ? (
            <button
              onClick={clearMessages}
              className="fixed p-2 hover:bg-red-500 bg-zinc-900/80 rounded-full border border-zinc-700 transition-colors"
            >
              <Trash className="size-5" />
            </button>
          ) : null}
          {messages.length ? (
            messages.map((message) => (
              <Message
                key={message.id}
                name={message.role === 'user' ? userName : name}
                author={message.role === 'user' ? 'user' : 'budtender'}
                {...message}
              />
            ))
          ) : (
            <>
              <div className="w-full flex items-center justify-center flex-col">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-[120px] mt-3 mb-4 dark:stroke-slate-100 stroke-zinc-800"
                  fill="none"
                  strokeWidth="8"
                  height="800px"
                  width="800px"
                  viewBox="0 0 500 510"
                >
                  <path
                    id="XMLID_277_"
                    d="M477.16,292.045c0,0-62.848-4.221-125.061,22.069c11.664-13.634,23.084-28.804,33.416-45.603  c51.428-83.723,56.047-174.385,56.047-174.385s-78.774,45.1-130.221,128.822c-7.563,12.3-13.99,24.738-19.668,37.029  c3.467-20.557,5.744-42.617,5.744-65.72C297.417,86.977,249.892,0,249.892,0s-47.506,86.977-47.506,194.259  c0,23.102,2.279,45.163,5.742,65.713c-5.68-12.293-12.123-24.723-19.67-37.023C137.017,139.227,58.238,94.127,58.238,94.127  s4.623,90.662,56.05,174.385c10.329,16.799,21.75,31.969,33.416,45.603C85.472,287.824,22.64,292.045,22.64,292.045  s37.99,47.329,100.418,73.905c23.818,10.137,47.734,15.764,68.231,18.881c-9.681,0.716-19.997,2.132-30.503,4.71  c-45.443,11.111-77.006,38.909-77.006,38.909s42.105,9.768,87.561-1.351c29.467-7.217,52.928-21.347,65.893-30.448l-10.852,86.821  c-0.506,4.125,0.635,8.272,3.157,11.404c2.522,3.125,6.147,4.923,9.974,4.923h20.791c3.826,0,7.451-1.798,9.975-4.923  c2.522-3.132,3.66-7.279,3.156-11.404l-10.852-86.814c12.967,9.103,36.426,23.225,65.875,30.441  c45.457,11.118,87.561,1.351,87.561,1.351s-31.564-27.798-77.002-38.909c-10.512-2.578-20.828-3.994-30.508-4.71  c20.504-3.117,44.42-8.744,68.238-18.881C439.173,339.374,477.16,292.045,477.16,292.045z"
                  />
                </svg>

                <span className="w-[67%] text-center">
                  Start your conversation with{' '}
                  <span className="font-semibold">{name}</span>, your budtender.
                </span>
              </div>
              <SuggestedPrompts
                handleSendPremadeMessage={handleSendPremadeMessage}
              />
            </>
          )}
        </div>
        <form
          className="flex w-full h-9 mt-3 mb-1 border border-zinc-500 dark:text-zinc-400 rounded-lg items-center justify-between px-2"
          onSubmit={handleSubmitMessage}
        >
          <input
            className="w-full bg-transparent h-full border-transparent active:border-none border-2 focus:outline-none focus:border-transparet focus:botder-transparent focus:border-transparen"
            value={input}
            placeholder="Type your message here..."
            onChange={handleInputChange}
          />
          {!isLoading ? (
            <button type="submit">
              <Send className={cn('w-6 h-6')} />
            </button>
          ) : (
            <button onClick={stop}>
              <FaRegStopCircle className={'w-6 h-6 animate-pulse'} />
            </button>
          )}
        </form>
        <div className="text-xs text-center px-2 text-zinc-400 mt-2 mb-1">
          Large Language models (LLMs) can make mistakes. Consider checking
          important information.
        </div>
      </Modal>
    </>
  );
}

export default BudtenderModal;
