"use client";

import { useState } from "react";
import Button from "@/components/button";
import Header from "@/components/header";
import Input from "@/components/input";

export default function Home() {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <Header />
      <main className="flex justify-center">
        <div className="w-full">
          <div className="flex justify-center flex-row items-center gap-4 mt-6 w-full max-w-[1000px] px-4 mx-auto">
            <Input value={inputValue} onChange={setInputValue} />
            <Button
              active={inputValue.trim().length > 0}
              bgColor="bg-violet-600"
              size="default"
            >
              추가하기
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
