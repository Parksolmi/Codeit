/**
 * AddTodoInput 컴포넌트
 *
 * - 할 일을 입력하고 제출할 수 있는 인풋 + 버튼 조합 컴포넌트
 * - 내부적으로 input 상태를 관리하며, Enter 키나 버튼 클릭 시 제출
 * - 부모로부터 전달받은 onSubmit 콜백으로 입력된 텍스트를 전달
 *
 * @param onSubmit 입력된 할 일 텍스트를 전달받아 처리하는 콜백 함수
 * @param isSubmitting 할 일 등록 중인지 여부 (중복 제출 방지 및 로딩 표시용)
 */

import React, { useState } from "react";
import Input from "@/components/common/Input";
import Button from "../common/Button";

interface AddTodoInputProps {
  onSubmit: (value: string) => void;
  isSubmitting?: boolean;
}

export default function AddTodoInput({
  onSubmit,
  isSubmitting = false,
}: AddTodoInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = inputValue.trim();
    if (!trimmed || isSubmitting) return;

    onSubmit(trimmed);
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex gap-4">
      <Input
        value={inputValue}
        onChange={setInputValue}
        placeholder="할 일을 입력해주세요"
      />
      <Button
        type="submit"
        active={inputValue.trim().length > 0}
        bgColor="bg-violet-600"
        textColor="text-slate-900"
        iconSrc="/images/plus-icon.svg"
        isLoading={isSubmitting}
        textInvert={true}
      >
        추가하기
      </Button>
    </form>
  );
}
