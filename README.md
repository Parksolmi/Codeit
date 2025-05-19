# 코드잇 

- [KDT 프론트엔드 단기심화] 지원자 과제

---

## 📘 프로젝트 설명
이 프로젝트는 **코드잇 KDT 프론트엔드 단기심화 과정**의 사전 과제로 제작된 **투두 리스트 웹 애플리케이션**입니다.

- **Next.js** 기반으로 제작되었으며, 할 일 추가, 완료 처리, 수정, 삭제 등 기본적인 기능을 제공합니다.
- 공통으로 사용하는 UI 요소는 **공용 컴포넌트**로 분리하고, 각 화면에 특화된 로직은 **페이지별 컴포넌트**로 나누어 구성함으로써 유지보수성과 재사용성을 높였습니다.
- **axios**를 활용해 API와 통신하고, **tailwindcss**로 반응형 UI를 구성했습니다.
- **react-spinners**를 통해 로딩 상태에서 사용자 경험을 개선했습니다.
- 전체 프로젝트는 **TypeScript** 기반으로 개발되어, 더 높은 안정성과 개발자 경험을 제공합니다.

  
---

### 📋 주요 기능
- 할 일 목록 조회
- 새로운 할 일 추가
- 할 일 완료 상태 토글
- 기존 할 일에 메모 및 이미지 업로드 추가
- 기존 할 일 수정
- 기존 할 일 삭제
- API 통신 시 로딩 상태 표시

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

---

### 💡 사용 방법
1. .env 파일 생성
   .env 파일을 루트 경로에 생성하고 아래 값을 입력합니다:
  ```bash
  NEXT_PUBLIC_API_BASE_URL=https://assignment-todolist-api.vercel.app
  NEXT_PUBLIC_TENANT_ID=paka36
  ```

2. 의존성 설치
```bash
npm install
```

3. 개발 서버 실행
```bash
npm run dev
```

4. 웹사이트 접속
브라우저에서 http://localhost:3000에 접속하여 투두 리스트를 확인하고 조작할 수 있습니다.

---

### 🚀 Vercel로 배포
- https://codeit-todo-two.vercel.app/
