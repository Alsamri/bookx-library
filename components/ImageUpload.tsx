"use client";

import { ImageKitProvider, upload } from "@imagekit/next";
import config from "@/lib/config";
import { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

interface Props {
  onFileChange?: (filePath: string) => void;
  type?: "image" | "video";
  accept?: string;
  placeholder?: string;
  folder?: string;
  variant?: "dark" | "light";
}

const ImageUpload = ({
  onFileChange,
  type = "image",
  accept = "image/*",
  placeholder = "Upload file",
  folder = "/",
  variant = "light",
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);
  const [progress, setProgress] = useState(0);

  const styles = {
    button:
      variant === "dark"
        ? "bg-dark-300"
        : "bg-light-600 border-gray-100 border",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-400",
  };

  const onError = (error: any) => {
    console.error(error);
    toast.error("Upload failed. Please try again.");
  };

  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange?.(res.filePath);
    toast.success(`${res.filePath} uploaded successfully!`);
  };

  const onValidate = (file: File) => {
    if (type === "image" && file.size > 20 * 1024 * 1024) {
      toast.error("Please upload an image less than 20MB in size");
      return false;
    }
    if (type === "video" && file.size > 50 * 1024 * 1024) {
      toast.error("Please upload a video less than 50MB in size");
      return false;
    }
    return true;
  };

  const handleUpload = async (file: File) => {
    if (!onValidate(file)) return;

    try {
      setProgress(0);
      const response = await fetch(`${config.env.endpoints}/api/auth/imagekit`);
      if (!response.ok) throw new Error("Failed to get auth params");
      const authParams = await response.json();

      await upload({
        file,
        fileName: file.name,
        folder,
        useUniqueFileName: true,
        publicKey,
        signature: authParams.signature,
        token: authParams.token,
        expire: authParams.expire,
        onProgress: ({ loaded, total }) => {
          setProgress(Math.round((loaded / total) * 100));
        },
      })
        .then(onSuccess)
        .catch(onError);
    } catch (error) {
      onError(error);
    }
  };

  return (
    <ImageKitProvider urlEndpoint={urlEndpoint}>
      <div>
        <input
          type="file"
          ref={inputRef}
          accept={accept}
          onChange={(e) =>
            e.target.files?.[0] && handleUpload(e.target.files[0])
          }
          className="hidden"
        />

        <button
          className={cn("upload-btn", styles.button)}
          onClick={(e) => {
            e.preventDefault();
            inputRef.current?.click();
          }}
        >
          <Image
            src="/icons/upload.svg"
            alt="upload-icon"
            width={20}
            height={20}
            className="object-contain"
          />
          <p className={cn("text-base", styles.placeholder)}>{placeholder}</p>
          {file?.filePath && (
            <p className={cn("upload-filename", styles.text)}>
              {file.filePath}
            </p>
          )}
        </button>

        {progress > 0 && progress !== 100 && (
          <div className="w-full rounded-full bg-green-200">
            <div className="progress" style={{ width: `${progress}%` }}>
              {progress}%
            </div>
          </div>
        )}

        {file?.filePath &&
          (type === "image" ? (
            <img
              src={`${urlEndpoint}/${file.filePath}`}
              alt={file.filePath}
              width={500}
              height={300}
            />
          ) : type === "video" ? (
            <video
              src={`${urlEndpoint}/${file.filePath}`}
              controls
              className="h-96 w-full rounded-xl"
            />
          ) : null)}
      </div>
    </ImageKitProvider>
  );
};

export default ImageUpload;
