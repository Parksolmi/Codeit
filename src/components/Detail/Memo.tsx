/**
 * Memo 컴포넌트
 *
 * - 사용자가 메모를 입력할 수 있는 텍스트 영역 컴포넌트
 * - 배경 이미지(/images/memo.png)를 활용해 메모지 형태로 스타일링
 * - 외부에서 `value` 상태를 제어하는 controlled component
 *
 * @param value 현재 메모 textarea에 표시되는 값
 * @param onChange 사용자가 입력을 변경할 때 호출되는 콜백 (e.target.value 전달)
 */

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
        backgroundSize: "100% 350px",
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
