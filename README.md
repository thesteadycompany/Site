# THE STEADY COMPANY

Hogumachu의 개인 블로그. 정제하지 않은 짧은 글을 기록하는 Garden을 운영합니다.

> https://thesteadycompany.github.io

## Vibe Coding

이 프로젝트는 **바이브 코딩(Vibe Coding)** 으로 만들어졌습니다.
AI 코딩 에이전트와 대화하며 설계부터 구현, 배포까지 진행했고,
[vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills)의 스킬들을 적극 활용했습니다.

### 사용한 Agent Skills

| Skill | 용도 |
|---|---|
| [react-best-practices](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices) | React/Next.js 성능 최적화 가이드 (57 rules) |
| [composition-patterns](https://github.com/vercel-labs/agent-skills/tree/main/skills/composition-patterns) | 컴포넌트 아키텍처 & 합성 패턴 |
| [web-design-guidelines](https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines) | 접근성, UX, 다크 모드 등 UI 품질 감사 |

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
│   ├── layout.tsx        # Root Layout (ThemeProvider)
│   └── globals.css       # 테마 변수, 타이포그래피
├── components/           # 공용 컴포넌트
├── content/garden/       # Markdown 글 (YAML frontmatter)
├── lib/articles.ts       # 마크다운 파싱 유틸
├── public/fonts/         # Pretendard woff2
├── .agents/skills/       # Agent Skills (Vercel)
└── .github/workflows/    # CI/CD
```

## Writing a New Article

`content/garden/` 에 마크다운 파일을 추가하면 빌드 시 자동으로 페이지가 생성됩니다.

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
