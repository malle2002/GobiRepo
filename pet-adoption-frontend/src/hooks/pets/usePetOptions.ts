import { useEffect, useState } from "react";

export default function usePetOptions () {
    const [speciesOptions, setSpeciesOptions] = useState<string[]>([]);
    const [breedOptions, setBreedOptions] = useState<string[]>([]);
    const [locationOptions, setLocationOptions] = useState<string[]>([]);

    useEffect(() => {
        const fetchOptions = async () => {
          try {
            const res = await fetch("/api/options");
            const data = await res.json();
            setSpeciesOptions(data.species || []);
            setBreedOptions(data.breeds || []);
            setLocationOptions(data.locations || []);
          } catch (error) {
            console.error("Failed to fetch options:", error);
          }
        };
    
        fetchOptions();
    }, []);
    
    return { speciesOptions, setSpeciesOptions, breedOptions, setBreedOptions, locationOptions, setLocationOptions }
}