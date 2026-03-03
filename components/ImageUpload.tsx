"use client";

import { useState } from "react";
import imageCompression from "browser-image-compression";

// This component handles client-side compression and upload to Cloudinary.
// It expects the parent component to pass down a callback for when images are successfully uploaded.
export default function ImageUpload({
    onUploadSuccess,
    maxImages = 5
}: {
    onUploadSuccess: (urls: string[]) => void,
    maxImages?: number
}) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

    // Since we don't have the explicit Cloudinary credentials injected yet, 
    // we will use the ENV variables if available, otherwise it will fail gracefully.
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        if (!cloudName || !uploadPreset) {
            setError("Cloudinary configuration missing (.env). Cannot upload.");
            return;
        }

        const files = Array.from(e.target.files);

        if (uploadedUrls.length + files.length > maxImages) {
            setError(`You can only upload up to ${maxImages} images.`);
            return;
        }

        setUploading(true);
        setError(null);

        const newUploadedUrls: string[] = [];
        const newPreviewUrls: string[] = [];

        try {
            for (const file of files) {
                // Create local preview immediately
                newPreviewUrls.push(URL.createObjectURL(file));

                // 1. Compress Image (Target config: < 200KB)
                const options = {
                    maxSizeMB: 0.2, // 200KB
                    maxWidthOrHeight: 1280,
                    useWebWorker: true,
                };
                const compressedFile = await imageCompression(file, options);

                // 2. Upload to Cloudinary Unsigned
                const formData = new FormData();
                formData.append("file", compressedFile);
                formData.append("upload_preset", uploadPreset);

                const response = await fetch(
                    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to upload to Cloudinary");
                }

                const data = await response.json();
                newUploadedUrls.push(data.secure_url);
            }

            const allUploadedUrls = [...uploadedUrls, ...newUploadedUrls];
            setUploadedUrls(allUploadedUrls);
            setPreviewUrls([...previewUrls, ...newPreviewUrls]);

            // Notify Parent Form
            onUploadSuccess(allUploadedUrls);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "An error occurred during upload.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 p-6 rounded-md text-center bg-gray-50">
                <label className="cursor-pointer">
                    <span className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
                        {uploading ? "Uploading..." : "Select Images"}
                    </span>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                        disabled={uploading || uploadedUrls.length >= maxImages}
                    />
                </label>
                <p className="text-sm text-gray-500 mt-3">
                    Upload up to {maxImages} images. Images will be automatically compressed to &lt; 200KB.
                </p>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            {previewUrls.length > 0 && (
                <div className="grid grid-cols-5 gap-2 mt-4">
                    {previewUrls.map((url, idx) => (
                        <div key={idx} className="relative aspect-square">
                            {/* Using standard img for previews as next/image requires host configs */}
                            <img src={url} alt={`Preview ${idx + 1}`} className="object-cover w-full h-full rounded" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
