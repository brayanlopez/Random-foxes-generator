"use client";
import { useState } from "react";
import type { NextPage } from "next";
import { RandomFox } from "@/components/RandomFox";

// generate simple unique id
const generateId = (): string => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

// generate random number between 1 and 122
const random = () => Math.floor(Math.random() * 122) + 1;

type ImageItem = {
  id: string;
  url: string;
};

const Home: NextPage = () => {
  const [images, setImages] = useState<Array<ImageItem>>([
    { id: generateId(), url: `https://randomfox.ca/images/${random()}.jpg` },
    { id: generateId(), url: `https://randomfox.ca/images/${random()}.jpg` },
    { id: generateId(), url: `https://randomfox.ca/images/${random()}.jpg` },
  ]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>{" "}
      {images.map(({ id, url }) => (
        <div className="p-4" key={id}>
          <RandomFox image={url} />
        </div>
      ))}{" "}
    </main>
  );
};

export default Home;
