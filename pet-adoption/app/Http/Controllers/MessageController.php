<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    public function getUsers()
    {
        $userId = Auth::id();
        return User::whereHas('messagesReceived', function ($query) use ($userId) {
            $query->where('sender_id', $userId);
        })->orWhereHas('messagesSent', function ($query) use ($userId) {
            $query->where('receiver_id', $userId);
        })->get(['id', 'name']);
    }

    public function getMessages(Request $request, string $otherUserId)
    {
        $currentUserId = auth('sanctum')->id();
        $perPage = $request->query('per_page', 10);
        $page = $request->query('page', 1);

        $messages = Message::where(function ($query) use ($currentUserId, $otherUserId) {
            $query->where('sender_id', $currentUserId)
                ->where('receiver_id', $otherUserId);
        })->orWhere(function ($query) use ($currentUserId, $otherUserId) {
            $query->where('sender_id', $otherUserId)
                ->where('receiver_id', $currentUserId);
        })->orderBy('created_at')
            ->paginate($perPage, ['*'], 'page', $page);

        return response()->json([
            'messages' => $messages->items(),
            'has_more' => $messages->hasMorePages()
        ]);
    }

    public function sendMessage(Request $request)
    {
        $request->validate([
            'sender_id' => 'required|exists:users,id',
            'receiver_id' => 'required|exists:users,id',
            'message' => 'required|string',
        ]);

        if(!($request->sender_id === auth('sanctum')->id())) {
            return response()->json("Invalid message sent");
        }

        $message = Message::create([
            'sender_id' => $request->sender_id,
            'receiver_id' => $request->receiver_id,
            'message' => $request->message,
        ]);

        broadcast(new MessageSent($message))->toOthers();

        return response()->json($message);
    }
}
