"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MultiValue } from "react-select";


export default function useFindPets() {
  const [pets, setPets] = useState<PetData[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterType>({ species: "", breeds: [], age: 0, gender: "", location: "" });
  const [useFilters, setUserFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();
  const observer = useRef<IntersectionObserver | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const fetchPets = async (reset = false) => {
    if (!hasMore && !reset) return;
  
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: reset ? "1" : page.toString(),
        limit: "6",
      });
  
      if (useFilters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (["breeds", "species"].includes(key) && Array.isArray(value)) {
            queryParams.append(key, (value as string[]).join(","));
          } else if (typeof value === "string" && value) {
            queryParams.append(key, value);
          }
        });
      }
  
      const res = await fetch(`/api/pets?${queryParams.toString()}`);
      const data = await res.json();

      if (res.ok) {
        setPets((prevPets) => (reset ? data.data : [...prevPets, ...data.data]));
        setLocations(data.locations);
        setHasMore(data.hasMore);
        setPage(reset ? 2 : page + 1);
      } else {
        throw new Error(data.error || "Failed to fetch pets");
      }
    } catch (error) {
      console.error("Error fetching pets:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets(true);
  }, [filters, useFilters]);  

  const handlePetInfoClick = (id: string): void => {
    setIsNavigating(true);
    router.push(`/pets/${id}`);
  };

  const lastPetRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchPets();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, fetchPets]
  );
  
  const handleSelect = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  // const handleSpeciesSelect = (selectedOptions: MultiValue<any>) => {
  //   const selectedSpecies = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
  
  //   setFilters((prev) => ({
  //     ...prev,
  //     species: selectedSpecies,
  //   }));
  // };
  
  const handleBreedSelect = (selectedOptions: MultiValue<any>) => {
    const selectedBreeds = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
    setFilters((prev) => ({
      ...prev,
      breeds: selectedBreeds,
    }));
  };

  const handleRemoveBreed = (breed: string) => {
    setFilters({ ...filters, breeds: filters.breeds.filter((b) => b !== breed) });
  };

  return {
    pets,
    setPets,
    filters,
    setFilters,
    useFilters,
    setUserFilters,
    locations,
    handlePetInfoClick,
    isNavigating,
    loading,
    fetchPets,
    hasMore,
    lastPetRef,
    handleSelect,
    handleBreedSelect,
    // handleSpeciesSelect,
    handleRemoveBreed
  };
}
