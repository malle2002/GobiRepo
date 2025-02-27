import { useEffect, useState } from "react";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { useSession } from "next-auth/react";
import axios from "./axios";

const useEcho = () => {
  const [echo, setEcho] = useState(null);
  const session = useSession();
  const token = session?.data?.user?.accessToken;
  
  useEffect(() => {
    if (!token) {
      console.error("No token available, user might not be authenticated.");
      return;
    }
    if (typeof window !== "undefined") {
      window.Pusher = Pusher;
  
      const newEcho = new Echo({
        broadcaster: "reverb",
        key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
        wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
        wsPort: Number(process.env.NEXT_PUBLIC_REVERB_PORT) || 80,
        wssPort: Number(process.env.NEXT_PUBLIC_REVERB_PORT) || 443,
        authorizer: (channel) => {
          return {
              authorize: (socketId, callback) => {
                  axios.post('/api/broadcasting/auth', {
                      socket_id: socketId,
                      channel_name: channel.name
                  }, { headers : { Authorization: `Bearer ${token}`}})
                  .then(response => {
                      callback(false, response.data);
                  })
                  .catch(error => {
                      callback(true, error);
                  });
              }
          };
        },
        forceTLS: (process.env.NEXT_PUBLIC_REVERB_SCHEME ?? "https") === "https",
        enabledTransports: ["ws", "wss"],
      });
  
      setEcho(newEcho);
  
      return () => {
        newEcho.disconnect();
      };
    }
  }, []);
  

  return echo;
};

export default useEcho;
