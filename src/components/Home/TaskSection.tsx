interface TaskSectionProps {
  type: "todo" | "done";
  isEmpty: boolean;
  children: React.ReactNode;
}

export default function TaskSection({
  type,
  isEmpty,
  children,
}: TaskSectionProps) {
  const imageSrc =
    type === "todo" ? "/images/todo-img.png" : "/images/done-img.png";
  const labelImageSrc =
    type === "todo" ? "/images/todo-text.png" : "/images/done-text.png";

  return (
    <div className="relative w-full md:w-1/2 h-full flex flex-col items-start gap-4">
      <img
        src={labelImageSrc}
        alt={`${type} label`}
        className="absolute top-0 left-0 w-[80px]"
      />

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center text-center w-full mt-16">
          <img
            src={imageSrc}
            alt={`${type} illustration`}
            className="w-40 mb-4"
          />
          <div className="text-slate-400 text-sm">{children}</div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 mt-10 w-full">{children}</div>
      )}
    </div>
  );
}
