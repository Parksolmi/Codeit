# 코드잇 

- [KDT 프론트엔드 단기심화] 지원자 과제

---

### 🛠 사용한 라이브러리

#### 📦 dependencies

- [`next`](https://nextjs.org/) `15.3.2` – React 기반의 서버 사이드 렌더링 프레임워크
- [`react`](https://reactjs.org/) `^19.0.0` – UI 라이브러리
- [`react-dom`](https://reactjs.org/docs/react-dom.html) `^19.0.0` – React DOM 렌더링
- [`axios`](https://axios-http.com/) `^1.9.0` – HTTP 클라이언트
- [`react-spinners`](https://www.davidhu.io/react-spinners/) `^0.17.0` – 로딩 스피너 UI 컴포넌트

#### 🛠 devDependencies

- [`typescript`](https://www.typescriptlang.org/) `^5` – 타입 안정성을 위한 언어
- [`tailwindcss`](https://tailwindcss.com/) `^3.4.17` – 유틸리티 기반 CSS 프레임워크
- [`eslint`](https://eslint.org/) `^9` – 코드 린팅 도구
- `@types/react`, `@types/node`, `@types/react-dom` – 타입 정의 파일
- `postcss`, `autoprefixer`, `eslint-config-next` – 스타일 전처리 및 ESLint 설정 도구

---

### 🔐 .env 환경변수 설정

> `.env` 파일은 `.gitignore`에 추가되어 있으며, 아래와 같은 환경 변수를 사용합니다.

```bash
NEXT_PUBLIC_API_BASE_URL=https://assignment-todolist-api.vercel.app
NEXT_PUBLIC_TENANT_ID=paka36
```
- `NEXT_PUBLIC_API_BASE_URL`: API 요청의 기본 도메인 주소
- `NEXT_PUBLIC_TENANT_ID`: 고유 테넌트 ID

