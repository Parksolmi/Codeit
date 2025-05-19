/**
 * Header 컴포넌트
 *
 * - 로고 이미지를 포함하며, 클릭 시 홈('/')으로 이동
 * - 반응형 대응: 모바일에서는 텍스트 없는 이미지, 데스크탑에서는 텍스트 포함 로고를 렌더링
 *
 */

"use client";

export default function Header() {
  return (
    <header className="w-full border-b-[1px] bg-white border-b-slate-200">
      <div
        className="w-full max-w-[1000px] mx-auto px-4 py-[10px]"
        onClick={() => (window.location.href = "/")}
      >
        <picture>
          <source media="(max-width: 640px)" srcSet="/images/logo-img.png" />
          <img
            src="/images/logo-char.png"
            alt="Logo"
            className="w-[75px] sm:w-[151px]"
          />
        </picture>
      </div>
    </header>
  );
}
