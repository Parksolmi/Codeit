interface EmptyProps {
  type: "todo" | "done";
  children: React.ReactNode;
}

export default function Empty({ type, children }: EmptyProps) {
  const imageSrc =
    type === "todo" ? "/images/todo-img.png" : "/images/done-img.png";
  const labelImageSrc =
    type === "todo" ? "/images/todo-text.png" : "/images/done-text.png";

  return (
    <div className="relative w-1/2 flex flex-col items-center justify-center text-center px-4">
      <img
        src={labelImageSrc}
        alt={`${type} label`}
        className="absolute top-0 left-0 w-[80px]"
      />
      <img
        src={imageSrc}
        alt={`${type} illustration`}
        className="w-40 mb-4 mt-16"
      />
      <div className="text-slate-400 text-sm">{children}</div>
    </div>
  );
}
