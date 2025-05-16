"use client";

import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import CheckItemDetail from "@/components/Detail/CheckItemDetail";
import ImageUploadBox from "@/components/Detail/ImageUploadBox";
import Memo from "@/components/Detail/Memo";
import instance from "@/utils/axios";
import { useParams } from "next/navigation";
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

  const handleMemoChange = (newMemo: string) => {
    setTodoItem((prev) => (prev ? { ...prev, memo: newMemo } : prev));
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
          <div className="w-full flex justify-center items-center gap-4">
            <ImageUploadBox />
            <Memo value={todoItem?.memo || ""} onChange={handleMemoChange} />
          </div>
          <div className="w-full flex justify-end gap-4">
            <Button
              iconSrc="/images/editcheck-icon.png"
              active={true}
              textColor="text-slate-900"
              onClick={() => {
                console.log("수정완료 클릭");
              }}
            >
              수정완료
            </Button>
            <Button
              iconSrc="/images/x-icon.png"
              onClick={() => {
                console.log("삭제하기 클릭");
              }}
              bgColor="bg-rose-500"
              textColor="text-white"
              active={true}
            >
              삭제하기
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
