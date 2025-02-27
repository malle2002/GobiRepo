import axios from "@/src/lib/axios";
import { useState, useEffect } from "react";
import { useAuth } from "../auth/useAuth";
import usePets from "./usePets";

const useProfile = () => {
    const [user, setUser] = useState<{ name: string; email: string; image: string; speciesPreferences: SpeciesPreference[] } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<{ name: string, email: string, speciesPreferences: SpeciesPreference[] }>({ name:"", email:"", speciesPreferences: [] });
    const [speciesOptions, setSpeciesOptions] = useState<{ value: string; label: string }[]>([]);
    const [speciesMap, setSpeciesMap] = useState<Record<string, string[]>>({});
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const { isLoggedInFromGoogle, token } = useAuth();
    const isEmailEditable = !isLoggedInFromGoogle;


    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        const fetchUserData = async () => {
            try {
            await axios.get("/sanctum/csrf-cookie").then(async () => {
                const res = await axios.get("/api/user");
        
                if (res.status !== 200) throw new Error("Failed to fetch user data");
        
                const mappedPreferences = res.data.preferences?.map((pref: SpeciesPreference) => ({
                    species: pref.species,
                    breeds: pref.breeds?.map((breed) => ({
                        value: typeof breed === "string" ? breed : breed.value,
                        label: typeof breed === "string" ? breed : breed.label
                    })) || [],          
                        age: pref.age || 0,
                        gender: pref.gender || "Any",
                })) || [];
        
                setUser({
                    name: res.data.name,
                    email: res.data.email,
                    image: res.data.avatar,
                    speciesPreferences: mappedPreferences,
                });
        
                setFormData({ 
                    name: res.data.name,
                    email: res.data.email,
                    speciesPreferences: mappedPreferences 
                });
        
                setSpeciesOptions(prevSpeciesOptions =>
                    prevSpeciesOptions.filter(option =>
                        !mappedPreferences.some((pref: SpeciesPreference) => pref.species === option.value)
                    )
                );
            });
            } catch (err: unknown) {
                if(err instanceof Error) {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };
        
        const fetchSpecies = async () => {
            try {
            const res = await axios.get("/api/species");
            setSpeciesMap(res.data);
            setSpeciesOptions(Object.keys(res.data).map(species => ({ value: species, label: species })));
            } catch (err: unknown) {
            if(err instanceof Error) {
                setError("Failed to fetch species data " + err);
            }
            }
        };

        fetchUserData();
        fetchSpecies();
    }, [token]);

    const handleSpeciesChange = (selected: { value: string; label: string } | null) => {
        if (formData.speciesPreferences.some(pref => pref.species === selected?.value)) {
            return;
        }

        if(!selected) {
            return;
        }
        
        setFormData(prev => ({
            ...prev,
            speciesPreferences: [
            ...prev.speciesPreferences,
            { species: selected?.value, breeds: [], age: 0, gender: "Any" },
            ],
        }));
        
        setSpeciesOptions(prev =>
            prev.filter(option => option.value !== selected.value)
        );
    };
        

    const handleSpeciesPreferenceChange = (index: number, field: keyof SpeciesPreference, value: string | number ) => {
        setFormData(prev => {
            const newPreferences = [...prev.speciesPreferences];
            newPreferences[index] = { ...newPreferences[index], [field]: value };
            return { ...prev, speciesPreferences: newPreferences };
        });
    }; 

    const handleDeleteSpecies = (index: number) => {
        setFormData(prev => {
            const newPreferences = [...prev.speciesPreferences];
            const deletedSpecies = newPreferences[index].species;
            newPreferences.splice(index, 1);
        
            setSpeciesOptions(prev => {
                if (!prev.some(option => option.value === deletedSpecies) && speciesMap[deletedSpecies]) {
                    return [...prev, { value: deletedSpecies, label: deletedSpecies }];
                }
                return prev;
            });
            return { ...prev, speciesPreferences: newPreferences };
        });
        setOpenIndex(null);
    };
        
    const handleSave = async () => {
        try {
            const formattedData = {
                speciesPreferences: formData.speciesPreferences.map(pref => ({
                    species: pref.species,
                    breeds: pref.breeds.map(b => b.value),
                    age: pref.age,
                    gender: pref.gender,
                })),
            };
        
            const res = await axios.put("/api/user/update", formattedData);
        
            if (res.status !== 200) throw new Error("Failed to update profile");
            setUser(prevUser =>
            prevUser
                ? {
                    ...prevUser,
                    speciesPreferences: formattedData.speciesPreferences.map(pref => ({
                    ...pref,
                    breeds: pref.breeds.map(breed => ({ value: breed, label: breed })),
                    })),
                }
                : null
            );
            
            setIsEditing(false);
        } catch (err: unknown) {
            if(err instanceof Error) {
                setError(err.message);
            }
        }
    };
        
    const togglePreference = (index: number) => {
        setOpenIndex(prevIndex => (prevIndex === index ? null : index));
    };

    return { 
        isEditing, setIsEditing, isEmailEditable, 
        user, setUser, 
        loading, setLoading, 
        error, setError, 
        formData, setFormData, 
        speciesOptions, setSpeciesOptions, 
        speciesMap, setSpeciesMap,
        openIndex, setOpenIndex,
        handleSpeciesChange, handleDeleteSpecies, handleSave, handleSpeciesPreferenceChange, togglePreference
    };
};

export default useProfile;
