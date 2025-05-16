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
