interface InputProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export default function Input({ value, onChange, placeholder }: InputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`
        w-full h-[48px] px-6 text-sm
        rounded-full border-2 border-slate-900
        bg-slate-100 outline-none
        placeholder:text-slate-400
        shadow-[4px_4px_0px_0px_#0F172A]
      `}
    />
  );
}
