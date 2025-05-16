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
    <label className="w-[250px] h-[250px] border-2 border-dashed rounded-2xl bg-slate-50 flex flex-col items-center justify-center gap-4 cursor-pointer">
      <img
        src="/images/upload-placeholder.svg"
        alt="Upload"
        className="w-8 h-8"
      />
      <input type="file" className="hidden" onChange={handleChange} />
    </label>
  );
}
