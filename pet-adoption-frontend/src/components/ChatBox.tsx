"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import useEcho from "../lib/echo";

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  message: string;
  created_at: string;
}

const ChatBox = ({ user, onClose }: { user: { userId: string; name: string; avatar?: string }, onClose: () => void }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loaded, setLoaded] = useState(false);
  const session = useSession();
  const echo : any = useEcho();

  useEffect(() => {
    if (!loaded) {
      axios.get(`/api/messages/${user.userId}`).then((res) => {
        setMessages(res.data.messages);
        setLoaded(true);
      });
    }

    const channel = echo?.private(`chat.${user.userId}`);
    channel.listen("MessageSent", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      channel.stopListening("MessageSent");
    };
  }, [user.userId, loaded]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    await axios.post("/api/messages/send", {
      sender_id: session.data?.user?.id,
      receiver_id: user.userId,
      message: newMessage,
    });

    setNewMessage("");
  };

  return (
    <div className="w-72 bg-white shadow-lg border rounded fixed bottom-4 right-20 p-3">
      <div className="flex justify-between items-center bg-gray-100 p-2 rounded-t">
        <div className="flex items-center space-x-2">
          {user.avatar && <img src={user.avatar} className="w-8 h-8 rounded-full" />}
          <span className="font-semibold">{user.name}</span>
        </div>
        <button onClick={onClose} className="text-red-500">×</button>
      </div>

      <div className="h-60 overflow-y-auto border-b p-2">
        {messages.length === 0 && !loaded ? (
          <div className="text-gray-400 text-center">Loading messages...</div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`p-2 my-1 rounded ${msg.sender_id !== session.data?.user?.id ? "bg-blue-200 self-end" : "bg-gray-200 self-start"}`}>
              {msg.message}
            </div>
          ))
        )}
      </div>

      <div className="flex items-center mt-2">
        <input type="text" className="flex-grow p-2 border rounded" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
