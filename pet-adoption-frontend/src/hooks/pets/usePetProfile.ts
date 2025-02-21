import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Params } from "next/dist/server/request/params";

export default function usePetProfile() {
    const [pet, setPet] = useState<PetFormData | null>(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams<Params>();

    useEffect( () => {
        if (!id) return;

        const fetchPet = async () => {
            try {
                const res = await fetch(`/api/pets/${id}`);
                const data = await res.json();
                if (res.ok) {
                    setPet(data);
                } else {
                    throw new Error(data.error || "Failed to fetch pet details");
                }
            } catch (error) {
                console.error("Error fetching pet details:", error);
                setPet(null);
            } finally {
                setLoading(false);
            }
        }
        fetchPet();

        if (pet?.name) {
            document.title = pet.name;
        }
        
    }, [id, pet?.name]);

    return {
        pet,
        setPet,
        loading,
        setLoading,
    };
}
