"use client";

import { useState } from "react";
import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import Input from "@/components/common/Input";
import Empty from "@/components/Home/Empty";
import CheckItem from "@/components/Home/CheckItem";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [checked, setChecked] = useState(false);

  return (
    <>
      <Header />
      <main className="flex justify-center">
        <div className="w-full flex flex-col">
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
          <div className="flex justify-evenly flex-row items-center gap-4 mt-6 w-full max-w-[1000px] px-4 mx-auto">
            <CheckItem
              label="비타민 챙겨 먹기"
              checked={checked}
              onToggle={() => setChecked(!checked)}
            />

            {/* <Empty type="todo">
              <p>할 일이 없어요.</p>
              <p>TODO를 새롭게 추가해주세요!</p>
            </Empty>

            <Empty type="done">
              <p>아직 다 한 일이 없어요.</p>
              <p>해야 할 일을 체크해보세요!</p>
            </Empty> */}
          </div>
        </div>
      </main>
    </>
  );
}
