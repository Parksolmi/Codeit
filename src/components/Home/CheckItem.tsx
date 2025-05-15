import { ClipLoader } from "react-spinners";

interface CheckItemProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
  isLoading?: boolean;
}

export default function CheckItem({
  label,
  checked,
  onToggle,
  isLoading = false,
}: CheckItemProps) {
  return (
    <button
      onClick={onToggle}
      disabled={isLoading}
      className={`
        w-full h-[48px] flex items-center gap-4 px-3 py-3 rounded-full border-2 font-medium
        ${
          checked
            ? "bg-violet-100  border-slate-900"
            : "bg-white border-slate-900"
        }
        text-black
        ${isLoading ? "opacity-50 pointer-events-none" : ""}
      `}
    >
      <div
        className={`
          w-6 h-6 rounded-full flex items-center justify-center border-2
          ${
            checked
              ? "bg-violet-600 border-transparent"
              : "bg-[#FAF9EC] border-slate-900"
          }
        `}
      >
        {isLoading ? (
          <ClipLoader color="#F43F5E" size={20} />
        ) : checked ? (
          <img
            src="/images/checked-icon.svg"
            alt="체크됨"
            className="w-4 h-4"
          />
        ) : null}
      </div>

      <span
        className={`text-sm text-slate-800 ${checked ? "line-through" : ""}`}
      >
        {label}
      </span>
    </button>
  );
}
