interface InputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Input({ value, onChange }: InputProps) {
  return (
    <div className="relative w-[1000px] h-[56px]">
      <img
        src="/images/input.png"
        alt="Input Background"
        className="w-full h-full rounded-full"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="할 일을 입력해주세요"
        className="absolute top-0 left-0 w-full h-full bg-transparent outline-none px-6 text-sm"
      />
    </div>
  );
}
