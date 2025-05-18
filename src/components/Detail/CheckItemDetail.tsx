import { useEffect, useRef, useState } from "react";

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
          <img
            src="/images/checked-icon.svg"
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
          className="bg-transparent border-none outline-none text-sm text-black underline w-fit"
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
