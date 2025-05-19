/**
 * Input 컴포넌트
 *
 * - 텍스트 입력을 위한 공통 컴포넌트
 * - 외부에서 value 상태를 제어하는 controlled component
 *
 * @param value 현재 input 필드에 표시되는 값
 * @param placeholder 입력 필드에 표시될 안내 문구 (선택)
 * @param onChange 입력값이 변경될 때 호출되는 콜백 (e.target.value가 인자로 전달됨)
 */

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
