"use client";
import { useState } from "react";
import type { MouseEventHandler } from "react";
import type { NextPage } from "next";
import { LazyImage } from "@/components/LazyImage";

// generate simple unique id
const generateId = (): string => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

// generate random number between 1 and 122
const random = () => Math.floor(Math.random() * 122) + 1;

type ImageItem = { id: string; url: string };

const Home: NextPage = () => {
  const [images, setImages] = useState<Array<ImageItem>>([]);

  const addNewFox: MouseEventHandler<HTMLButtonElement> = () => {
    const id = generateId();
    const url = `https://randomfox.ca/images/${random()}.jpg`;
    setImages([...images, { id, url }]);
  };

  const cleanImages = (): void => setImages([]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <button
          onClick={addNewFox}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Add new fox
        </button>{" "}
        <button
          onClick={cleanImages}
          className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Clean images
        </button>{" "}
      </div>
      {images.map(({ id, url }, index) => (
        <div className="p-4" key={id}>
          <LazyImage
            src={url}
            width="320"
            height="auto"
            className="mx-auto rounded-md bg-gray-300"
            onLazyLoad={(img) => {
              console.log(`Image #${index + 1} cargada. Nodo:`, img);
            }}
          />
        </div>
      ))}{" "}
    </main>
  );
};

export default Home;
