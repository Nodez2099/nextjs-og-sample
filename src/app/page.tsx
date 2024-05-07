"use client";

import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string>();
  const [resource, setResource] = useState<any>();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  // const hostname = window.location.hostname;

  // const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const base64String = reader.result as string;
  //       localStorage.setItem("image", base64String);
  //     };
  //     setSelectedImage(URL.createObjectURL(file));
  //   }
  // };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);

    // Create a new FormData instance
    const formData = new FormData(e.currentTarget);

    // Get the values of the form fields
    const title = formData.get("title");
    const description = formData.get("description");
    // const image = localStorage.getItem('image');

    // Set the values of the form fields as query parameters
    params.set("title", title as string);
    params.set("description", description as string);
    params.set("image", selectedImage as string);

    console.log("image", selectedImage);

    // Redirect to the new URL with the query parameters
    router.push(`/posts/${title}?${params.toString()}`);
  };

  return (
    <main
      style={{
        backgroundImage:
          "linear-gradient(225deg, #BCEBEB, #A6DCEF 51%, #E6CBF3 100%)",
      }}
      className="flex min-h-svh flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-[55%] min-h-[576px] px-6 py-8 rounded-2xl bg-white">
        <div className="text-2xl text-center font-bold">Share a Post</div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className="p-3 rounded-lg border border-[#CCCCCC] bg-[#F3F3F3] focus:outline-none"
          placeholder="Enter a title"
          required
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          className="p-3 h-32 rounded-lg border border-[#CCCCCC] bg-[#F3F3F3] focus:outline-none resize-none"
          maxLength={250}
          placeholder="Enter a description"
          required
        />
        <label htmlFor="photo-upload">Upload a Photo</label>

        <CldUploadWidget
          uploadPreset="kwifgs7z"
          onSuccess={(results) => {
            // console.log("results", results);
            const info = results.info as CloudinaryUploadWidgetInfo;

            console.log("info", info);

            if (info) {
              setSelectedImage(info.secure_url);
            }
            // results.info && setResource(results.info);
          }}>
          {({ open }) => {
            return (
              <button
                className="grid place-items-center h-64 rounded-lg border border-[#CCCCCC] bg-[#F3F3F3]"
                onClick={() => open()}>
                {!selectedImage && (
                  <Image
                    src="/icons/ic-add-photo.svg"
                    alt="Add Photo Icon"
                    width={48}
                    height={48}
                    priority
                  />
                )}
                {selectedImage && (
                  <Image
                    src={selectedImage as string}
                    alt="Selected"
                    className="object-contain h-64 w-full"
                    width={512}
                    height={512}
                  />
                )}
              </button>
            );
          }}
        </CldUploadWidget>
        {/* <input
          id="photo-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />

        <label
          htmlFor="photo-upload"
          className="grid place-items-center h-64 rounded-lg border border-[#CCCCCC] bg-[#F3F3F3]">
          {!selectedImage && (
            <Image
              src="/icons/ic-add-photo.svg"
              alt="Add Photo Icon"
              width={48}
              height={48}
              priority
            />
          )}
          {selectedImage && (
            <Image
              src={selectedImage as string}
              alt="Selected"
              className="object-contain h-64 w-full"
              width={48}
              height={48}
              onLoad={() => URL.revokeObjectURL(selectedImage)}
            />
          )}
        </label> */}

        <button className="p-3 rounded-lg bg-sky-400 text-white font-bold">
          Generate and copy Link
        </button>
      </form>
    </main>
  );
}
