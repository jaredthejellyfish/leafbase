'use client';

import { useChat } from 'ai/react';
import type { Message as AIMessage } from 'ai/react';
import { Send, Trash } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { FaRegStopCircle } from 'react-icons/fa';
import { RiMessage2Line } from 'react-icons/ri';
import { useLocalStorage } from 'usehooks-ts';

import Modal from '@c/Modal';

import { cn } from '@l/utils/cn';

import { names } from './data';
import Message from './message';

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
            <div className="w-full h-32 flex items-center justify-center flex-col">
              <svg
                viewBox="0 0 24 24"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                className="size-[90px] my-3 dark:fill-slate-100"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <title>OpenAI icon</title>
                  <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"></path>
                </g>
              </svg>
              <span className="w-[67%] text-center">
                Start your conversation with{' '}
                <span className="font-semibold">{name}</span>,
                your budtender.
              </span>
            </div>
          )}
        </div>
        {/* <SubmitMessageButton /> */}
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
