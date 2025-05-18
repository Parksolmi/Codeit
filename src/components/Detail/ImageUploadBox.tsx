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
