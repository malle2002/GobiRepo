"use client";

import Image from "next/image";
import { lazy, Suspense, useState } from "react";

import useSelectedPet from "@/src/hooks/profile/useSelectedPet";
import useProfile from "@/src/hooks/profile/useProfile";
import usePets from "@/src/hooks/profile/usePets";
import CheckoutPage from "@/src/components/CheckoutPage";
import ImageChange from "@/src/components/image-related/ImageChange";
import { ProfilePetsSkeleton, ProfileSkeleton } from "@/src/components/skeletons/ProfileSkeleton";

const ProfileForm = lazy(() => import("@/src/components/profile/ProfileForm"));
const ProfilePets = lazy(() => import("@/src/components/profile/ProfilePets"));

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

  const [sponsoredPetId, setSponsoredPetId] = useState<string | null>(null);

  const handleSponsorClick = (petId: string) => {
    setSelectedPet(null);
    setSponsoredPetId(petId);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          {/* {user?.image && ( <Image src={user.image} priority alt="Profile" width={64} height={64} className="w-24 h-24 rounded-full mx-auto mb-4" /> )} */}
          <Suspense fallback={<ProfileSkeleton className="w-[{64}px] h-[{64}px]" />}>
            {user ? (
              <div>
                <ImageChange user={user}/>
                <ProfileForm 
                  user={user}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  isEmailEditable={isEmailEditable}
                  formData={formData}
                  setFormData={setFormData}
                  speciesOptions={speciesOptions}
                  togglePreference={togglePreference}
                  handleSpeciesChange={handleSpeciesChange}
                  handleSpeciesPreferenceChange={handleSpeciesPreferenceChange}
                  handleDeleteSpecies={handleDeleteSpecies}
                  openIndex={openIndex}
                  setOpenIndex={setOpenIndex}
                  speciesMap={speciesMap}
                  handleSave={handleSave}
                />
              </div>
            ) : (
              <ProfileSkeleton className="w-[{64}px] h-[{64}px]" />
            )}
          </Suspense>
        </div>
      </div>
      <Suspense fallback={<ProfilePetsSkeleton className="" />}>
        { pets ? (
          <ProfilePets pets={pets} pagination={pagination} setPage={setPage} setSelectedPet={setSelectedPet} />
        ): (
          <ProfilePetsSkeleton className="" />
        )}
      </Suspense>
      
      {sponsoredPetId && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex flex-col items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg ">
            <div className="flex flex-row justify-between">
              <h2 className="text-xl font-bold mb-4 text-warning">Sponsor Pet Post</h2>
              <button className="btn btn-sm btn-circle btn-ghost top-2 right-2 z-51" onClick={() => setSponsoredPetId(null)}>✕</button>
            </div>
            <CheckoutPage petId={sponsoredPetId} className="flex mx-auto" formClassName="w-full bg-white rounded-xl p-5"/>
          </div>
        </div>
      )}
      {selectedPet && (
        <dialog className={`modal ${selectedPet ? "modal-open" : ""}`} id="petModal">
          <div className="modal-box">
            <button className="btn btn-sm btn-circle fixed right-2 top-2 z-50" onClick={() => setSelectedPet(null)}>✕</button>

            <div className="flex flex-row items-center gap-x-5 justify-between">
              <h2 className="text-xl font-bold">{selectedPet.name}</h2>
            </div>

            { selectedPet.images[0] && ( <Image src={selectedPet.images[0]} alt={selectedPet.name} width={300} height={200} className="rounded-lg mt-2 w-full" /> )}
            <div className="flex flex-row justify-between">
              <div className="my-5 space-y-2">
                <p><strong>Species:</strong> {selectedPet.species}</p>
                <p><strong>Breed:</strong> {selectedPet.breed}</p>
                <p><strong>Age:</strong> {selectedPet.age} years</p>
                <p><strong>Gender:</strong> {selectedPet.gender}</p>
                {selectedPet.description && <p><strong>Description:</strong> {selectedPet.description}</p>}
                {selectedPet.vaccinations && <p><strong>Vaccinations:</strong> {selectedPet.vaccinations}</p>}
                {selectedPet.allergies && <p><strong>Allergies:</strong> {selectedPet.allergies}</p>}
                <p><strong>Location:</strong> {selectedPet.location}</p>
              </div>
              <button
                onClick={() => handleSponsorClick(selectedPet.id)}
                className="btn btn-warning me-5 self-end py-15 px-20 my-5"
              >
                Sponsor
              </button>
            </div>
            
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Profile;