"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Image from "next/image";
const Select = dynamic(() => import("react-select"), { ssr: false });


const FindAPet = () => {
  const { data: session }: any = useSession();
  const token = session?.user?.accessToken;
  const [pets, setPets] = useState<any[]>([]);
  const [filters, setFilters] = useState({ species: "", breed: "", age: "", gender: "" });
  const [userPreferences, setUserPreferences] = useState(null);
  const [useFilters, setUseFilters] = useState(false);
  
  useEffect(() => {
    const fetchPets = async () => {
      try {
        let params: any = {};
        if (token && !useFilters) {
          const userRes = await axios.get("/api/user", { headers: { Authorization: `Bearer ${token}` } });
          console.log(userRes);
          setUserPreferences(userRes.data.preferences);
          params = { preferences: userRes.data.preferences };
        } else {
          params = { ...filters };
        }
        
        const res = await axios.get("/api/pets", { params });
        console.log(res);
        setPets(Array.isArray(res.data.data) ? res.data.data : []);
      } catch (error) {
        console.error("Error fetching pets", error);
        setPets([]);
      }
    };
    fetchPets();
  }, [token, filters, useFilters]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Find a Pet</h1>
      {token && userPreferences && !useFilters ? (
        <div>
          <p>Showing pets based on your preferences.</p>
          <button onClick={() => setUseFilters(true)} className="btn btn-secondary mt-2">Ignore Preferences & Use Filters</button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold">Filter Options</h2>
          <Select 
            options={[{ value: "Dog", label: "Dog" }, { value: "Cat", label: "Cat" }]} 
            onChange={(selected : any) => setFilters(prev => ({ ...prev, species: selected?.value || "" }))} 
          />
          <button onClick={() => setUseFilters(false)} className="btn btn-secondary mt-2" disabled={!token}>Use Preferences</button>
        </div>
      )}
      
      <div className="flex flex-col gap-4 mt-4">
        {pets.length > 0 ? pets.map((pet, index) => (
          <div key={index} className="card bg-base-100 shadow-xl p-4 flex flex-row gap-10">
            <div>
              { pet.images[0] && ( <Image src={pet.images[0]} width={128} height={128} alt={`Image of pet '${pet.name}'`}/> ) }
            </div>
            <div>
              <h3 className="text-lg font-semibold">{pet.name}</h3>
              <p>Species: {pet.species}</p>
              <p>Breed: {pet.breed}</p>
              <p>Age: {pet.age}</p>
              <p>Gender: {pet.gender}</p>
              <p>Description: {pet.description}</p>
            </div>
            <p className="float-right flex-1">asdsa</p>
          </div>
        )) : <p>No pets found.</p>}
      </div>
    </div>
  );
};

export default FindAPet;