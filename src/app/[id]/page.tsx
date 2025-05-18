"use client";

import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import CheckItemDetail from "@/components/Detail/CheckItemDetail";
import ImageUploadBox from "@/components/Detail/ImageUploadBox";
import Memo from "@/components/Detail/Memo";
import instance from "@/utils/axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";

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

  const [isFetched, setIsFetched] = useState(false);
  const [initialTodoItem, setInitialTodoItem] = useState<TodoItem | null>(null);
  const [todoItem, setTodoItem] = useState<TodoItem | null>(null);
  const [isEdited, setIsEdited] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleGetTodo = async () => {
    try {
      const response = await instance.get<TodoItem>(
        `/api/${TENANT_ID}/items/${params.id}`
      );

      const data = response.data;

      setInitialTodoItem(data);
      setTodoItem(data);
      setIsFetched(true);

      console.log("data", data);
    } catch (err) {
      console.error("에러 발생:", err);
    }
  };

  const handleMemoChange = (newMemo: string) => {
    setTodoItem((prev) => (prev ? { ...prev, memo: newMemo } : prev));
  };

  const handleLabelChange = (newLabel: string) => {
    setTodoItem((prev) => (prev ? { ...prev, name: newLabel } : prev));
  };

  const handleCompleted = () => {
    setTodoItem((prev) =>
      prev ? { ...prev, isCompleted: !prev.isCompleted } : prev
    );
  };

  const handleImageSelect = async (file: File) => {
    const isEnglishOnly = /^[a-zA-Z0-9_\-.]+$/.test(file.name);
    const isUnder5MB = file.size <= 5 * 1024 * 1024;

    if (!isEnglishOnly) {
      alert(
        "파일 이름은 영어, 숫자, 언더스코어(_), 하이픈(-), 점(.)만 사용할 수 있습니다."
      );
      return;
    }

    if (!isUnder5MB) {
      alert("파일 크기는 5MB 이하여야 합니다.");
      return;
    }

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

      setTodoItem((prev) => (prev ? { ...prev, imageUrl: uploadedUrl } : prev));

      console.log("Image uploaded successfully:", uploadedUrl);
    } catch (err) {
      console.error("이미지 업로드 중 에러 발생:", err);
    }
  };

  const handleUpdateTodo = async () => {
    if (!todoItem) return;
    else if (isEditing) return;

    setIsEditing(true);
    try {
      await instance.patch(`/api/${TENANT_ID}/items/${todoItem.id}`, {
        name: todoItem.name ?? "",
        memo: todoItem.memo ?? "",
        imageUrl: todoItem.imageUrl ?? "",
        isCompleted: todoItem.isCompleted,
      });
    } catch (err) {
      console.error("에러 발생:", err);
    } finally {
      setIsEditing(false);
      alert("수정되었습니다.");
      window.location.href = "/";
    }
  };

  const handleDeleteTodo = async () => {
    if (!todoItem) return;
    else if (isDeleting) return;

    setIsDeleting(true);
    try {
      const confirm = window.confirm("정말 삭제하시겠습니까?");
      if (!confirm) return;
      await instance.delete(`/api/${TENANT_ID}/items/${todoItem.id}`);
      alert("삭제되었습니다.");
      window.location.href = "/";
    } catch (err) {
      console.error("에러 발생:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    handleGetTodo();
  }, [TENANT_ID]);

  useEffect(() => {
    if (!todoItem || !initialTodoItem) return;

    const isChanged =
      todoItem.name !== initialTodoItem.name ||
      todoItem.memo !== initialTodoItem.memo ||
      todoItem.imageUrl !== initialTodoItem.imageUrl ||
      todoItem.isCompleted !== initialTodoItem.isCompleted;

    setIsEdited(isChanged);
  }, [todoItem, initialTodoItem]);

  return (
    <>
      <Header />
      <main className="w-full max-w-[1000px] min-h-screen bg-white px-4 mx-auto ">
        {!isFetched ? (
          <div className="flex justify-center items-center w-full h-40">
            <SyncLoader color="#7C3AED" />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6 pt-8">
            <CheckItemDetail
              label={todoItem?.name || ""}
              isCompleted={todoItem?.isCompleted || false}
              handleCompleted={handleCompleted}
              onLabelChange={handleLabelChange}
            />
            <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4">
              <div className="w-full md:flex-1">
                <ImageUploadBox
                  imageUrl={todoItem?.imageUrl}
                  onImageSelect={handleImageSelect}
                />
              </div>
              <div className="w-full md:flex-[2]">
                <Memo
                  value={todoItem?.memo || ""}
                  onChange={handleMemoChange}
                />
              </div>
            </div>

            <div className="w-full flex justify-end gap-4">
              <Button
                iconSrc="/images/editcheck-icon.png"
                active={isEdited}
                bgColor="bg-lime-300"
                textColor="text-slate-900"
                isLoading={isEditing}
                onClick={handleUpdateTodo}
              >
                수정완료
              </Button>
              <Button
                iconSrc="/images/x-icon.png"
                onClick={handleDeleteTodo}
                bgColor="bg-rose-500"
                textColor="text-white"
                isLoading={isDeleting}
                active={true}
              >
                삭제하기
              </Button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
