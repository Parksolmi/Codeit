"use client";

import { useState } from "react";
import Button from "@/components/button";
import Header from "@/components/header";
import Input from "@/components/input";

export default function Home() {
  const [inputValue, setInputValue] = useState("");

  return (
    <main>
      <Header />
      <div>
        <Input value={inputValue} onChange={setInputValue} />
        <Button
          active={inputValue.trim().length > 0}
          bgColor="bg-violet-600"
          size="default"
        >
          추가하기
        </Button>
      </div>

      <h1 className="text-violet-600">테스트 텍스트</h1>
    </main>
  );
}
