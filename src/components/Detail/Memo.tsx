interface MemoProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Memo({ value, onChange }: MemoProps) {
  return (
    <div
      className={`
        flex flex-col items-center justify-center gap-4
        rounded-2xl w-full min-h-[250px] p-6
        bg-[url('/images/memo.png')] bg-no-repeat bg-top
        bg-[length:auto] bg-contain overflow-hidden
      `}
      style={{
        backgroundSize: "810px 350px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
      }}
    >
      <p className="font-bold text-sm mb-2 text-amber-800">Memo</p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-[150px] bg-transparent text-sm text-center resize-none outline-none pt-[45px] text-slate-800"
        placeholder="메모를 입력하세요"
      />
    </div>
  );
}
