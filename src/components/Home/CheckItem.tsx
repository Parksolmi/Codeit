/**
 * CheckItem 컴포넌트
 *
 * - 하나의 할 일 항목을 렌더링하는 컴포넌트
 * - 체크박스 버튼으로 완료 여부를 토글할 수 있으며,
 *   항목 텍스트 클릭 시 상세 페이지(`/[id]`)로 이동
 * - 로딩 중에는 체크박스가 비활성화되고 로딩 스피너가 표시
 *
 * @param id 할 일 항목의 고유 ID (라우팅 시 사용)
 * @param label 항목에 표시될 텍스트 내용
 * @param checked 체크 상태 (완료 여부)
 * @param onToggle 체크 상태를 변경할 때 실행되는 콜백
 * @param isLoading 토글 요청 중 여부 (로딩 스피너 표시 및 버튼 비활성화)
 */

"use client";

import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import Image from "next/image";

interface CheckItemProps {
  id: number;
  label: string;
  checked: boolean;
  onToggle: () => void;
  isLoading?: boolean;
}

export default function CheckItem({
  id,
  label,
  checked,
  onToggle,
  isLoading = false,
}: CheckItemProps) {
  const router = useRouter();

  return (
    <div
      className={`
        w-full h-[48px] flex items-center gap-4 px-3 py-3 rounded-full border-2 font-medium
        ${
          checked
            ? "bg-violet-100 border-slate-900"
            : "bg-white border-slate-900"
        }
        text-black
      `}
    >
      <button
        onClick={onToggle}
        disabled={isLoading}
        className={`
          w-7 h-7 rounded-full flex items-center justify-center border-2
          shrink-0
          ${checked ? "border-transparent" : "bg-[#FEFCE8] border-slate-900"}
          ${isLoading ? "opacity-50 pointer-events-none" : ""}
        `}
      >
        {isLoading ? (
          <ClipLoader color="#F43F5E" size={16} />
        ) : checked ? (
          <Image
            src="/images/checked-icon.svg"
            width={16}
            height={16}
            alt="체크됨"
            className="w-7 h-7"
          />
        ) : null}
      </button>

      <div
        onClick={() => router.push(`/${id}`)}
        className={`w-full text-sm font-normal text-slate-800 cursor-pointer ${
          checked ? "line-through" : ""
        }`}
      >
        {label}
      </div>
    </div>
  );
}
