# Beer-market

이 프로젝트는 React v19.0.0, Vite, pnpm을 기반으로 구축된 모바일 웹 쇼핑몰입니다. scss을 사용하여 UI를 구성하고, 커스텀 훅을 통해 상태 관리를 구현했습니다.

---

## 📋 주요 기능

- **맥주 목록**: 더미 데이터 목록을 불러오고 담은 아이템을 장바구니에 저장(추가/삭제/수량 수정)
- **장바구니**: 저장된 장바구니 상태를 불러오고 담은 아이템들을 취소(삭제/수량 수정)

---

## 🛠️ 기술 스택

- **React**: v18.
- **Vite**: 빠르고 효율적인 빌드 도구
- **pnpm**: JavaScript 런타임
- **scss**: 변수, 중첩 규칙, 믹스인 등 css확장 버전
- **TypeScript**: 정적 타입 지원
- **React Router**: 라우팅 관리
- **Context API (useContext)**: 애플리케이션 전역에서 장바구니 상태를 공유 및 관리

---

## 📂 폴더 구조

```
beer-market/
├── public/
│   ├── api/             # api 파일 목록
│   │   ├── beer.json    # 개별 태그 항목을 표시하는 컴포넌트
│   │   └── tag.json     # 개별 맥주 항목을 표시하는 컴포넌트
├── src/
│   ├── components/      # 재사용 가능한 컴포넌트들
│   │   ├── cartitem.tsx # 장바구니 관리용 컴포넌트
│   │   └── header.tsx   # 헤더 컴포넌트
│   ├── pages/           # 페이지 목록
│   │   ├── cart.tsx     # 장바구니 페이지
│   │   └── home.tsx     # 아이템 목록 페이지
│   ├── router/          # 라우터 관련 설정
│   │   └── constants.ts # API URL 등 상수값 정의
│   ├── styles/          # 스타일 목록
│   │   └── global.scss  # 스타일 시트
│   ├── App.tsx          # 주요 컴포넌트(루트 컴포넌트)
│   └── main.tsx         # Vite로 애플리케이션을 렌더링하는 진입점
├── index.html           # 기본 HTML 템플릿
├── package.json         # 프로젝트 의존성 및 스크립트
└── tsconfig.json        # TypeScript 설정
```

---
