"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import useSelectedPet from "@/src/hooks/profile/useSelectedPet";
import usePets from "@/src/hooks/profile/usePets";
import Pagination from "@/src/components/Pagination";
import PageLoader from "@/src/components/PageLoader";

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  pets: {
    id: string,
    name: string,
    species: string,
    breed: string,
    age: number,
    description: string,
    gender: string,
    vaccinations: string[],
    allergies: string[],
    location: string,
    images: [],
  }[];
  preferences: {
    species: string;
    breeds: string[];
    age: number;
    gender: string;
  }[];
}

export default function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { selectedPet, setSelectedPet } = useSelectedPet();
  const { pets, setPets, pagination, setPage, loading: loadingPets } = usePets();

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user/${id}`);

        if (!res.ok) throw new Error("User not found");

        const data = await res.json();
        setUser(data);
        setPets(data.pets);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (loadingPets) return (
    <PageLoader/>
  )
  if (!user) return <div className="text-center">User not found</div>;
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="space-y-6">
            {user?.avatar && (<Image
              src={user?.avatar}
              width={40}
              height={40}
              alt={user.name}
              className="w-40 h-40 rounded-full justify-self-center"
            />
            )}
            <h1 className="text-lg font-semibold">Name: {user.name}</h1>
            <h1 className="text-lg font-semibold">Email: {user.email}</h1>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">{user.name}&apos;s Pets</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pets?.length > 0 ? (
          pets.map((pet: any) => (
            <li key={pet.id} className="p-4 shadow-lg rounded-lg bg-white cursor-pointer" onClick={() => setSelectedPet(pet)}>
              <h3 className="text-lg font-semibold">{pet.name}</h3>
              <p className="text-sm text-gray-600">{pet.breed}</p>
            </li>
          ))
        ) : (
          <p>No pets found.</p>
        )}
        </ul>
        <Pagination
          currentPage={pagination.current_page}
          lastPage={pagination.last_page}
          onPageChange={setPage}
        />
      </div>
      {selectedPet && (
        <dialog className={`modal ${selectedPet ? "modal-open" : ""}`} id="petModal">
          <div className="modal-box">
            <button className="btn btn-sm btn-circle fixed right-2 top-2 z-50" onClick={() => setSelectedPet(null)}>✕</button>
            <h2 className="text-xl font-bold">{selectedPet.name}</h2>
            { selectedPet.images[0] && ( <Image src={selectedPet.images[0]} alt={selectedPet.name} width={300} height={200} className="rounded-lg mt-2 w-full" /> )}
            <p><strong>Species:</strong> {selectedPet.species}</p>
            <p><strong>Breed:</strong> {selectedPet.breed}</p>
            <p><strong>Age:</strong> {selectedPet.age} years</p>
            <p><strong>Gender:</strong> {selectedPet.gender}</p>
            {selectedPet.description && <p><strong>Description:</strong> {selectedPet.description}</p>}
            {selectedPet.vaccinations && <p><strong>Vaccinations:</strong> {selectedPet.vaccinations}</p>}
            {selectedPet.allergies && <p><strong>Allergies:</strong> {selectedPet.allergies}</p>}
            <p><strong>Location:</strong> {selectedPet.location}</p>
          </div>
        </dialog>
      
      )}
    </div>
  );
}
