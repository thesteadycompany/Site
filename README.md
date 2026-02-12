# THE STEADY COMPANY

Hogumachu의 개인 블로그. 짧은 실험 노트는 Garden, 정제된 장문은 Article로 분리해 운영합니다.

> https://thesteadycompany.github.io

## Vibe Coding

이 프로젝트는 **바이브 코딩(Vibe Coding)** 으로 만들어졌습니다.
AI 코딩 에이전트와 대화하며 설계부터 구현, 배포까지 진행했고,
[vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills)의 스킬들을 적극 활용했습니다.

### 사용 중인 Agent Skills

**개발 (Vercel)** — [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills)

| Skill | 용도 |
|---|---|
| react-best-practices | React/Next.js 성능 최적화 (57 rules) |
| composition-patterns | 컴포넌트 아키텍처 & 합성 패턴 |
| web-design-guidelines | 접근성, UX, 다크 모드 등 UI 품질 감사 |

**마케팅·콘텐츠 (Marketing)** — [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills)

| Skill | 용도 |
|---|---|
| content-strategy | 콘텐츠 전략, 주제 선정, 캘린더 |
| copy-editing | 글 퇴고, 가독성 개선 |
| copywriting | 메타/OG 문구, 짧은 카피 |
| page-cro | 페이지 전환·구성 최적화 |
| programmatic-seo | SEO 자동화, URL/메타 패턴 |
| analytics-tracking | GA/GTM 등 트래킹 설정 |
| marketing-psychology | 독자 참여·심리 원칙 |

**기술 블로그 작성** — [skill-zero/s](https://github.com/skill-zero/s)

| Skill | 용도 |
|---|---|
| technical-blog-writing | 기술 블로그 글쓰기 가이드 |

## Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Static Export) |
| Language | [TypeScript 5](https://www.typescriptlang.org) |
| UI | [React 19](https://react.dev) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| Font | [Pretendard](https://cactus.tistory.com/306) (self-hosted woff2) |
| Markdown | [react-markdown](https://github.com/remarkjs/react-markdown) + remark-gfm + rehype-highlight |
| Theme | [next-themes](https://github.com/pacocoursey/next-themes) (Light / Dark / System) |
| Deploy | GitHub Actions -> GitHub Pages |

## Getting Started

```bash
npm install
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

## Build & Deploy

```bash
npm run build   # out/ 디렉토리에 정적 파일 생성
```

`main` 브랜치에 push하면 GitHub Actions가 자동으로 빌드 후
[thesteadycompany.github.io](https://thesteadycompany.github.io) 에 배포합니다.

## Project Structure

```
.
├── app/                  # Next.js App Router 페이지
│   ├── page.tsx          # Home
│   ├── garden/
│   │   ├── page.tsx      # Garden 목록
│   │   └── [slug]/
│   │       └── page.tsx  # 개별 글
│   ├── article/
│   │   ├── page.tsx      # Article 목록
│   │   └── [slug]/
│   │       └── page.tsx  # 개별 글
│   ├── layout.tsx        # Root Layout (ThemeProvider)
│   └── globals.css       # 테마 변수, 타이포그래피
├── components/           # 공용 컴포넌트
├── content/garden/       # Garden Markdown 글 (coverImage 필수)
├── content/article/      # Article Markdown 글 (coverImage 선택)
├── lib/articles.ts       # 마크다운 파싱 유틸
├── lib/personal-articles.ts
├── public/fonts/         # Pretendard woff2
├── .agents/skills/       # Agent Skills (Vercel)
└── .github/workflows/    # CI/CD
```

## Writing Content

### Garden (`content/garden`)

`content/garden/` 에 마크다운 파일을 추가하면 빌드 시 자동으로 페이지가 생성됩니다.
**커버 이미지 생성은 필수 단계**입니다. 본문 작성 후 `content/garden/_cover-image-workflow.md`를 따라
`public/images/covers/{slug}-cover.jpg`를 생성하고 frontmatter `coverImage`를 설정하세요.

```markdown
---
author: hogumachu
title: 글 제목
subtitle: 부제목
coverImage: /images/covers/{slug}-cover.jpg
date: 2026-02-12 21:00
tags: Tag1, Tag2
published: true
---

본문 내용...
```

작성 템플릿은 `content/garden/_article-template.md` 에 있습니다.

### Article (`content/article`)

`content/article/` 는 장문 아카이브 섹션입니다. `coverImage`는 선택 항목이며 생략해도 페이지가 생성됩니다.

```markdown
---
author: hogumachu
title: 글 제목
subtitle: 부제목
date: 2026-02-12 21:00
tags: Tag1, Tag2
published: true
---

본문 내용...
```

## Cover Image Workflow

`baoyu-cover-image` 스킬 기반으로 16:9 커버 이미지를 생성합니다.

- 스타일 가드레일: `content/garden/_cover-style.md`
- 생성 프로토콜: `content/garden/_cover-image-workflow.md`
- 기본 fallback 이미지: `public/images/covers/default-cover.jpg`
- 스타일 앵커: `public/images/covers/references/`

설치(완료 시 Codex 재시작 권장):

```bash
npx skills add https://github.com/jimliu/baoyu-skills --skill baoyu-cover-image -y -g
```

## License

MIT
