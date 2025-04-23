"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import useFindPets from "@/src/hooks/pets/useFindPets";
import Image from "next/image";
import Skeleton from "@/src/components/Skeleton";
import FilterPets from "@/src/components/pets/FilterPets";
import dateFormatter from "@/src/lib/dateFormatter";

const PetList = () => {
  const { 
    pets, 
    useFilters, setUserFilters, 
    lastPetRef, 
    handleBreedSelect, handleSelect, handlePetInfoClick, isNavigating, 
    filters 
  } = useFindPets();
  return (
    <div className="mx-auto p-6 max-w-7xl space-y-8">
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        {/* Filters */}
        <FilterPets 
          handleSelect={handleSelect}
          filters={filters} 
          handleBreedSelect={handleBreedSelect} 
          useFilters={useFilters}
          setUserFilters={setUserFilters}
        />

        {/* Pet List */}
        <div className="w-full sm:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {pets.length > 0 ? (
            pets.map((pet, index) => (
              <div 
                key={pet.id} ref={index === pets.length - 1 ? lastPetRef : null}
                className="card card-bordered p-4 rounded-lg hover:bg-secondary hover:bg-opacity-45 hover:cursor-pointer"
                onClick={() => handlePetInfoClick(pet.id)}
              >
                <div className="flex flex-col mb-3">
                  <p className="text-xl text-accent text-opacity-60">{pet.breed}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <p>Name: {pet.name}</p>
                    <p>Age:{pet.age}</p>
                  </div>
                  <div className="flex flex-col">
                    <p>Gender: {pet.gender}</p>
                    <p>Location: {pet.location}</p>
                  </div>
                </div>  
                {pet.images[0] ? (
                  <Image src={pet.images[0]} alt={pet.name} width={300} height={200} className="rounded-lg w-full object-cover" />
                ) : (
                  <Skeleton width="100%" height="200px" />
                )}
                <p className="text-end my-1">{dateFormatter(pet.created_at, "datetime")}</p>
                {/* <div className="p-3 flex flex-row justify-between">
                  <div >
                    <h2 className="text-xl font-semibold cursor-pointer">{pet.name}</h2>
                    <p className="text-gray-600">{pet.species} - {pet.breed}</p>
                    <p className="text-gray-500">Age: {pet.age}</p>
                    <p className="text-gray-500">Gender: {pet.gender}</p>
                  </div>
                  <div className="mt-3">
                    <UserActions user={pet.users} />
                  </div>
                </div> */}
              </div>
            ))
          ) : (
            <p className="text-center col-span-3">No pets found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const FindAPet = () => {
  return (
    <ErrorBoundary fallback={<p className="text-center text-red-500">Something went wrong! Please try again later.</p>}>
      <Suspense fallback={<SkeletonLoader />}>
        <PetList />
      </Suspense>
    </ErrorBoundary>
  );
};

const SkeletonLoader = () => {
  return (
    <div className="w-full sm:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="card card-bordered p-4 shadow-lg rounded-lg">
          <Skeleton width="100%" height="200px" />
          <div className="p-3">
            <Skeleton width="80%" height="20px" />
            <Skeleton width="60%" height="18px" className="mt-2" />
            <Skeleton width="40%" height="18px" className="mt-2" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FindAPet;