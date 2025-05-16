import { SyncLoader } from "react-spinners";

interface ButtonProps {
  children?: React.ReactNode;
  bgColor?: string;
  textColor?: string;
  onClick?: () => void;
  active?: boolean;
  iconSrc?: string;
  isAdding?: boolean;
}

export default function Button({
  children,
  bgColor = "bg-slate-200",
  textColor = "text-black",
  onClick,
  active = false,
  iconSrc,
  isAdding = false,
}: ButtonProps) {
  const resolvedBgColor = active ? bgColor : "bg-slate-200";
  const textColorClass = active ? textColor : "text-black";
  const paddingClass = children ? "px-10 py-0" : "";

  return (
    <button
      onClick={onClick}
      className={`
        h-[48px]
        rounded-full font-semibold text-sm 
        ${resolvedBgColor} ${textColorClass} border-2 border-slate-900
        flex items-center justify-center gap-1 shadow-[2px_2px_0px_0px_#0F172A]
        ${paddingClass}
        whitespace-nowrap
      `}
    >
      {isAdding ? (
        <SyncLoader color="#ffffff" size={6} margin={2} />
      ) : (
        <>
          {iconSrc && (
            <img
              src={iconSrc}
              alt="아이콘"
              className={`w-4 h-4 ${!active ? "filter invert" : ""}`}
            />
          )}
          <span>{children}</span>
        </>
      )}
    </button>
  );
}
