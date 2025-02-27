"use client";

import Image from "next/image";
import usePetProfile from "@/src/hooks/pets/usePetProfile";
import Gallery from "@/src/components/Gallery";
import ImageCarousel from "@/src/components/ImageCarousel";

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
      <div className="flex flex-col">
        <ImageCarousel petName={pet.name} images={pet.images} />
        <div className="flex flex-row">
            <div className="md:w-1/2 md:ml-8 flex flex-row justify-between card shadow-lg p-5 bg-secondary bg-opacity-50 mt-5">
              <div>
                <p className="text-lg font-semibold">Species: {pet.species}</p>
                <p className="text-lg font-semibold">Breed: {pet.breed}</p>
                <p className="text-lg font-semibold">Age: {pet.age}</p>
                <p className="text-lg font-semibold">Gender: {pet.gender}</p>
                <p className="mt-4 text-gray-600">{pet.description || "No description available."}</p>
              </div>
              <div className="flex flex-row justify-between">
                <div className="md:w-fit p-6 md:ml-8 card shadow-lg bg-green-300 mt-5">
                  <div>
                    <h1>Vaccinations:</h1>
                    {pet?.vaccinations?.split(',').map((v, index) => (
                        <p key={index}>{v}</p>
                    ))}
                  </div>
                </div>
                <div className="md:w-fit p-6 md:ml-8 card shadow-lg bg-red-300 mt-5">
                  <div>
                    <h1>Allergies:</h1>
                    {pet?.allergies?.split(',').map((v, index) => (
                        <span key={index}>{v}</span>
                    ))}
                  </div>
                </div>
              </div>
              
            </div>

            <div className="md:w-1/2 md:ml-8 flex flex-col justify-between card shadow-lg p-5 bg-secondary bg-opacity-50 mt-5">
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
                  <div className="ml-5">
                    <p className="font-semibold">Posted By: {pet.users.name}</p>
                    <p className="text-gray-600">{pet.users.email}</p>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
