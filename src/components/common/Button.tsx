/**
* 공통 Button 컴포넌트
* 기본 버튼 또는 제출용 버튼 등 다양한 타입을 지원
* 아이콘, 로딩 스피너, 텍스트 반전 등 커스터마이징이 가능

* @param type 버튼의 HTML 타입 (button, submit, reset) - 기본값: undefined
* @param children 버튼 내부에 표시될 텍스트 또는 노드
* @param bgColor 활성 상태일 때 배경색 클래스 (Tailwind) - 기본값: bg-slate-200
* @param textColor 텍스트 색상 클래스 (Tailwind) - 기본값: text-black
* @param onClick 버튼 클릭 시 실행될 함수
* @param active 버튼이 활성 상태인지 여부 (true일 경우 bgColor 적용)
* @param iconSrc 아이콘 이미지 경로 (왼쪽 아이콘으로 렌더링됨)
* @param isLoading 로딩 중 여부 (로딩 스피너 표시 및 내용 비가시화)
* @param textInvert true일 경우 텍스트/아이콘에 filter invert 적용 (주로 어두운 배경에 사용)
*/

import Image from "next/image";
import { SyncLoader } from "react-spinners";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
  bgColor?: string;
  textColor?: string;
  onClick?: () => void;
  active?: boolean;
  iconSrc?: string;
  isLoading?: boolean;
  textInvert?: boolean;
}

export default function Button({
  type,
  children,
  bgColor = "bg-slate-200",
  textColor = "text-black",
  onClick,
  active = false,
  iconSrc,
  isLoading = false,
  textInvert = false,
}: ButtonProps) {
  const resolvedBgColor = active ? bgColor : "bg-slate-200";
  const paddingClass = children ? "px-10 py-0" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        h-[48px]
        min-w-[120px]
        rounded-full font-medium text-sm 
        ${resolvedBgColor} ${textColor} border-2 border-slate-900
        flex items-center justify-center gap-1 shadow-[2px_2px_0px_0px_#0F172A]
        ${paddingClass}
        whitespace-nowrap
      `}
    >
      {isLoading && (
        <div className="absolute">
          <SyncLoader color="#ffffff" size={6} margin={2} />
        </div>
      )}

      <div
        className={`
      h-full flex items-center justify-center gap-1
      ${isLoading ? "invisible" : ""}
    `}
      >
        {iconSrc && (
          <Image
            src={iconSrc}
            alt="아이콘"
            width={16}
            height={16}
            className={`w-4 h-4 ${
              textInvert && !active ? "filter invert" : ""
            }`}
          />
        )}
        <span className={textInvert && active ? "filter invert" : ""}>
          {children}
        </span>
      </div>
    </button>
  );
}
