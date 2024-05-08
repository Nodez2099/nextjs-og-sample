"use client";

import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string>();

  const searchParams = useSearchParams();
  const href = window.location.href;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);

    // Create a new FormData instance
    const formData = new FormData(e.currentTarget);

    // Get the values of the form fields
    const title = formData.get("title");
    const description = formData.get("description");

    // Set the values of the form fields as query parameters
    params.set("title", title as string);
    params.set("description", description as string);
    params.set("image", selectedImage as string);

    try {
      await navigator.clipboard.writeText(
        `${href}/posts/${title}?${params.toString()}`
      );
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link");
      console.error(err);
    }

    // // Redirect to the new URL with the query parameters
    // router.push(`/posts/${title}?${params.toString()}`);
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
            const info = results.info as CloudinaryUploadWidgetInfo;

            if (info) {
              setSelectedImage(info.secure_url);
            }
          }}>
          {({ open }) => {
            return (
              <button
                type="button"
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
        <button className="p-3 rounded-lg bg-sky-400 text-white font-bold">
          Generate and copy Link
        </button>
      </form>
      <ToastContainer
        position="bottom-center"
        hideProgressBar
        theme="light"
        autoClose={2_000}
        closeOnClick
        limit={1}
      />
    </main>
  );
}
