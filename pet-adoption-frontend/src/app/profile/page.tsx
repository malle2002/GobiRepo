"use client";

import Select from "react-select";
import Image from "next/image";
import Pagination from "@/src/components/Pagination";
import useSelectedPet from "@/src/hooks/profile/useSelectedPet";
import useProfile from "@/src/hooks/profile/useProfile";
import LoadingComponent from "@/src/components/LoadingComponent";
import usePets from "@/src/hooks/profile/usePets";

const Profile = () => {
  const { selectedPet, setSelectedPet } = useSelectedPet();
  const { 
    isEditing, setIsEditing,
    isEmailEditable, 
    user, 
    formData, setFormData, 
    speciesOptions,
    speciesMap,
    openIndex, setOpenIndex, 
    loading,
    handleDeleteSpecies, handleSave, handleSpeciesChange, handleSpeciesPreferenceChange, togglePreference
  } = useProfile();
  const { pets, pagination, page, setPage } = usePets();

  if (loading) {
    return <LoadingComponent/>
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          {user?.image && ( <Image src={user.image} priority alt="Profile" width={64} height={64} className="w-24 h-24 rounded-full mx-auto mb-4" /> )}
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
              <p className="">{user?.email}</p>
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
                onChange={(selected: { value: string; label: string; } | null) : void => { handleSpeciesChange(selected)} } 
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
              <div className="flex flex-row justify-around">
                <button className="btn bg-red-500 text-white hover:bg-red-400 mt-5 w-1/3" onClick={() => setIsEditing(!isEditing) }>Cancel</button>
                <button className="btn btn-primary mt-5 w-1/3" onClick={handleSave}>Save</button>
              </div>
            </>
          ) : (
            <button className="btn btn-primary mt-5" onClick={() => setIsEditing(true)}>Edit Profile</button>
          )}
        </div>
      </div>
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Your Pets</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
};

export default Profile;