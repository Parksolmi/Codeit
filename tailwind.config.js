/**
 * Tailwind CSS 설정 파일
 *
 * - 프로젝트의 전역 스타일 구성 및 커스터마이징을 정의
 * - 폰트, 색상 팔레트, 파일 경로 지정 등을 포함
 */

module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nanum: ["NanumSquareNeo", "sans-serif"],
      },
      colors: {
        slate: {
          900: "#0F172A",
          800: "#1E293B",
          500: "#64748B",
          400: "#94A3B8",
          300: "#CBD5E1",
          200: "#E2E8F0",
          100: "#F1F5F9",
        },
        violet: {
          600: "#7C3AED",
          200: "#DDD6FE",
          100: "#EDE9FE",
        },
        rose: {
          500: "#F43F5E",
        },
        lime: {
          300: "#BEF264",
        },
        amber: {
          800: "#92400E",
        },
      },
    },
  },
  plugins: [],
};
