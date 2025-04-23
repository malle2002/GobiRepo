"use client";

import Image from "next/image";
import usePetProfile from "@/src/hooks/pets/usePetProfile";
import ImageCarousel from "@/src/components/image-related/ImageCarousel";
import { InfoIcon, ShieldPlus, ShieldX } from "lucide-react";

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
            <div className="md:w-1/2 md:ml-8 flex flex-row justify-between card shadow-lg p-5 bg-transparent bg-opacity-50 mt-5">
              <div className="space-y-2">
                <p className="text-lg font-semibold">Species: {pet.species}</p>
                <p className="text-lg font-semibold">Breed: {pet.breed}</p>
                <p className="text-lg font-semibold">Age: {pet.age}</p>
                <p className="text-lg font-semibold">Gender: {pet.gender}</p>
                <p className="mt-4 text-gray-600">{pet.description || "No description available."}</p>
              </div>
              <div className="flex flex-row justify-between">
                <div className="md:w-fit p-6 md:ml-8 card shadow-lg border border-green-300 mt-5">
                  <div className="flex flex-row place-items-center h-full space-x-3">
                    <h1 data-popover-target="popover-vaccinations"><ShieldPlus /></h1>
                    <div>
                      {pet && pet.vaccinations ? pet?.vaccinations?.split(',').map((v, index) => (
                          <p key={index}>{v}</p>
                      )) : ( <p>None?</p> ) }
                    </div>
                  </div>
                </div>
                <div className="md:w-fit p-6 md:ml-8 card shadow-lg border border-red-300 mt-5">
                  <div className="flex flex-row place-items-center h-full space-x-3">
                    <h1 data-popover-target="popover-allergies"><ShieldX /></h1>
                    <div>
                      {pet && pet.allergies ? pet?.allergies?.split(',').map((v, index) => (
                          <span key={index}>{v}</span>
                      )) : ( <p>None?</p> ) }
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 md:ml-8 flex flex-col justify-between card shadow-lg p-5 bg-transparent bg-opacity-50 mt-5">
              <div className="mt-6 flex flex-row h-full place-items-center space-x-4">
                <div>
                  <h2 data-popover-target="popover-info" className="text-2xl font-bold mb-2"><InfoIcon /></h2>
                </div>
                <div className="flex items-center">
                  {pet.user.avatar && (
                    <Image
                      src={pet.user.avatar}
                      alt={pet.user.name}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  )}
                  <div className="ml-5">
                    <p className="font-semibold">Posted By: {pet.user.name}</p>
                    <p className="text-gray-600">{pet.user.email}</p>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
      <div data-popover id="popover-vaccinations" role="tooltip" className="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-xs opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
        <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">Popover title</h3>
        </div>
        <div className="px-3 py-2">
            <p>And here's some amazing content. It's very engaging. Right?</p>
        </div>
        <div data-popper-arrow></div>
      </div>
      <div data-popover id="popover-allergies" role="tooltip" className="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-xs opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
        <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">Popover title</h3>
        </div>
        <div className="px-3 py-2">
            <p>And here's some amazing content. It's very engaging. Right?</p>
        </div>
        <div data-popper-arrow></div>
      </div>
      <div data-popover id="popover-info" role="tooltip" className="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-xs opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
        <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">Popover title</h3>
        </div>
        <div className="px-3 py-2">
            <p>And here's some amazing content. It's very engaging. Right?</p>
        </div>
        <div data-popper-arrow></div>
      </div>
    </div>
  );
};

export default PetDetails;
