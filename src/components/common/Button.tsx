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
