"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import ChatBox from "./ChatBox";

const ChatList = () => {
  const [openedChats, setOpenedChats] = useState<{ userId: string; name: string; avatar?: string }[]>([]);

  useEffect(() => {
    const savedChats = localStorage.getItem("openedChats");
    if (savedChats) {
      setOpenedChats(JSON.parse(savedChats));
    }
  }, []);

  const openChat = (user: { userId: string; name: string; avatar?: string }) => {
    if (!openedChats.some((chat) => chat.userId === user.userId)) {
      const newOpenedChats = [...openedChats, user];
      setOpenedChats(newOpenedChats);
      localStorage.setItem("openedChats", JSON.stringify(newOpenedChats));
    }
  };

  const closeChat = (userId: string) => {
    const newOpenedChats = openedChats.filter((chat) => chat.userId !== userId);
    setOpenedChats(newOpenedChats);
    localStorage.setItem("openedChats", JSON.stringify(newOpenedChats));
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button className="p-2 bg-gray-800 text-white rounded-full">💬</button>

      {/* Render Opened Chat Boxes */}
      <div className="flex space-x-2">
        {openedChats.map((chat:any) => (
          <ChatBox key={chat.userId} user={chat} onClose={() => closeChat(chat.userId)} />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
