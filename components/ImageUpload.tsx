"use client";

import { useRef, useState } from "react";
import { UploadCloud, X } from "lucide-react";

type ImageUploadProps = {
  label?: string;
  value?: File | null;
  onChange: (file: File | null) => void;
};

const ImageUpload = ({
  label = "Upload Image",
  value,
  onChange,
}: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (file: File | null) => {
    onChange(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0] || null;
    handleFileChange(file);
  };

  return (
    <div className="w-full">
      {label && (
        <p className="text-sm font-semibold text-gray-700 mb-2">{label}</p>
      )}

      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-6 cursor-pointer bg-white hover:border-red-500 hover:bg-red-50 transition"
      >
        {preview ? (
          <div className="relative w-full flex justify-center">
            <img
              src={preview}
              alt="preview"
              className="h-40 object-cover rounded-xl shadow-md"
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFileChange(null);
              }}
              className="absolute top-2 right-2 bg-white shadow-md rounded-full p-1 hover:bg-red-500 hover:text-white transition"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center gap-2 py-6">
            <UploadCloud className="w-10 h-10 text-red-500" />
            <p className="text-sm font-medium text-gray-700">
              Drag & drop or click to upload
            </p>
            <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
        />
      </div>
    </div>
  );
};

export default ImageUpload;
