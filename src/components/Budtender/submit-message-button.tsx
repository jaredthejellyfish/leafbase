'use client';

import { Send } from 'lucide-react';
import React, { useState } from 'react';

import { cn } from '@u/cn';

import budtenderStore from '@l/store/budtender';

function createSystemMessage(name: string) {
  return {
    role: 'system',
    content: `Your name is ${name}, you work at Leafbase, the most comprehensive database of strains on the web. You are tasked with helping users resolve any question they may have related to cannabis, its safe consumption, and its effects. You are very knowledgeable about pretty much anything related to cannabis. You will not refuse to answer any questions unless you believe the answer would cause direct harm to the user.`,
  };
}

function SubmitMessageButton() {
  const { appendToLastMessage, addMessage, messages, name } = budtenderStore();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const lastUserMessage = messages[messages.length - 1]?.id ?? 0;

  async function streamedCompletion() {
    setLoading(true);

    try {
      const cleanMessages = messages.map((message) => {
        return {
          role: message.author === 'user' ? 'user' : 'assistant',
          content: message.content,
        };
      });

      const response = await fetch('/api/generate/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            createSystemMessage(name),
            ...cleanMessages,
            { role: 'user', content: message },
          ],
        }),
      });

      if (!response.ok || !response.body) {
        throw response.statusText;
      }

      console.log('response', response);

      addMessage({
        id: lastUserMessage + 1,
        author: 'user',
        content: message,
        date: new Date().toISOString(),
      });
      setMessage('');

      addMessage({
        id: lastUserMessage + 2,
        author: 'budtender',
        content: '',
        date: new Date().toISOString(),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      const loopRunner = true;

      while (loopRunner) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        const decodedChunk = decoder.decode(value, { stream: true });
        appendToLastMessage(decodedChunk.replace('"', ''));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const sendMessage = async () => {
    if (loading) {
      return;
    }

    await streamedCompletion();
  };

  return (
    <div className="flex w-full h-9 mt-3 mb-1 border border-zinc-500 text-zinc-400 rounded-lg items-center justify-between px-2">
      <input
        className="w-full bg-transparent h-full border-transparent active:border-none border-2 focus:outline-none focus:border-transparet focus:botder-transparent focus:border-transparen"
        value={message}
        placeholder="Type your message here..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>
        <Send className={cn('w-6 h-6', loading && 'animate-pulse disabled')} />
      </button>
    </div>
  );
}

export default SubmitMessageButton;
