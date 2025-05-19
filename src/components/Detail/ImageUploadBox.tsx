/**
 * ImageUploadBox 컴포넌트
 *
 * - 사용자가 이미지를 업로드하거나 수정할 수 있는 UI 컴포넌트
 * - 업로드된 이미지가 있을 경우 미리보기를 보여주며, 없을 경우 기본 아이콘을 보여줌
 * - 로딩 상태일 경우 업로드 중임을 나타내는 스피너 오버레이가 표시
 *
 * @param imageUrl 업로드된 이미지 URL (null 또는 undefined인 경우 placeholder 렌더링)
 * @param isUploading 업로드 중 여부 (로딩 스피너 표시용)
 * @param onImageSelect 파일이 선택될 때 호출되는 콜백 함수 (선택된 File 객체를 인자로 전달)
 */

import { ClipLoader } from "react-spinners";
import Image from "next/image";

interface ImageUploadBoxProps {
  imageUrl: string | null | undefined;
  isUploading?: boolean;
  onImageSelect: (file: File) => void;
}

export default function ImageUploadBox({
  imageUrl,
  isUploading = false,
  onImageSelect,
}: ImageUploadBoxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelect(e.target.files[0]);
    }
  };

  return (
    <label className="w-full h-[250px] bg-slate-50 flex flex-col items-center justify-center gap-4 cursor-pointer relative">
      {imageUrl ? (
        <>
          <Image
            src={imageUrl}
            width={250}
            height={250}
            alt="Uploaded"
            className="w-full h-full object-cover rounded-2xl border-none"
          />
          <div className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-[#0F172A]/50 border-2 border-[#0F172A] flex items-center justify-center">
            <Image src="/images/edit.png" alt="수정" className="w-4 h-4" />
          </div>
        </>
      ) : (
        <>
          <div className="border-2 border-dashed rounded-2xl w-full h-full flex items-center justify-center">
            <Image
              src="/images/upload-img.png"
              width={100}
              height={100}
              alt="Upload"
              className="w-12 h-12"
            />
          </div>
          <div className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
            <Image
              src="/images/plus-slate-icon.png"
              width={16}
              height={16}
              alt="추가"
              className="w-4 h-4"
            />
          </div>
        </>
      )}

      {isUploading && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-2xl z-10">
          <ClipLoader color="#ffffff" size={32} />
        </div>
      )}

      <input type="file" className="hidden" onChange={handleChange} />
    </label>
  );
}
