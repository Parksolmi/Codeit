"use client";

import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import CheckItemDetail from "@/components/Detail/CheckItemDetail";
import ImageUploadBox from "@/components/Detail/ImageUploadBox";
import Memo from "@/components/Detail/Memo";
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

  const handleMemoChange = (newMemo: string) => {
    setTodoItem((prev) => (prev ? { ...prev, memo: newMemo } : prev));
  };

  const handleImageSelect = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const uploadResponse = await instance.post(
        `/api/${TENANT_ID}/images/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const uploadedUrl = uploadResponse.data.url;

      // 먼저 상태 업데이트 (UI 반영)
      setTodoItem((prev) => (prev ? { ...prev, imageUrl: uploadedUrl } : prev));

      console.log("Image uploaded successfully:", uploadedUrl, todoItem);
    } catch (err) {
      console.error("이미지 업로드 또는 업데이트 중 에러 발생:", err);
    }
  };

  // todoItem 데이터 patch
  const handleUpdateTodo = async () => {
    if (!todoItem) return;
    try {
      await instance.patch(`/api/${TENANT_ID}/items/${todoItem.id}`, {
        name: todoItem.name ?? "",
        memo: todoItem.memo ?? "",
        imageUrl: todoItem.imageUrl ?? "",
        isCompleted: todoItem.isCompleted,
      });
      console.log("할 일 수정 완료");
    } catch (err) {
      console.error("에러 발생:", err);
    }
  };

  // todoItem 데이터 삭제
  const handleDeleteTodo = async () => {
    if (!todoItem) return;
    try {
      await instance.delete(`/api/${TENANT_ID}/items/${todoItem.id}`);
      console.log("할 일 삭제 완료");
    } catch (err) {
      console.error("에러 발생:", err);
    }
  };

  useEffect(() => {
    handleGetTodo();
  }, [TENANT_ID]);

  useEffect(() => {
    console.log("todoItem", todoItem);
  }, [todoItem]);

  return (
    <>
      <Header />
      <main className="w-full max-w-[1000px] min-h-screen bg-white px-4 mx-auto ">
        <div className="flex flex-col items-center gap-6 pt-8">
          <CheckItemDetail
            label={todoItem?.name}
            checked={todoItem?.isCompleted}
          />
          <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4">
            <div className="w-full md:flex-1">
              <ImageUploadBox
                imageUrl={todoItem?.imageUrl}
                onImageSelect={handleImageSelect}
              />
            </div>
            <div className="w-full md:flex-[2]">
              <Memo value={todoItem?.memo || ""} onChange={handleMemoChange} />
            </div>
          </div>

          <div className="w-full flex justify-end gap-4">
            <Button
              iconSrc="/images/editcheck-icon.png"
              active={true}
              textColor="text-slate-900"
              onClick={handleUpdateTodo}
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
