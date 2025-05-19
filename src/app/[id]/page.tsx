/**
 * Detail 페이지 컴포넌트
 *
 * - 특정 할 일 항목의 상세 정보를 조회하고 수정하거나 삭제할 수 있는 페이지
 * - 이름, 완료 상태, 메모, 이미지 업로드 필드를 포함하며 상태 변경을 서버에 반영
 * - 입력이 변경되었을 경우 "수정완료" 버튼이 활성화되며, 이미지 업로드는 유효성 검사(영문 이름, 5MB 이하)를 거침
 * - 삭제 시 사용자에게 확인을 요청하고 삭제 후 메인 페이지로 이동
 *
 * 주요 기능:
 * - GET: `/api/{TENANT_ID}/items/:id` → 초기 할 일 데이터 로드
 * - PATCH: `/api/{TENANT_ID}/items/:id` → 수정 완료 처리
 * - DELETE: `/api/{TENANT_ID}/items/:id` → 할 일 삭제
 * - POST: `/api/{TENANT_ID}/images/upload` → 이미지 업로드 처리
 *
 * 사용 컴포넌트:
 * - Header: 상단 헤더
 * - CheckItemDetail: 제목 및 완료 상태 입력 UI
 * - ImageUploadBox: 이미지 업로드 박스
 * - Memo: 메모 입력창
 * - Button: 공통 버튼 UI
 */

"use client";

import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import CheckItemDetail from "@/components/Detail/CheckItemDetail";
import ImageUploadBox from "@/components/Detail/ImageUploadBox";
import Memo from "@/components/Detail/Memo";
import instance from "@/utils/axios";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import { useRouter } from "next/navigation";

interface TodoItem {
  id: number;
  imageUrl: string | null;
  memo: string | null;
  tenantId: string;
  name: string;
  isCompleted: boolean;
}

export default function Detail() {
  const router = useRouter();
  const params = useParams();
  const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID;

  const [isFetched, setIsFetched] = useState(false);
  const [initialTodoItem, setInitialTodoItem] = useState<TodoItem | null>(null);
  const [todoItem, setTodoItem] = useState<TodoItem | null>(null);
  const [isEdited, setIsEdited] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isImgUploading, setIsImgUploading] = useState(false);

  const handleGetTodo = useCallback(async () => {
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
  }, [TENANT_ID, params.id]);

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
    if (!file) return;
    else if (isImgUploading) return;

    setIsImgUploading(true);
    const isEnglishOnly = /^[a-zA-Z0-9_\-. ]+$/.test(file.name);
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
    } finally {
      setIsImgUploading(false);
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
      router.push("/");
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
    } catch (err) {
      console.error("에러 발생:", err);
    } finally {
      setIsDeleting(false);
      alert("삭제되었습니다.");
      router.push("/");
    }
  };

  useEffect(() => {
    handleGetTodo();
  }, [handleGetTodo]);

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
                  isUploading={isImgUploading}
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

            <div className="w-full flex justify-end gap-4 pb-2">
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
