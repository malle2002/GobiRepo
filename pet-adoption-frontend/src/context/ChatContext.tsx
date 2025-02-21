import React, { createContext, useState, useContext, useCallback } from "react";
import axios from "axios";

// Define a type for the messages and active chat
interface Chat {
  userId: string;
  messages: string[];
}

interface ChatContextType {
  openChat: (userId: string) => void;
  closeChat: (userId: string) => void;
  activeChat: string | null;
  chats: { [userId: string]: Chat };
  loadMessages: (userId: string) => void;
}

export const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chats, setChats] = useState<{ [userId: string]: Chat }>({});
  const [activeChat, setActiveChat] = useState<string | null>(null);

  const loadMessages = useCallback(async (userId: string) => {
    if (!chats[userId]) {
      const response = await axios.get(`/api/messages/${userId}`);
      const newMessages = response.data.messages; 

      setChats((prevChats) => ({
        ...prevChats,
        [userId]: { userId, messages: newMessages },
      }));
    }
  }, [chats]);

  const openChat = (userId: string) => {
    setActiveChat(userId);
    loadMessages(userId);
  };

  const closeChat = (userId: string) => {
    setActiveChat(null);
  };

  return (
    <ChatContext.Provider value={{ openChat, closeChat, activeChat, chats, loadMessages }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
