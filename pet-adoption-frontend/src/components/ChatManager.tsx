"use client";
import { useEffect, useState } from "react";
import ChatBox from "./ChatBox";

interface ChatUser {
  userId: string;
  name: string;
  avatar?: string;
}

const ChatManager = () => {
  const [openedChats, setOpenedChats] = useState<ChatUser[]>([]);

  useEffect(() => {
    const savedChats = localStorage.getItem("openedChats");
    if (savedChats) {
      setOpenedChats(JSON.parse(savedChats));
    }
  }, []);

  const openChat = (user: ChatUser) => {
    if (!openedChats.some((chat) => chat.userId === user.userId)) {
      const newChats = [...openedChats, user];
      setOpenedChats(newChats);
      localStorage.setItem("openedChats", JSON.stringify(newChats));
    }
  };

  const closeChat = (userId: string) => {
    const updatedChats = openedChats.filter((chat) => chat.userId !== userId);
    setOpenedChats(updatedChats);
    localStorage.setItem("openedChats", JSON.stringify(updatedChats));
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col space-y-2">
      {/* Opened Chat Boxes */}
      <div className="flex space-x-2">
        {openedChats.map((chat) => (
          <ChatBox key={chat.userId} user={chat} onClose={() => closeChat(chat.userId)} />
        ))}
      </div>
    </div>
  );
};

export default ChatManager;
