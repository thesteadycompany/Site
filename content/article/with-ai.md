---
author: hogumachu
title: 꾸준하게 하기
subtitle: AI를 열심히 활용해보자
date: 2026-01-30 22:00
tags: iOS, AI
coverImage: /images/covers/with-ai-cover.jpg
published: true
---

# 꾸준하게 하기

## 가볍게

2025년에는 블로그 글을 거의 쓰지 못했다.
어느 정도 핑계이긴 하지만, 글을 각 잡고 쓰는 게 너무 어려웠다.
소재도 좋아야 하고, 이를 위한 사전 조사도 해야 하고... 생각보다 챙길 게 많았다.

그래서 2026년에는 일단 글을 마구마구 쓰기로 했다.
[그냥 꾸준하게 쓰는 블로그](https://thesteadycompany.github.io/)에서 조금 가볍게 글을 쓰고 있다.

## AI와 함께
개발뿐만 아니라 블로그도 AI와 함께하니 정말 편했다.
물론 `AGENTS`나 `SKILL`을 만들어 글쓰기를 규격화해두진 않았다.
그냥 최근에 올린 글 3개 정도를 넘겨주고, 비슷한 톤으로 써달라고 부탁한다.
가볍게 쓰기로 마음먹고 나니, 자그마치 13개의 글을 쓸 수 있었다.

---

## 개발도 AI와 하기
[기기 없이 앱을 테스트하는 법, 멀티버스가 알려드립니다](https://tech.kakaopay.com/post/multiverse/)라는 글을 보았다.
이에 대한 내용은 [여기](https://thesteadycompany.github.io/Garden/2026-01-24-multiverse-inspired-simulator-tool/)에 적어두었다.

그래서 비슷한 방향으로 [TheDriver](https://github.com/thesteadycompany/TheDriver)라는 앱을 만들고 있다.
운 좋게도 [oh-my-opencode](https://github.com/code-yeongyu/oh-my-opencode) `3.0.0`이 릴리즈되면서 초기 프로젝트 세팅이 정말 간편해졌다.
클로드는 가격이 부담돼서 개인 용도로는 `OpenAI`의 `Codex`를 쓰고 있는데, 제법 만족스럽다.

---

## AI가 바꾼 것들
TheDriver를 만들면서 `Process`나 시뮬레이터 같은 걸 건드리는 일은 꽤 어려울 거라고 생각했다.
불가능한 건 아니지만, 검색에 꽤 많은 에너지를 쏟아야 할 줄 알았다. 그런데 지금은 AI에게 잘 설명하면 된다.

새로운 언어를 배우는 것도 훨씬 쉬워졌다.
리액트를 해본 적은 없지만, Cursor로 강의 몇 개를 보다 보면 자연스럽게 코드가 작성된다.
오히려 더 중요해진 건 아키텍처를 어떻게 할지, 디렉터리를 어떻게 잡을지, 컨벤션을 어떻게 가져갈지 같은 것들이다.
개별 구현 디테일보다, 방향을 잡고 검증하는 일이 더 중요해졌다.
결국 견고한 테스트 케이스를 잘 짜고, 성능이 의심된다면 성능을 검증할 수 있는 프롬프트를 잘 작성하는 게 중요해졌다.

예전엔 소스 코드가 자산이라고 생각했는데, 요즘은 `AGENTS`나 `SKILL` 같은 프롬프트가 자산인 것 같다.
수개월 동안 서비스를 만들며 시행착오를 거쳐 다듬은 프롬프트는 이제 정말 중요한 자산이 됐다.

---

## 결국에는
이제 iOS, Android, Frontend, Backend 같은 역할 구분이 예전만큼 중요하진 않은 것 같다.
결국 다 Product Engineer로 수렴하는 게 아닌가 싶다.

여러 회사에서 Product Engineer로 역할을 정리하는 흐름도 보이고,
[마켓컬리](https://helloworld.kurly.com/)도 바이브 코딩이나 프롬프트 등 AI 관련 아티클의 비중이 큰 걸 보면, 이제는 실험 단계를 넘어선 것 같다. 조금이라도 방심하면 도태되는 느낌이다.
