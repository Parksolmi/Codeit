/**
 * TaskSection 컴포넌트
 *
 * - "할 일(To-do)" 또는 "완료(Done)" 리스트를 보여주는 섹션
 * - 항목이 없을 경우(type별로) 일러스트와 안내 메시지를 보여줌
 * - 항목이 있는 경우 자식 요소(children)를 리스트로 렌더링
 *
 * @param type 섹션 유형 ("todo" | "done") — 보여줄 이미지 및 텍스트 스타일에 사용됨
 * @param isEmpty 항목이 비어있는지 여부 (true일 경우 빈 상태 UI 렌더링)
 * @param children 실제 할 일 항목 혹은 안내 메시지 노드
 */

import Image from "next/image";

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
      <Image
        src={labelImageSrc}
        width={80}
        height={80}
        alt={`${type} label`}
        className="absolute top-0 left-0 w-[80px]"
      />

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center text-center w-full mt-16">
          <Image
            src={imageSrc}
            width={160}
            height={160}
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
