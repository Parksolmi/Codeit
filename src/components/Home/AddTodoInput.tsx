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
