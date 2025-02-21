"use client";

import useUploadPet from "@/src/hooks/pets/useUploadPet";
import Image from "next/image";

export default function UploadAPet() {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    loading,
    handleImageChange,
    previewImages,
  } = useUploadPet();

  return (
    <div className="container mx-auto w-1/3 p-6 bg-transparent shadow-lg rounded-lg my-12">
      <h2 className="text-2xl font-bold mb-4 text-center">Upload Your Pet for Adoption</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <fieldset className="border p-4 rounded-lg">
          <legend className="text-lg font-semibold">Basic Information</legend>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input {...register("name", { required: "Name is required" })} placeholder="Name" className="input input-bordered w-full" />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            <div>
              <input {...register("species", { required: "Species is required" })} placeholder="Species" className="input input-bordered w-full" />
              {errors.species && <p className="text-red-500">{errors.species.message}</p>}
            </div>

            <div>
              <input {...register("breed", { required: "Breed is required" })} placeholder="Breed" className="input input-bordered w-full" />
              {errors.breed && <p className="text-red-500">{errors.breed.message}</p>}
            </div>

            <div>
              <input min={0} type="number" {...register("age", { required: "Age is required" })} placeholder="Age" className="input input-bordered w-full" />
              {errors.age && <p className="text-red-500">{errors.age.message}</p>}
            </div>

            <div className="col-span-2">
              <select {...register("gender", { required: "Gender is required" })} className="input input-bordered w-full">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
            </div>
          </div>
        </fieldset>

        {/* Health Information */}
        <fieldset className="border p-4 rounded-lg">
          <legend className="text-lg font-semibold">Health Information</legend>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input {...register("vaccinations")} placeholder="Vaccinations" className="input input-bordered w-full" />
            </div>
            <div>
              <input {...register("allergies")} placeholder="Allergies" className="input input-bordered w-full" />
            </div>
          </div>
        </fieldset>

        {/* Additional Details */}
        <fieldset className="border p-4 rounded-lg">
          <legend className="text-lg font-semibold">Additional Details</legend>
          <div className="space-y-2">
            <textarea {...register("description")} placeholder="Description" className="input input-bordered w-full h-24" />
            <input {...register("location", { required: "Location is required" })} placeholder="Location" className="input input-bordered w-full" />
            {errors.location && <p className="text-red-500">{errors.location.message}</p>}
          </div>
        </fieldset>

        {/* Image Upload */}
        <fieldset className="border p-4 rounded-lg">
          <legend className="text-lg font-semibold">Upload Images</legend>
          <input type="file" {...register("images")} multiple accept="image/*" onChange={handleImageChange} className="input input-bordered w-full h-fit py-4" />

          {/* Preview Selected Images */}
          {previewImages.length > 0 && (
            <div className="flex gap-2 mt-2">
              {previewImages.map((src, index) => (
                <Image key={index} src={src} alt="Preview" height={24} width={24} className="w-24 h-24 object-cover rounded-md" />
              ))}
            </div>
          )}
        </fieldset>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Adding..." : "Add Pet"}
        </button>
      </form>
    </div>
  );
}
