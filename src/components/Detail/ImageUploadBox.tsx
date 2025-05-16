// interface ImageUploadBoxProps {
//   onImageSelect: (file: File) => void;
// }

export default function ImageUploadBox() {
  // { onImageSelect }: ImageUploadBoxProps
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if (e.target.files && e.target.files[0]) {
    //   onImageSelect(e.target.files[0]);
    // }
  };

  return (
    <label className="w-full h-[250px] border-2 border-dashed rounded-2xl bg-slate-50 flex flex-col items-center justify-center gap-4 cursor-pointer relative">
      <img src="/images/upload-img.png" alt="Upload" className="w-12 h-12" />
      <input type="file" className="hidden" onChange={handleChange} />

      <div className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
        <img src="/images/plus-slate-icon.png" alt="추가" className="w-4 h-4" />
      </div>
    </label>
  );
}
