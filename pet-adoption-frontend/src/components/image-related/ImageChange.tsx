import { FilePenLine } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ImageChange({ user }: { user: any}) {
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | "" | undefined>(user?.image || "");
    const [isUploading, setIsUploading] = useState(false);
  
    useEffect(()=> setPreview(user?.image), [user?.image])
  
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setImage(file);
        setPreview(URL.createObjectURL(file));
      }
    };
    
  
    const uploadImage = async () => {
      if (!image) return;
      setIsUploading(true);
  
      const formData = new FormData();
      formData.append("image", image);
  
      try {
        const res = await fetch("/api/uploadProfileImage", {
          method: "POST",
          body: formData,
        });
  
        const data = await res.json();
        if (data.success) {
          alert("Profile image updated successfully");
          window.location.reload();
        } else {
          alert("Failed to update image");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setIsUploading(false);
      }
    };
    return (
        <div>
            <div className="relative w-24 h-24 mx-auto mb-4">
                {preview && (
                <Image
                    src={preview}
                    priority
                    alt="Profile"
                    width={64}
                    height={64}
                    className="w-24 h-24 rounded-full"
                />
                )}
                <label
                htmlFor="file-upload"
                className="absolute top-0 left-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-accent"
                >
                <FilePenLine />
                </label>
                <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                />
            </div>
            { image && (
                <button onClick={uploadImage} disabled={isUploading} className="btn btn-primary mt-2 mx-auto">
                    {isUploading ? "Uploading..." : "Change Photo"}
                </button>
            )}
        </div>
    )
}