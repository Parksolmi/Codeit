"use client";

import Header from "@/components/common/Header";
import CheckItemDetail from "@/components/Detail/CheckItemDetail";
import ImageUploadBox from "@/components/Detail/ImageUploadBox";
import instance from "@/utils/axios";
import { useParams } from "next/navigation";
import { todo } from "node:test";
import { useEffect, useState } from "react";

interface TodoItem {
  id: number;
  imageUrl: string | null;
  memo: string | null;
  tenantId: string;
  name: string;
  isCompleted: boolean;
}

export default function Detail() {
  const params = useParams();
  const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID;

  const [todoItem, setTodoItem] = useState<TodoItem | null>(null);

  const handleGetTodo = async () => {
    try {
      const response = await instance.get<TodoItem>(
        `/api/${TENANT_ID}/items/${params.id}`
      );

      const data = response.data;
      setTodoItem(data);

      console.log("data", data);
    } catch (err) {
      console.error("에러 발생:", err);
    }
  };

  useEffect(() => {
    handleGetTodo();
  }, [TENANT_ID]);

  return (
    <>
      <Header />
      <main className="w-full max-w-[1000px] min-h-screen bg-white px-4 mx-auto ">
        <div className="flex flex-col items-center gap-6 pt-8">
          <CheckItemDetail
            label={todoItem?.name}
            checked={todoItem?.isCompleted}
          />
          <div>
            <ImageUploadBox />
            {/* <Memo /> */}
          </div>
        </div>
      </main>
    </>
  );
}
