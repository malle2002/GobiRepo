import { useEffect } from "react";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

// Initialize Echo in the client side only
const useEcho = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.Pusher = Pusher;

      const echo = new Echo({
        broadcaster: "reverb",
        key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
        wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
        wsPort: process.env.NEXT_PUBLIC_REVERB_PORT ?? 80,
        wssPort: process.env.NEXT_PUBLIC_REVERB_PORT ?? 443,
        forceTLS: (process.env.NEXT_PUBLIC_REVERB_SCHEME ?? "https") === "https",
        enabledTransports: ["ws", "wss"],
      });

      return echo;
    }
  }, []);

  return null; // This will be handled by the component.
};

export default useEcho;
