---
author: hogumachu
title: 바이브 코딩으로 블로그 사이트 만들기
subtitle: Oh My OpenCode로 2시간 만에 thevibecompany.github.io 찍어내기
date: 2026-01-20 22:40
tags: AI, Frontend, GPT, Productivity, VibeCoding
published: true
---

## 들어가며

리액트를 한 줄도 몰랐지만,<br>
그냥 “마크다운으로 블로그 만들고 싶다”는 욕심 하나로 시작했다.<br>
도구는 **Oh My OpenCode**, 모델은 **GPT**.<br>
결과는 `https://thevibecompany.github.io` 페이지이다.

---

## 세팅: 에이전트 한 줄로 끝

23줄짜리 `oh-my-opencode.json`만 정의했다.<br>

```json
{
  "$schema": "https://raw.githubusercontent.com/code-yeongyu/oh-my-opencode/master/assets/oh-my-opencode.schema.json",
  "agents": {
    "Sisyphus": { "model": "openai/gpt-5.1-codex-max" },
    "librarian": { "model": "openai/gpt-5.2-codex" },
    "explore": { "model": "openai/gpt-5.2-codex" },
    "frontend-ui-ux-engineer": { "model": "openai/gpt-5.2-codex" },
    "document-writer": { "model": "openai/gpt-5.2-codex-mini" },
    "multimodal-looker": { "model": "openai/gpt-5.2-codex-mini" }
  }
}
```

- 프로젝트 안 `.opencode/oh-my-opencode.json`, 홈 `~/.config/opencode/oh-my-opencode.json` 둘 다 읽는 구조라 경로만 맞추면 끝.
- 별도 SKILL 설정 없이도 기본 팀 구성이 바로 굴러간다.

---

## 1시간은 날렸다: 애매한 지시의 대가

“마크다운 블로그 만들고 싶다” 정도로 말했더니 흐릿하게 돌다 멈췄다.<br>
**명확한 요청이 없으면 에이전트도 헤맨다**는 걸 체감했다.

---

## 돌파구: 다른 사이트 HTML 뜯어보기

다른 사이트의 HTML과 클래스 이름을 콕 집어주니 즉시 개선됐다.

- “이 섹션 레이아웃을 그대로 써라”
- “버튼 클래스 `btn-primary` 톤만 살려라”
- “헤더는 sticky, 푸터는 단순하게”  

이렇게 **구체적인 구조 + 용도**를 주면 에이전트가 바로 반응한다.

---

## 2시간 만에 완성: 소스 코드는 손 안 댔다

- 마크다운 작성 → GitHub Pages 배포 → 기본 스타일링까지 자동.  
- React/Vite/Hugo 파이프라인도 알아서 맞춰줌 (공식 문서에서도 1.5h 사례가 있던 그 구조).  
- 나는 프롬프트만 던졌고, 로컬 코드는 거의 손대지 않았다.

---

## 배운 점

- **도메인 지식은 여전히 필요**: 리액트 문법을 몰라도 되지만, 원하는 레이아웃·톤을 설명할 언어는 필요.
- **구조를 먼저, 구현은 에이전트에**: 섹션 구획, 클래스 역할을 먼저 정의하면 수정 비용이 급감.
- **병렬 작업 활용**: librarian/explore를 병렬로 돌리면 참고 예시와 코드 위치를 빠르게 얻을 수 있다.

---

## 다음엔 이렇게 할 것

1. 시작 프롬프트에 **사이트 맵**과 **섹션별 톤**을 바로 넣는다.  
2. 예시 HTML/CSS 조각을 함께 주어 “이 느낌”을 초반에 못 박는다.  
3. 프론트엔드 용어 몇 개만 미리 정리해둔다 (hero, CTA, grid, gutter 등).  

---

## 마치며

프론트엔드 지식이 없어도 **명확한 디렉션**만 있다면 결과물을 뽑아낼 수 있다는 걸 확인했다.<br>
하지만 프로덕션급 퀄리티를 내려면, 최소한의 언어와 맥락을 아는 사람이 **품질을 통제**해야 한다.<br>
AI는 손이고, 방향은 사람이 쥔다. 이번엔 그 감각을 조금 더 얻어갔다.
