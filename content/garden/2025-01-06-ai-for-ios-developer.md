---
author: hogumachu
title: AI에 대한 개인적인 생각
subtitle: Cursor? Claude? 어떤 것이 좋을까?
coverImage: /images/covers/2025-01-06-ai-for-ios-developer-cover.jpg
date: 2025-01-06 21:00
tags: iOS, AI
published: true
---

## 들어가며

Xcode를 사용하면 AI 활용이 꽤 제한적이에요.\
Xcode 26부터 Claude와 GPT를 연동할 수 있는 기능이 추가되었는데, 아직은 썩 만족스럽지 않아요.

평소에 GUI를 자주 쓰다 보니 터미널이 익숙하지 않았고,\
그래서 Claude도 처음에는 정이 가지 않았어요.

---

## Cursor를 선택한 이유

일단 Cursor를 먼저 사용해봤어요.\
IDE에 연동되어 있고, Flutter 개발할 때 VSCode를 써본 경험이 있어서 익숙했거든요.\
Sweetpad으로 빌드도 되고 왠만한 건 다 할 수 있었는데, 이상하게 불편한 점이 있었어요.

- OSLog를 사용하면 터미널에 정상적으로 출력되지 않는 문제 (print는 정상 작동)
- Xcode와 다르게 마지막 줄 개행이 안 돼서, IDE를 스위칭할 때마다 변경사항이 생기는 문제

---

## Claude와 비교해보면

Claude를 깊게 사용하진 않았지만, Cursor의 장점 중 하나인 `@File.swift` 같은 파일 접근 자동 완성을 지원하지 않아요.\
반면 Claude는 IDE에 종속되지 않는다는 장점이 있어요.\
Cursor는 VSCode에 묶여 있지만, Claude는 터미널 기반이라 활용도가 더 넓다고 느꼈어요.

---

## 마치며

이전에는 Cursor의 자동 완성과 테스트 코드 작성 기능을 주로 활용했어요.\
지금은 Claude에 요구사항을 알려준 뒤 코드를 생성하고, 오류가 나거나 생각과 다를 때 룰을 추가해서 해결하고 있어요.

완전한 바이브 코딩은 아직이지만, 점차 영역을 확장하고 있어요.
