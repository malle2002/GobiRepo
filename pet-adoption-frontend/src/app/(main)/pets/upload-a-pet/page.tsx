"use client";

import { useState } from "react";
import Image from "next/image";
import useUploadPet from "@/src/hooks/pets/useUploadPet";
import ConfirmPetDetails from "@/src/components/pets/ConfirmPetDetails";

interface FormData {
  name: string;
  gender: string;
  species: string;
  breed: string;
  age: number;
  location: string;
  images: [];
}

export default function UploadAPet() {
  const { 
    register, handleSubmit, onSubmit, errors, 
    handleImageChange, previewImages, loading,
    fetchPetsError
  } = useUploadPet();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData | undefined>(undefined);

  const nextStep = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev:number) => {
    if(prev > 1) {
      return prev - 1;
    } else {
      return 1;
    }
  });

  return (
    <div className="container mx-auto w-[95%] md:w-1/2 p-6 bg-transparent shadow-lg rounded-lg my-12">
      <div className={`flex flex-row ${step>1?'':"text-center"} place-items-start`}>
        { step>1 && (
          <button onClick={prevStep} className="relative text-gray-600 hover:text-gray-900 mt-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 16 16" fill="none">
            <path d="M8 10L8 14L6 14L-2.62268e-07 8L6 2L8 2L8 6L16 6L16 10L8 10Z" fill="#000000"/>
          </svg>
        </button>
        )}
        <h2 className="text-2xl font-bold mb-10 w-full text-center">Please complete all the steps to upload your pet</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} method="POST" className="space-y-6">
        {step === 1 && (
          <div className="space-y-6">
            <label htmlFor="name" className="font-extrabold label">Name</label>
            <input autoFocus {...register("name", { required: "Name is required" })} placeholder="Name" className="input input-bordered w-full" />
            {errors.name && <p className="text-red-500">{errors.name.message as string}</p>}

            <hr />

            <label htmlFor="gender" className="font-extrabold label">Gender</label>
            <select 
              {...register("gender", { required: "Gender is required" })}
              className="input input-bordered w-full"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.gender && <p className="text-red-500 mt-3">{errors.gender.message as string}</p>}
            <div className="text-center">
              <button type="button" onClick={handleSubmit(nextStep)} className="btn btn-primary w-1/2 mt-4">Next</button>
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div>
            <input autoFocus {...register("species", { required: "Species is required" })} placeholder="Species" className="input input-bordered w-full" />
            {errors.species && <p className="text-red-500 mt-3">{errors.species.message as string}</p>}
            <div className="text-center mt-5">
              <button type="button" onClick={handleSubmit(nextStep)} className="btn btn-primary w-1/2 mt-4">Next</button>
            </div>       
          </div>
        )}

        {step === 3 && (
          <div>
            <input autoFocus {...register("breed", { required: "Breed is required" })} placeholder="Breed" className="input input-bordered w-full" />
            {errors.breed && <p className="text-red-500 mt-3">{errors.breed.message as string}</p>}
            <div className="text-center mt-5">
              <button type="button" onClick={handleSubmit(nextStep)} className="btn btn-primary w-1/2 mt-4">Next</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <input autoFocus min={0} type="number" {...register("age", { required: "Age is required" })} placeholder="Age" className="input input-bordered w-full" />
            {errors.age && <p className="text-red-500 mt-3">{errors.age.message as string}</p>}
            <div className="text-center mt-5">
              <button type="button" onClick={handleSubmit(nextStep)} className="btn btn-primary w-1/2 mt-4">Next</button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <input autoFocus {...register("location", { required: "Location is required" })} placeholder="Location" className="input input-bordered w-full" />
            {errors.location && <p className="text-red-500 mt-3">{errors.location.message as string}</p>}
            <div className="text-center mt-5">
              <button type="button" onClick={handleSubmit(nextStep)} className="btn btn-primary w-1/2 mt-4">Next</button>
            </div>
          </div>
        )}

        {step === 6 && (
          <div>
            <input autoFocus type="file" {...register("images", { required: "Images are required"})} accept="image/*" multiple onChange={handleImageChange} className="input input-bordered w-full h-fit py-4" />
            {previewImages.length > 0 && (
              <div className="flex gap-2 mt-2">
                {previewImages.map((src, index) => (
                  <Image key={index} src={src} alt="Preview" height={24} width={24} className="w-24 h-24 object-cover rounded-md" />
                ))}
              </div>
            )}
            {errors.images && <p className="text-red-500 mt-3">{errors.images.message as string}</p>}
            <div className="text-center mt-5">
              <button type="button" onClick={handleSubmit(nextStep)} className="btn btn-primary w-1/2 mt-4">Next</button>
            </div>
          </div>
        )}

        {step === 7 && formData && (
          <ConfirmPetDetails 
            formData={formData} 
            loading={loading} 
            onSubmit={handleSubmit}
            setStep={(n:number) => setStep(n)} 
          />
        )}
        
        { fetchPetsError && (
          <p className="place-self-center text-red-600">{fetchPetsError}</p>
        )}
      </form>
    </div>
  );
}
