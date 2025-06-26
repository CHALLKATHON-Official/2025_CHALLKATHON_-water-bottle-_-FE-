# 🧑‍💻 WebSelf


**WebSelf**는 사용자의 브라우저 방문 기록을 분석하여,  
**언제, 어떤 사이트에 얼마나 자주 접속했는지**를 시각적으로 보여주는 웹 서비스입니다.  
회원가입 없이 쿠키 기반으로 개인 데이터를 분석하며,  
**전 세계 사용자들의 평균 사용 패턴과 비교**할 수 있는 기능도 제공합니다.


---

## ✨ 주요 기능

- ⏱ **웹 사용 시간 시각화**: 시간대별/요일별 사용 그래프 제공  
- 🌍 **전 세계 평균과 비교**: 다른 사용자들의 웹 사용 패턴과 비교  
- 🔒 **비회원 기반 분석**: 쿠키 기반의 가벼운 개인화 분석  
- 📊 **도메인별 요약**: 가장 많이 방문한 사이트 목록 제공
  
---

## 📁 파일 구조

| Frontend | Backend |
|----------|---------|
| Frontend | Backend |
| WebSelf/<br>│  ├── components/ &nbsp;&nbsp;&nbsp;&nbsp;# UI 재사용 컴포넌트 <br>│  ├── layouts/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# 페이지 레이아웃 컴포넌트 <br>│  ├── pages/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# 라우팅되는 각 페이지 <br>│  ├── public/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# 정적 자산 디렉토리 <br>│  └── src/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# 소스 루트 <br>├── index.html &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# 진입 HTML <br>├── package.json &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# 프론트 의존성 정의 <br>├── tailwind.config.js &nbsp;# Tailwind 설정 <br>├── tsconfig.json &nbsp;&nbsp;&nbsp;&nbsp;# TypeScript 설정 <br>└── vite.config.ts &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Vite 설정 | Server/ <br>├── node_modules/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# 의존성 모듈 <br>├── utils/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# 서버 내부 유틸 <br>│&nbsp;&nbsp;&nbsp;&nbsp;  └── siteCategory.js &nbsp;&nbsp;&nbsp;&nbsp;# 카테고리 분류 <br>├── 2025_CHALLKATHON_-water-... &nbsp;&nbsp;# 참고 문서 <br>├── dbconfig.js &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# DB 설정 <br>├── .gitignore <br>├── server.js &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# 메인 서버 실행 <br>├── package.json <br>└── package-lock.json <br><br>WebSelf-extension/ &nbsp;&nbsp;&nbsp;&nbsp;# 크롬 확장 기능 <br>├── background.js <br>├── content_script.js <br>├── icon.png <br>├── manifest.json <br>├── package.json <br>└── package-lock.json <br><br>dataprocess/ &nbsp;&nbsp;&nbsp;&nbsp;# 파이썬 기반 데이터 분석기 <br>├── CurrAnalyze.py &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# 현재 분석 <br>├── PastAnalyze.py &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# 과거 분석 <br>└── DataAnalyze.py &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# 날짜별 분석 |







---

## 🛠️ Tech Stack

| Frontend | Backend |배포 | 
|----------|---------|---------|
| React + Vite<br>TypeScript<br>Tailwind CSS | _Node(express.js)_ <br> Python | Vercel |

---

##   👨‍💻 개발팀 -water-bottle-

| 주보경 | 구태호 | 민지홍 | 이재우 |
|----------|---------|----------|---------|
|프론트엔드 개발자|백엔드/익스텐션 개발자|데이터 엔지니어|디자이너|
|React 기반 UI/UX 설계 및 반응형 웹 구현을 담당했습니다. 사용자 경험을 최우선으로 생각하며, 직관적이고 아름다운인터페이스를 구현하기 위해 노력했습니다. 최신 프론트엔드 기술과 디자인 트렌드를 적극 활용하여 사용자 친화적인 웹애플리케이션을 개발했습니다.|express.js 서버/API 및 ChromeExtension 개발을 담당했습니다. 또한React 기반 프론트 요소 시각화 구현에도 참여하여 프론트엔드와 백엔드 간의원활한 통합을 이끌었습니다. 안정적이고 확장 가능한 백엔드 시스템을 구축하여 서비스의 기반을 마련했습니다. 배포작업을 통해 사용자들이 이용가능하도록만들었습니다.|Python 기반 분석 파이프라인 개발을 담당했습니다. 복잡한 사용자 데이터를 의미 있는 인사이트로 변환하는 알고리즘을 설계하고 구현했습니다. 데이터 마이닝과 기계학습 기법을 활용하여 사용자의 웹 사용 패턴을 효과적으로 분석하고시각화했습니다.|와이어프레임 및 UI 리소스 제작을 담당했습니다. 사용자 중심의 디자인 철학을바탕으로 직관적이고 아름다운 인터페이스를 설계했습니다. 복잡한 데이터 시각화를 이해하기 쉽고 매력적인 형태로 표현하기 위한 디자인 요소를 개발했습니다.|


---


📌 WebSelf 개인정보 처리방침 (Privacy Policy)

이 확장 프로그램은 사용자의 웹사이트 방문 기록, 체류 시간 등의 정보를 익명으로 수집합니다.
수집된 정보는 사용자의 생산성 분석 및 통계 목적으로만 사용되며, 개인을 식별할 수 있는 정보는 저장하지 않습니다.

수집 항목:
- 방문한 사이트의 도메인
- 방문 횟수 및 체류 시간
- 브라우저 내 익명 사용자 ID

수집된 데이터는 다음 목적에만 사용됩니다:
- 개인의 웹 사용 패턴 분석
- 서버 전송을 통한 익명 통계 저장
- 시간 관리에 도움을 주는 시각화 제공

데이터 보관 및 전송:
- 수집된 정보는 안전한 서버에 익명으로 전송됩니다.
- 사용자는 언제든지 확장 프로그램을 제거하여 데이터 수집을 중단할 수 있습니다.

---

📌 Privacy Policy (English)

This extension collects anonymized data on users' website visits and dwell times.
No personally identifiable information (PII) is stored or transmitted.

Collected data:
- Visited site domains
- Visit counts and duration
- Anonymous user ID (stored locally)

Purpose of use:
- Analyze usage patterns
- Submit anonymized stats to server
- Visualize time usage for productivity

Data is stored and transmitted securely.
You may uninstall the extension at any time to stop data collection.

