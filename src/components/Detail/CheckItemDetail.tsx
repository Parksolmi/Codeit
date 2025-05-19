/**
 * CheckItemDetail 컴포넌트
 *
 * 체크박스와 라벨 텍스트를 포함하는 할 일 아이템 UI
 * 완료 상태에 따라 스타일이 변경되며, 라벨 텍스트 수정 가능
 * 입력 필드는 입력 길이에 맞춰 자동으로 너비가 조절
 *
 * @param label 현재 표시될 텍스트 값
 * @param isCompleted 체크 완료 여부
 * @param handleCompleted 체크 상태 토글 함수
 * @param onLabelChange 입력된 텍스트 변경 핸들러
 */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface CheckItemDetailProps {
  label: string;
  isCompleted: boolean;
  handleCompleted: () => void;
  onLabelChange: (newLabel: string) => void;
}

export default function CheckItemDetail({
  label,
  isCompleted,
  handleCompleted,
  onLabelChange,
}: CheckItemDetailProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [inputWidth, setInputWidth] = useState("1ch");

  useEffect(() => {
    if (spanRef.current) {
      const width = spanRef.current.offsetWidth;
      setInputWidth(`${width + 8}px`);
    }
  }, [label]);

  return (
    <div
      className={`w-full flex justify-center items-center border-2 border-black rounded-[20px] py-3 px-4 ${
        isCompleted ? "bg-violet-200" : ""
      }`}
    >
      <div className="flex justify-center items-center gap-4 min-w-0">
        {isCompleted ? (
          <Image
            src="/images/checked-icon.svg"
            width={16}
            height={16}
            alt="체크됨"
            className="w-7 h-7"
            onClick={handleCompleted}
          />
        ) : (
          <div
            onClick={handleCompleted}
            className="w-7 h-7 rounded-full border-2 shrink-0 bg-[#FEFCE8] border-black"
          />
        )}

        <input
          type="text"
          value={label}
          onChange={(e) => onLabelChange(e.target.value)}
          className="bg-transparent border-none outline-none text-sm font-medium text-black underline w-fit"
          style={{ width: inputWidth }}
        />

        <span
          ref={spanRef}
          className="absolute opacity-0 whitespace-pre text-sm font-normal"
          style={{ pointerEvents: "none", visibility: "hidden" }}
        >
          {label || " "}
        </span>
      </div>
    </div>
  );
}
