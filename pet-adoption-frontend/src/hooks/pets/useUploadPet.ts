"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../../lib/axios";
import { useRouter } from "next/navigation";

export default function useUploadPet() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PetFormData>();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [fetchPetsError, setFetchPetsError] = useState<string>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const previews = files.map((file) => URL.createObjectURL(file));
      setPreviewImages(previews);
    }
  };

  const onSubmit = async (data: PetFormData) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("species", data.species);
      formData.append("breed", data.breed);
      formData.append("age", data.age.toString());
      formData.append("gender", data.gender);
      formData.append("location", data.location);

      if (data.description) formData.append("description", data.description);
      if (data.vaccinations) formData.append("vaccinations", data.vaccinations);
      if (data.allergies) formData.append("allergies", data.allergies);

      if (data.images) {
        Array.from(data.images).forEach((image) => {
          formData.append("images[]", image);
        });
      }
      
      await axios.get("/sanctum/csrf-cookie").then(async () => {
        const response = await fetch("/api/pets", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          reset();
          setPreviewImages([]);
          router.push("/");
        } else {
          const data = await response.json();
          setFetchPetsError(data?.error);
        };
      });
    } catch (error: unknown) {
      if(error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    loading,
    handleImageChange,
    previewImages,
    fetchPetsError
  };
}
