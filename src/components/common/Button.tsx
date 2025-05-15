interface ButtonProps {
  children?: React.ReactNode;
  bgColor?: string;
  size?: "default" | "sm";
  onClick?: () => void;
  active?: boolean;
}

export default function Button({
  children,
  bgColor = "bg-slate-200",
  size = "default",
  onClick,
  active = false,
}: ButtonProps) {
  const resolvedBgColor = active ? bgColor : "bg-slate-200";
  const textColorClass = active ? "text-white" : "text-black";
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
      {children}
    </button>
  );
}
