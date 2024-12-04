"use client";

import React from "react";
import List from "@/components/List";
import { processFecFile } from "@/utils/process";
import Uniques from "@/components/Uniques";
import Exercice from "@/components/Exercice";
import ReactModal from "react-modal";

export default function Home() {
  const [data, setData] = React.useState<string[][]>([]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const table: string[][] = await processFecFile(file);
      setData(table);
    }
  };

  React.useEffect(() => {
    ReactModal.setAppElement("#__next"); // ID racine utilisé par Next.js
  }, []);

  return (
    <div
      id="__next"
      className="flex flex-col items-center justify-items-center min-h-screen p-4 pb-20 gap-12 sm:p-20 font-[family-name:var(--font-geist-sans)]"
    >
      <h1 className="text-2xl font-semibold">Lecteur de FEC</h1>
      <input type="file" onChange={handleFileChange} />
      {data.length > 0 && (
        <div className="flex flex-col gap-4">
          <Uniques data={data} />
          <Exercice data={data} />
        </div>
      )}
      <List data={data} />
    </div>
  );
}
