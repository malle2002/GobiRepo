"use client";

import Image from "next/image";
import usePetProfile from "@/src/hooks/pets/usePetProfile";

const PetDetails = () => {
  const { pet, loading } = usePetProfile();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-infinity loading-lg size-20"></span>
      </div>
    );
  }

  if (!pet) {
    return <div>Pet not found.</div>;
  }

  return (
    <div className="container place-self-center p-4">
      <h1 className="text-3xl font-bold mb-4">{pet.name}</h1>

      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3">
          <Image
            src={pet.images?.[0] || "/placeholder.jpg"}
            alt={pet.name}
            width={300}
            height={300}
            className="rounded-lg shadow-lg w-full"
          />
        </div>

        <div className="md:w-2/3 md:ml-8 flex flex-col justify-between">
          <div>
            <p className="text-lg font-semibold">Species: {pet.species}</p>
            <p className="text-lg font-semibold">Breed: {pet.breed}</p>
            <p className="text-lg font-semibold">Age: {pet.age}</p>
            <p className="text-lg font-semibold">Gender: {pet.gender}</p>
            <p className="mt-4 text-gray-600">{pet.description || "No description available."}</p>
          </div>
          
          
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
            <div className="flex items-center">
              {pet.users.avatar && (
                <Image
                  src={pet.users.avatar}
                  alt={pet.users.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              )}
              <div className="ml-3">
                <p className="font-semibold">{pet.users.name}</p>
                <p className="text-gray-600">{pet.users.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
