import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type Message = {
  id: number;
  author: 'user' | 'budtender';
  content: string;
  date?: string;
};

interface BudtenderState {
  name: string;
  messages: Message[];
  setName: (state: string) => void;
  addMessage: (message: Message) => void;
  appendToLastMessage: (chunk: string) => void;
  clearMessages: () => void;
}

const budtenderStore = create(
  persist<BudtenderState>(
    (set) => ({
      name: '',
      messages: [],
      setName: (name: string) => set({ name: name }),
      addMessage: (message: Message) =>
        set((state) => ({ messages: [...state.messages, message] })),
      appendToLastMessage: (chunk: string) =>
        set((state) => {
          const lastMessage = state.messages[state.messages.length - 1];
          const updatedMessages = state.messages.map((message) =>
            message.id === lastMessage?.id
              ? { ...message, content: message.content + chunk }
              : message,
          );

          return { messages: updatedMessages };
        }),
      clearMessages: () => set({ messages: [], name: '' }),
    }),
    {
      name: 'budtender-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);

export default budtenderStore;
