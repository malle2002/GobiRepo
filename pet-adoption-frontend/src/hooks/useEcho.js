import { useEffect, useState } from "react";
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import axios from '@/src/lib/axios';

window.Pusher = Pusher;

const useEcho = () => {
    const [echoInstance, setEchoInstace] = useState<any>(null);

    useEffect(() => {
        const echo = new Echo({
            broadcaster: 'reverb',
            key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
            authorizer: (channel) => {
                return {
                    authorize: (socketId, callback) => {
                        axios.post('/api/broadcasting/auth', {
                            socket_id: socketId,
                            channel_name: channel.name
                        })
                        .then(response => {
                            callback(false, response.data);
                        })
                        .catch(error => {
                            callback(true, error);
                        });
                    }
                };
            },
            wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
            wsPort: Number(process.env.NEXT_PUBLIC_REVERB_PORT) || 80,
            wssPort: Number(process.env.NEXT_PUBLIC_REVERB_PORT) || 443,
            forceTLS: (process.env.NEXT_PUBLIC_REVERB_SCHEME ?? 'https') === 'https',
            enabledTransports: ['ws', 'wss'],
        });

        setEchoInstace(echo);
    }, [setEchoInstace])

    return echoInstance;
}

export default useEcho;