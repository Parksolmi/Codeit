"use client";

import { useEffect, useState } from "react";
import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import Input from "@/components/common/Input";
import TaskSection from "@/components/Home/TaskSection";
import CheckItem from "@/components/Home/CheckItem";
import instance from "@/utils/axios";
import { SyncLoader } from "react-spinners";

interface TodoItem {
  id: number;
  name: string;
  isCompleted: boolean;
}

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const [doneItems, setDoneItems] = useState<TodoItem[]>([]);

  const [isFetched, setIsFetched] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [togglingId, setTogglingId] = useState<number | null>(null);

  const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID;

  const handleAddTodo = async () => {
    if (!inputValue.trim()) return;
    else if (isAdding) return;

    setIsAdding(true);
    try {
      await instance.post(`/api/${TENANT_ID}/items`, {
        name: inputValue.trim(),
      });

      setInputValue("");
      await handleGetTodos();
      console.log("할 일 등록 완료");
    } catch (err) {
      console.error("에러 발생:", err);
    } finally {
      setIsAdding(false);
    }
  };

  const handleGetTodos = async () => {
    try {
      const response = await instance.get<TodoItem[]>(
        `/api/${TENANT_ID}/items`
      );
      const data = response.data;

      const todos = data.filter((item: any) => !item.isCompleted);
      const dones = data.filter((item: any) => item.isCompleted);

      setTodoItems(todos);
      setDoneItems(dones);
      setIsFetched(true);
    } catch (err) {
      console.error("에러 발생:", err);
    }
  };

  const handleToggle = async (itemId: number, currentCompleted: boolean) => {
    setTogglingId(itemId);
    try {
      await instance.patch(`/api/${TENANT_ID}/items/${itemId}`, {
        isCompleted: !currentCompleted,
      });

      if (currentCompleted) {
        const item = doneItems.find((item) => item.id === itemId);
        if (!item) return;

        setDoneItems((prev) => prev.filter((i) => i.id !== itemId));
        setTodoItems((prev) => [...prev, { ...item, isCompleted: false }]);
      } else {
        const item = todoItems.find((item) => item.id === itemId);
        if (!item) return;

        setTodoItems((prev) => prev.filter((i) => i.id !== itemId));
        setDoneItems((prev) => [...prev, { ...item, isCompleted: true }]);
      }
    } catch (err) {
      console.error("토글 에러:", err);
    } finally {
      setTogglingId(null);
    }
  };

  useEffect(() => {
    handleGetTodos();
  }, [TENANT_ID]);

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
              textColor="text-slate-900"
              onClick={handleAddTodo}
              iconSrc="/images/plus-icon.svg"
              isLoading={isAdding}
              textInvert={true}
            >
              추가하기
            </Button>
          </div>

          {!isFetched ? (
            <div className="flex justify-center items-center w-full h-40">
              <SyncLoader color="#7C3AED" />
            </div>
          ) : (
            <div className="flex justify-evenly flex-col items-start gap-4 mt-6 w-full max-w-[1000px] px-4 mx-auto md:flex-row">
              <TaskSection type="todo" isEmpty={todoItems.length === 0}>
                {todoItems.length === 0 ? (
                  <>
                    <p>할 일이 없어요.</p>
                    <p>TODO를 새롭게 추가해주세요!</p>
                  </>
                ) : (
                  todoItems.map((item: any) => (
                    <CheckItem
                      id={item.id}
                      key={item.id}
                      label={item.name}
                      checked={item.isCompleted}
                      onToggle={() => handleToggle(item.id, item.isCompleted)}
                      isLoading={togglingId === item.id}
                    />
                  ))
                )}
              </TaskSection>
              <TaskSection type="done" isEmpty={doneItems.length === 0}>
                {doneItems.length === 0 ? (
                  <>
                    <p>아직 다 한 일이 없어요.</p>
                    <p>해야 할 일을 체크해보세요!</p>
                  </>
                ) : (
                  doneItems.map((item: any) => (
                    <CheckItem
                      id={item.id}
                      key={item.id}
                      label={item.name}
                      checked={item.isCompleted}
                      onToggle={() => handleToggle(item.id, item.isCompleted)}
                      isLoading={togglingId === item.id}
                    />
                  ))
                )}
              </TaskSection>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
