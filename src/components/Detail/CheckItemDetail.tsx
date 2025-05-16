interface CheckItemDetailProps {
  label: string | undefined;
  checked: boolean | undefined;
}

export default function CheckItemDetail({
  label,
  checked,
}: CheckItemDetailProps) {
  if (checked === undefined) return null;

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
          <div
            className={`
            w-7 h-7 rounded-full border-2 shrink-0 bg-[#FEFCE8] border-black
          `}
          />
        )}
        <span className="text-black underline text-sm">{label}</span>
      </div>
    </div>
  );
}
