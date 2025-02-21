"use client";

import useFindPets from "@/src/hooks/pets/useFindPets";
import Image from "next/image";
import { useChat } from "@/src/context/ChatContext";

const FindAPet = () => {
  const { pets, filters, setFilters, useFilters, setUseFilters, loading } = useFindPets();
  const { openChat, activeChat, chats } = useChat();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-infinity loading-lg size-20"></span>
      </div>
    );
  }

  const handlePetInfoClick = (petId: string, userId: string) => {
    openChat(userId);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Find a Pet</h1>

      {/* Filters */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6 w-fit">
        {/* Filter inputs */}
        <input
          type="text"
          placeholder="Species"
          value={filters.species}
          onChange={(e) => setFilters({ ...filters, species: e.target.value })}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          placeholder="Breed"
          value={filters.breed}
          onChange={(e) => setFilters({ ...filters, breed: e.target.value })}
          className="input input-bordered w-full"
        />
        <input
          type="number"
          placeholder="Max Age"
          min={0}
          value={filters.age}
          onChange={(e) => setFilters({ ...filters, age: e.target.value })}
          className="input input-bordered w-full"
        />
        <select
          value={filters.gender}
          onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
          className="select select-bordered w-full"
        >
          <option value="">Any Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <button
          onClick={() => setUseFilters((prev) => !prev)}
          className="btn btn-primary w-full mb-6"
        >
          {useFilters ? "Show All Pets" : "Apply Filters"}
        </button>
      </div>

      {/* Pets List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.length > 0 ? (
          pets.map((pet: any) => (
            <div key={pet.id} className="card card-bordered p-4 shadow-lg">
              { pet?.images[0] && (
                <Image
                  src={pet?.images[0]??null}
                  alt={pet.name}
                  width={200}
                  height={200}
                  className="rounded-lg self-center size-full"
                />
              )}
              <div className="flex justify-between my-5 mt-auto">
                <div
                  className="cursor-pointer"
                  onClick={() => handlePetInfoClick(pet.id, pet.users.id)}
                >
                  <h2 className="text-xl font-semibold mt-2">{pet.name}</h2>
                  <p className="text-gray-600">{pet.species} - {pet.breed}</p>
                  <p className="text-gray-500">Age: {pet.age}</p>
                  <p className="text-gray-500">Gender: {pet.gender}</p>
                </div>
                <div className="ml-auto text-right self-center">
                  {pet.users.avatar && (
                    <Image
                      src={pet.users.avatar??null}
                      height={36}
                      width={36}
                      alt={pet.users.name}
                      className="rounded-full self-center w-full scale-75"
                    />
                  )}
                  <p className="text-gray-600">{pet.users.name}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3">No pets found.</p>
        )}
      </div>

      {/* Active chat component */}
      {activeChat && (
        <div className="chat-box">
          {/* Display messages for the active chat */}
          <div className="messages">
            {chats[activeChat]?.messages.map((message, idx) => (
              <div key={idx} className="message">
                <p>{message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FindAPet;
