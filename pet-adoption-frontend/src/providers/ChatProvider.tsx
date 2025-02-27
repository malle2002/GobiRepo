"use client";

import { off } from "process";
import { createContext, useContext, useState } from "react";

interface UserChatInfo {
  id: string;
  name: string;
}

interface ChatContextType {
  activeChat: UserChatInfo | null;
  openChat: (userId: string, name?: string, initialMessage?: string) => void;
  closeChat: () => void;
  messageInputs: Record<string, string>;
  setMessageInputs: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  users: UserChatInfo[],
  setUsers: any;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeChat, setActiveChat] = useState<UserChatInfo | null>(null);
  const [messageInputs, setMessageInputs] = useState<Record<string, string>>({});
  const [users, setUsers] = useState<UserChatInfo[]>([]);

  const openChat = (userId: string, name?: string, initialMessage?: string) => {
    if(activeChat) { closeChat()}
    setActiveChat({ id: userId, name: name || "" });

    // setUsers(users.filter((u) => u.id !== userId));

    // if (initialMessage) {
    //   setMessageInputs((prev) => ({ ...prev, [userId]: initialMessage }));
    // }
  };

  const closeChat = () => {
    setUsers((prev) => {
      if (!activeChat) return prev;
      if(users.find((u)=>u.id===activeChat.id)){
        return users;
      }
      return [{ id: activeChat.id, name: activeChat.name } as UserChatInfo, ...prev];
    });
    setActiveChat(null);
  };

  return (
    <ChatContext.Provider value={{ activeChat, openChat, closeChat, messageInputs, setMessageInputs, users, setUsers }}>
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
