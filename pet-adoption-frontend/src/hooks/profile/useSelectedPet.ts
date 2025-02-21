import { useEffect, useState } from "react";

export default function useSelectedPet () {
    const [selectedPet, setSelectedPet] = useState<any | null>(null);

    useEffect(() => {
        const modal = document.getElementById("petModal") as HTMLDialogElement;
        if (selectedPet && modal) {
            modal.showModal();
        } else if (!selectedPet && modal) {
            modal.close();
        }
    }, [selectedPet]);
    return { selectedPet, setSelectedPet };
}