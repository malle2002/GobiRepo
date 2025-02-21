<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class MessageController extends Controller
{
    public function sendMessage(Request $request): Response
    {
        $request->validate([
            'sender_id' => 'required|exists:users,id',
            'receiver_id' => 'required|exists:users,id',
            'message' => 'required|string',
        ]);

        $receiver =  User::find($request->user_id);
        $sender =  User::find($request->from);

        Message::create([
            'sender_id' => $request->sender_id,
            'receiver_id' => $request->receiver_id,
            'message' => $request->message,
        ]);

        broadcast(new MessageSent($receiver, $sender, $request->message));

        return response()->noContent();
    }

    public function getMessages($userId)
    {
        $messageOut = Message::where('receiver_id', $userId)->get();
        $messagesIn = Message::where('sender_id', $userId)->get();

        return response()->json([ "messagesSent" => $messageOut, "messagesReceived" => $messagesIn ]);
    }

    public function getConversations(Request $request)
    {
        $userId = $request->user()->id;

        $conversations = Message::where('sender_id', $userId)
            ->orWhere('receiver_id', $userId)
            ->with(['sender:id,name,avatar', 'receiver:id,name,avatar'])
            ->get()
            ->groupBy(function ($msg) use ($userId) {
                return $msg->sender_id == $userId ? $msg->receiver_id : $msg->sender_id;
            })
            ->map(function ($msgs) {
                $user = $msgs->first()->sender_id == auth('sanctum')->id() ? $msgs->first()->receiver : $msgs->first()->sender;
                return [
                    'userId' => $user->id,
                    'name' => $user->name,
                    'avatar' => $user->avatar,
                ];
            })
            ->values();

        return response()->json($conversations);
    }
}
