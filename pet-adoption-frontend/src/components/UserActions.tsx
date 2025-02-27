"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useChat } from "../providers/ChatProvider";

interface PetUser {
  id: string;
  name: string;
  avatar?: string;
}

export default function UserActions({ user }: { user: PetUser }) {
  const router = useRouter();
  const { openChat } = useChat();

  const visitProfile = (id: string) => {
    router.push(`/profile/${id}`);
  };

  return (
    <div className="relative">
      <div
        className="ml-auto text-right self-center cursor-pointer"
        onClick={() => {
          const modal = document.getElementById('user_modal') as HTMLDialogElement | null;
          modal?.showModal();
        }}
      >
        {user.avatar && (
          <Image
            src={user.avatar ?? "/default-avatar.png"}
            height={36}
            width={36}
            alt={user.name}
            className="rounded-full self-center w-full scale-75"
          />
        )}
        <p className="text-gray-600">{user.name}</p>
      </div>
      <dialog id="user_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg text-center mb-5">{user.name}</h3>
          <div className="flex flex-row place-content-center gap-3">
            <button
              className="block bg-primary rounded-lg text-left px-4 py-2 hover:bg-accent"
              onClick={() => visitProfile(user.id)}
            >
              Visit Profile
            </button>
            <button
              className="block bg-primary rounded-lg text-left px-4 py-2 hover:bg-accent"
              onClick={() => openChat(user.id, user.name)}
            >
              Open Chat
            </button>
          </div>
          
        </div>
      </dialog>
    </div>
  );
}
