interface CheckItemDetailProps {
  label: string;
  checked: boolean;
  onLabelChange: (newLabel: string) => void;
}

export default function CheckItemDetail({
  label,
  checked,
  onLabelChange,
}: CheckItemDetailProps) {
  return (
    <div
      className={`
        w-full flex justify-center items-center border-2 border-black rounded-[20px] py-3 px-4 
        ${checked ? "bg-violet-200" : ""}
      `}
    >
      <div className="w-full flex justify-center items-center gap-4">
        {checked ? (
          <img
            src="/images/checked-icon.svg"
            alt="체크됨"
            className="w-7 h-7"
          />
        ) : (
          <div className="w-7 h-7 rounded-full border-2 shrink-0 bg-[#FEFCE8] border-black" />
        )}
        <input
          type="text"
          value={label}
          onChange={(e) => onLabelChange(e.target.value)}
          className="bg-transparent border-none outline-none text-sm text-black underline"
          style={{ width: `${label.length || 1}ch` }}
        />
      </div>
    </div>
  );
}
