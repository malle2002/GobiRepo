"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useSession } from "next-auth/react";
import Select from "react-select";

interface BreedOption {
  value: string;
  label: string;
}

interface SpeciesPreference {
  species: string;
  breeds: BreedOption[];
  age: number;
  gender: "Male" | "Female" | "Any";
}

const Profile = () => {
  const [user, setUser] = useState<{ name: string; email: string; image: string; speciesPreferences: SpeciesPreference[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<{ name: string, email: string, speciesPreferences: SpeciesPreference[] }>({ name:"", email:"", speciesPreferences: [] });
  const [speciesOptions, setSpeciesOptions] = useState<{ value: string; label: string }[]>([]);
  const [speciesMap, setSpeciesMap] = useState<Record<string, string[]>>({});
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const { data: session }: any = useSession();
  const token = session?.user?.accessToken;
  const isEmailEditable = session?.user?.provider === "credentials";

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        await axios.get("/sanctum/csrf-cookie").then(async () => {
          const res = await axios.get("/api/user", {
            headers: { Authorization: `Bearer ${token}` },
          });
    
          if (res.status !== 200) throw new Error("Failed to fetch user data");
    
          const mappedPreferences = res.data.preferences?.map((pref: any) => ({
            species: pref.species,
            breeds: pref.breeds?.map((breed: string) => ({ value: breed, label: breed })) || [],
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
              !mappedPreferences.some((pref:any) => pref.species === option.value)
            )
          );
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    

    const fetchSpecies = async () => {
      try {
        const res = await axios.get("/api/species");
        setSpeciesMap(res.data);
        setSpeciesOptions(Object.keys(res.data).map(species => ({ value: species, label: species })));
      } catch (err: any) {
        setError("Failed to fetch species data");
      }
    };

    fetchUserData();
    fetchSpecies();
  }, [token]);

  const handleSpeciesChange = (selected: { value: string; label: string }) => {
    if (formData.speciesPreferences.some(pref => pref.species === selected.value)) {
      return;
    }
  
    setFormData(prev => ({
      ...prev,
      speciesPreferences: [
        ...prev.speciesPreferences,
        { species: selected.value, breeds: [], age: 0, gender: "Any" },
      ],
    }));
  
    // Ensure the species is removed from speciesOptions when added to preferences
    setSpeciesOptions(prev =>
      prev.filter(option => option.value !== selected.value)
    );
  };
  

  const handleSpeciesPreferenceChange = (index: number, field: keyof SpeciesPreference, value: any) => {
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
  
      // Updating speciesOptions correctly
      setSpeciesOptions(prev => {
        // Ensure the deleted species is added back to speciesOptions if it exists in speciesMap
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
  
      const res = await axios.put("/api/user/update", formattedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
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
    } catch (err: any) {
      setError(err.response?.data || err.message);
    }
  };
  

  const togglePreference = (index: number) => {
    setOpenIndex(prevIndex => (prevIndex === index ? null : index));
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          {user?.image && <img src={user.image} alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4" />}
          <div>
            <label>Name:</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                className="input input-bordered w-full"
              />
            ) : (
              <p>{user?.name}</p>
            )}
          </div>
          <div>
            <label>Email:</label>
            {isEditing && isEmailEditable ? (
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="input input-bordered w-full"
              />
            ) : (
              <p>{user?.email}</p>
            )}
          </div>
          {user && !isEditing && user?.speciesPreferences.length > 0 && (
            <div className="mt-5">
              <h3 className="text-lg font-semibold">Species Preferences:</h3>
              {user?.speciesPreferences.map((pref, index) => (
                <div key={index} className="p-3 my-2 border rounded-lg bg-gray-100">
                  <p className="font-bold">{pref.species}</p>
                  <p><strong>Breeds:</strong> {pref.breeds.map(b => b.label).join(", ") || "Any"}</p>
                  <p><strong>Max Age:</strong> {pref.age}</p>
                  <p><strong>Gender:</strong> {pref.gender}</p>
                </div>
              ))}
            </div>
          )}
          {isEditing ? (
            <>
              <label>Add a Species</label>
              <Select 
                options={speciesOptions.filter(option => 
                  !formData.speciesPreferences.some(pref => pref.species === option.value)
                )} 
                onChange={(selected: any) => { handleSpeciesChange(selected)} } 
                hideSelectedOptions
              />
              {formData.speciesPreferences.map((pref, index) => (
                <div 
                  key={index} 
                  className={`preference-container my-2 p-3 rounded-lg cursor-pointer transition-all ${
                    openIndex === index ? "bg-white shadow-lg" : "bg-gray-200"
                  }`}
                >
                  <p 
                    className="text-lg font-semibold cursor-pointer"
                    onClick={() => togglePreference(index)}
                  >
                    {pref.species}
                  </p>

                  {openIndex === index && (
                    <div className="mt-3">
                      <label>Breeds (empty for all)</label>
                      <Select
                        options={speciesMap[pref.species]?.map(breed => ({ value: breed, label: breed })) || []}
                        isMulti
                        onChange={(selected: any) => handleSpeciesPreferenceChange(index, "breeds", selected)}
                        value={pref.breeds}
                        className="pb-3"
                      />
                      <div>
                        <label>Max Age</label>
                        <input type="number" min="0" value={pref.age} onChange={(e) => handleSpeciesPreferenceChange(index, "age", parseInt(e.target.value))} className="input input-bordered m-3 align-middle w-fit" />
                      </div>
                      <div>
                        <label>Gender</label>
                        <Select options={[{ value: "Any", label: "Any" }, { value: "Male", label: "Male" }, { value: "Female", label: "Female" }]} onChange={(selected: any) => handleSpeciesPreferenceChange(index, "gender", selected.value)} value={{ value: pref.gender, label: pref.gender }} />
                      </div>
                      <div className="flex justify-between mt-3">
                        <button className="btn btn-error text-white" onClick={() => handleDeleteSpecies(index)}>Remove</button>
                        <button className="btn btn-secondary" onClick={() => setOpenIndex(null)}>Cancel</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <button className="btn btn-primary mt-5" onClick={handleSave}>Save</button>
            </>
          ) : (
            <button className="btn btn-primary mt-5" onClick={() => setIsEditing(true)}>Edit Profile</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;