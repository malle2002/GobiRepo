"use client";

import UserActions from "@/src/components/UserActions";
import useFindPets from "@/src/hooks/pets/useFindPets";
import Image from "next/image";
import { useRouter } from "next/navigation";

const FindAPet = () => {
  const { pets, filters, setFilters, useFilters, setUseFilters, loading } = useFindPets();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-infinity loading-lg size-20"></span>
      </div>
    );
  }

  const handlePetInfoClick = (petId: string) => {
    router.push(`/pets/${petId}`);
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
                  onClick={() => handlePetInfoClick(pet.id)}
                >
                  <h2 className="text-xl font-semibold mt-2">{pet.name}</h2>
                  <p className="text-gray-600">{pet.species} - {pet.breed}</p>
                  <p className="text-gray-500">Age: {pet.age}</p>
                  <p className="text-gray-500">Gender: {pet.gender}</p>
                </div>
                <UserActions user={pet.users} />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3">No pets found.</p>
        )}
      </div>
    </div>
  );
};

export default FindAPet;
