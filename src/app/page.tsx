"use client";

import { useState } from "react";
import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import Input from "@/components/common/Input";
import TaskSection from "@/components/Home/TaskSection";
import CheckItem from "@/components/Home/CheckItem";
import axios from "@/utils/axios";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [checked, setChecked] = useState(false);

  const handleAddTodo = async () => {
    if (!inputValue.trim()) return;

    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;

    try {
      await axios.post(`/api/${tenantId}/items`, {
        name: inputValue.trim(),
      });

      setInputValue("");
      console.log("할 일 등록 완료");
    } catch (err) {
      console.error("에러 발생:", err);
    }
  };

  const todoItems = [
    {
      id: 1,
      name: "비타민 챙겨 먹기",
      done: false,
    },
    {
      id: 2,
      name: "운동하기",
      done: false,
    },
    {
      id: 3,
      name: "코드 리뷰하기",
      done: true,
    },
  ];

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
              onClick={handleAddTodo}
            >
              추가하기
            </Button>
          </div>
          <div className="flex justify-evenly flex-row items-center gap-4 mt-6 w-full max-w-[1000px] px-4 mx-auto">
            <TaskSection type="todo" isEmpty={todoItems.length === 0}>
              {todoItems.length === 0 ? (
                <>
                  <p>할 일이 없어요.</p>
                  <p>TODO를 새롭게 추가해주세요!</p>
                </>
              ) : (
                todoItems.map((item) => (
                  <CheckItem
                    key={item.id}
                    label={item.name}
                    checked={item.done}
                    onToggle={() => {}}
                  />
                ))
              )}
            </TaskSection>
            <TaskSection type="done" isEmpty={true}>
              <p>아직 다 한 일이 없어요.</p>
              <p>해야 할 일을 체크해보세요!</p>
            </TaskSection>
          </div>
        </div>
      </main>
    </>
  );
}

{
  /* <TaskSection type="done" isEmpty={true}>
  <p>할 일이 없어요.</p>
  <p>TODO를 새롭게 추가해주세요!</p>
</TaskSection>; */
}
