"use client";

import { UUID } from "crypto";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useFindPets() {
  const [pets, setPets] = useState<PetFormData[]>([]);
  const [filters, setFilters] = useState({ species: "", breed: "", age: "", gender: "" });
  const [useFilters, setUseFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
      const fetchPets = async () => {
        try {
          const queryParams = new URLSearchParams();
          if (useFilters) {
            Object.entries(filters).forEach(([key, value]) => {
              if (value) queryParams.append(key, value);
            });
          }
  
          const res = await fetch(`/api/pets?${queryParams.toString()}`);
          const data = await res.json();
  
          if (res.ok) {
            const filteredPets = data.data.filter((pet: any) => {
              if (filters.breed && !pet.breed.toLowerCase().includes(filters.breed.toLowerCase())) {
                return false;
              }
              return true;
            });
  
            setPets(filteredPets.length > 0 ? filteredPets : []);
            setLoading(false);
          } else {
            throw new Error(data.error || "Failed to fetch pets");
          }
        } catch (error) {
          console.error("Error fetching pets:", error);
          setPets([]);
        }
      };
  
      fetchPets();
  }, [filters, useFilters]);

  const handlePetInfoClick = (id:UUID) : void => {
    router.push(`/pets/${id}`);
  }


  return {
    pets,
    setPets,
    filters,
    setFilters,
    useFilters,
    setUseFilters,
    handlePetInfoClick,
    loading,
    setLoading
  };
}
