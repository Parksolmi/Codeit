/**
 * Home 페이지 컴포넌트
 *
 * - 할 일(Todo)과 완료된 항목(Done)을 구분하여 보여주는 메인 페이지
 * - 새로운 할 일을 추가하거나, 기존 할 일의 완료 상태를 토글할 수 있음
 * - 항목 목록은 서버에서 비동기로 불러오며, 로딩 상태를 스피너로 표시
 *
 * 주요 기능:
 * - GET `/api/{TENANT_ID}/items` : 전체 할 일 목록 불러오기
 * - POST `/api/{TENANT_ID}/items` : 새 할 일 추가
 * - PATCH `/api/{TENANT_ID}/items/:id` : 할 일 완료 여부 토글
 *
 * 사용 컴포넌트:
 * - Header: 상단 네비게이션 바
 * - AddTodoInput: 입력창 및 추가 버튼
 * - TaskSection: 할 일/완료된 항목의 리스트 섹션
 * - CheckItem: 개별 할 일 항목
 */

"use client";

import { useCallback, useEffect, useState } from "react";
import Header from "@/components/common/Header";
import TaskSection from "@/components/Home/TaskSection";
import CheckItem from "@/components/Home/CheckItem";
import instance from "@/utils/axios";
import { SyncLoader } from "react-spinners";
import AddTodoInput from "@/components/Home/AddTodoInput";

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

  const handleAddTodo = async (value: string) => {
    if (!value.trim() || isAdding) return;

    setIsAdding(true);
    try {
      await instance.post(`/api/${TENANT_ID}/items`, {
        name: value.trim(),
      });

      await handleGetTodos();
    } catch (err) {
      console.error("에러 발생:", err);
    } finally {
      setIsAdding(false);
    }
  };

  const handleGetTodos = useCallback(async () => {
    try {
      const response = await instance.get<TodoItem[]>(
        `/api/${TENANT_ID}/items`
      );
      const data = response.data;

      const todos = data.filter((item: TodoItem) => !item.isCompleted);
      const dones = data.filter((item: TodoItem) => item.isCompleted);

      setTodoItems(todos);
      setDoneItems(dones);
      setIsFetched(true);
    } catch (err) {
      console.error("에러 발생:", err);
    }
  }, [TENANT_ID]);

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
  }, [handleGetTodos]);

  return (
    <>
      <Header />
      <main className="flex justify-center">
        <div className="w-full flex flex-col">
          <div className="flex justify-center flex-row items-center gap-4 mt-6 w-full max-w-[1000px] px-4 mx-auto">
            <AddTodoInput isSubmitting={isAdding} onSubmit={handleAddTodo} />
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
                  todoItems.map((item: TodoItem) => (
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
                  doneItems.map((item: TodoItem) => (
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
