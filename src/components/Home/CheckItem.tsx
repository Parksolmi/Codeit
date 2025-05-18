"use client";

import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

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
          <img
            src="/images/checked-icon.svg"
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
