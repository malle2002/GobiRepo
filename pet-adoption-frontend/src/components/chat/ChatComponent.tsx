import { useEffect, useState } from "react";
import axios from "@/src/lib/axios";
import { useSession } from "next-auth/react";
import useEcho from "@/src/lib/echo";
import { useChat } from "@/src/providers/ChatProvider";
import dateFormatter from "@/src/lib/dateFormatter";

interface Message {
    id: string;
    sender_id: string;
    receiver_id: string;
    message: string;
    created_at: string;
    updated_at: string;
}

const ChatComponent = ({ onClose }: { onClose: () => void }) => {
    const [messagePages, setMessagePages] = useState<Record<string, number>>({});
    const [hasMoreMessages, setHasMoreMessages] = useState<Record<string, boolean>>({});
    const { openChat, closeChat, messageInputs, setMessageInputs, activeChat, users, setUsers } = useChat();
    const { data: session } = useSession();
    const currentUserId : string|null = session?.user?.id||null;
    const echo : any = useEcho();

    const [messages, setMessages] = useState<Record<string, Message[]>>({});

    useEffect( () => {
        if (!currentUserId || !echo) return;
 
        const fetchUsers = async () => {
            try {
                const res = await axios.get("/api/chat/users");
                setUsers(res.data);
            } catch (error) {
                console.error("Error fetching chat users:", error);
            }
        };
        
        fetchUsers();

        const channel = echo.private(`chat.${currentUserId}`);
    
        channel.listen(".message.sent", (message: Message) => {
            setMessages((prev) => {
                const chatId = message.sender_id === currentUserId ? message.receiver_id : message.sender_id;
                return {
                    ...prev,
                    [chatId]: [...(prev[chatId] || []), message],
                };
            });
        });
    
        return () => {
            try {
                if (channel) {
                    channel.stopListening(".message.sent");
                    echo.leave(`chat.${currentUserId}`);
                }
            } catch (error) {
                console.error("Error cleaning up Echo channel:", error);
            }
        };
    }, [echo, currentUserId]);
    

    const loadMessages = async (userId: string, name?: string, initialLoad = false) => {
        const page = initialLoad ? 1 : (messagePages[userId] || 1) + 1;
        try {
            openChat(userId, name);
            const res = await axios.get(`/api/chat/messages/${userId}`, {
                params: { page, per_page: initialLoad ? 20 : 10 },
            });
    
            setMessages((prev) => ({
                ...prev,
                [userId]: initialLoad ? res.data.messages : [...res.data.messages, ...(prev[userId] || [])],
            }));
    
            setMessagePages((prev) => ({ ...prev, [userId]: page }));
            setHasMoreMessages((prev) => ({ ...prev, [userId]: res.data.has_more }));
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const handleScroll = (e: React.UIEvent<HTMLDivElement>, userId: string) => {
        if (e.currentTarget.scrollTop === 0 && hasMoreMessages[userId]) {
            loadMessages(userId);
        }
    };

    const sendMessage = async (userId: string) => {
        if (!messageInputs[userId]?.trim()) return;

        const newMessage = {
            sender_id: currentUserId,
            receiver_id: userId,
            message: messageInputs[userId],
        };

        setMessageInputs((prev:Record<string, string>):Record<string, string> => ({ ...prev, [userId]: "" }));

        await axios.post("/api/chat/send", newMessage);
    };

    return (
        <div className="fixed bottom-16 right-4 min-w-[85%] min-h-[30%] sm:min-h-0 sm:min-w-0 sm:w-72 bg-white shadow-lg rounded-lg">
            <div className="p-4 border-b flex justify-between">
                <h2 className="text-lg font-semibold">Chats</h2>
                <button onClick={() => { closeChat(); onClose(); }} className="text-primary">✕</button>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-3 w-full overflow-y-auto">
                <h2 className="text-lg font-semibold mb-2">Users</h2>
                <ul>
                    {users.map((user) => (
                        <li key={user.id} className="flex justify-between p-2 border-b">
                            <span>{user.name}</span>
                            <button 
                                onClick={(e) => { 
                                    loadMessages(user.id, user.name);
                                }} 
                                className="text-blue-500"
                            >
                                Chat
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Chat Box */}
            <div className="flex space-x-4 mt-16 absolute sm:relative w-96 left-full sm:left-0">
                {activeChat && (
                    <div key={activeChat.id} className="w-full bg-white shadow-lg rounded-lg p-3 absolute right-full bottom-0">
                        <div className="flex justify-between border-b pb-2 mb-2">
                            <h2 className="text-lg font-semibold">
                                {activeChat.name || "User"}
                            </h2>
                            <button onClick={() => closeChat()} className="text-red-500">✕</button>
                        </div>

                        <div
                            className="messages-container"
                            onScroll={(e) => handleScroll(e, activeChat.id)}
                        >
                            {messages[activeChat.id]?.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`w-fit ${
                                        msg.sender_id === currentUserId
                                            ? "place-self-end chat-end"
                                            : "chat-start"
                                    }`}
                                >
                                    <div className="chat-bubble bg-outline mx-6">{msg.message}</div>
                                    <div className="chat-footer opacity-50 text-end">{msg.updated_at
                                            ? dateFormatter(msg.updated_at, "datetime")
                                            : dateFormatter(msg.created_at, "datetime")}</div>
                                </div>
                            ))}
                        </div>



                        <div className="flex mt-2 w-auto p-0">
                            <input
                                type="text"
                                className="p-2 border rounded-md w-full"
                                value={messageInputs[activeChat.id] || ""}
                                onChange={(e) => 
                                    setMessageInputs((prev:Record<string,string>):Record<string, string> => ({ ...prev, [activeChat.id]: e.target.value }))
                                }
                                placeholder="Type a message..."
                            />
                            <button
                                className="ml-2 bg-primary hover:bg-accent text-white px-4 rounded-md w-fit text-xs"
                                onClick={() => sendMessage(activeChat.id)}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatComponent;
