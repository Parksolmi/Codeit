interface MemoProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Memo({ value, onChange }: MemoProps) {
  return (
    <div className="bg-yellow-50 rounded-2xl w-full p-6 min-h-[250px]">
      <p className="font-bold text-sm mb-2">Memo</p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-full bg-transparent text-sm text-center resize-none outline-none"
        placeholder="메모를 입력하세요"
      />
    </div>
  );
}
