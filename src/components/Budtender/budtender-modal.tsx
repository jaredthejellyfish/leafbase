'use client';

import { Trash } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { RiMessage2Line } from 'react-icons/ri';

import Modal from '@c/Modal';

import budtenderStore from '@l/store/budtender';
import { cn } from '@l/utils/cn';

import { names } from './data';
import Message from './message';
import SubmitMessageButton from './submit-message-button';

function BudtenderModal({ userName }: { userName: string }) {
  const { name, setName, messages, clearMessages } = budtenderStore();
  const [open, setOpen] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!name) {
      const newName =
        names[Math.floor(Math.random() * names.length)] ?? 'Budtender';
      setName(newName);
    }
  }, [name, setName]);

  // This useEffect was originally intended for loading, but let's adjust it for messages changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]); // Listen for changes in messages

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'fixed bottom-5 right-5 w-12 p-2.5 rounded-full h-12 bg-zinc-700 border-zinc-800 border-2 opacity-100 transition-all scale-100 z-50 flex items-center justify-center',
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
          className="flex w-full flex-col md:max-h-[650px] max-h-[75vh] overflow-scroll gap-y-3 relative"
          ref={chatContainerRef}
        >
          {messages.length ? (
            <button
              onClick={clearMessages}
              className="fixed p-2 hover:bg-red-500 bg-zinc-900/80 rounded-full border border-zinc-700 transition-colors"
            >
              <Trash className='size-5' />
            </button>
          ) : null}
          {messages.length ? (
            messages.map((message) => (
              <Message
                key={message.id}
                name={message.author === 'user' ? userName : name}
                {...message}
              />
            ))
          ) : (
            <div className="w-full h-32 flex items-center justify-center">
              <span className="w-[67%] text-center">
                Start your conversation with{' '}
                <span className="font-semibold">{name.split(' ')[0]}</span>,
                your budtender.
              </span>
            </div>
          )}
        </div>
        <SubmitMessageButton />
        <div className="text-xs text-center px-2 text-zinc-400 mt-2 mb-1">
          Large Language models (LLMs) can make mistakes. Consider checking
          important information.
        </div>
      </Modal>
    </>
  );
}

export default BudtenderModal;
