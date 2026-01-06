---
author: hogumachu
title: AI에 대한 개인적인 생각
subtitle: Cursor? Claude? 어떤 것이 좋을까?
date: 2025-01-06 21:00
tags: iOS, AI
published: true
---

## iOS 개발자의 AI 활용
Xcode를 사용하면 AI에 대해 꽤 제한적이다.<br>
Xcode 26부터 Claude와 GPT를 연동할 수 있는 기능이 추가되었는데 썩 좋지 못하다.

GUI를 자주 사용하다보니 터미널에는 친숙하지 않아 Claude도 정감이 가지 않았다.

## 선택
일단 Cursor를 사용했다.<br>
IDE에 연동되어있고, Flutter를 개발할 때 VSCode를 사용한 경험이 있어 익숙했다.<br>
Sweetpad으로 빌드도 하고 다 할 수 있는데 이상하게 불편했다.
- OSLog를 사용하면 터미널에 정상적으로 출력되지 않음 (print는 정상 작동)
- Xcode와 다르게 마지막 줄 개행이 되지 않아 IDE를 스위칭할 때 자꾸 변경사항이 생김

## vs. Claude?
Claude를 깊게 사용하지는 않았지만, Cursor의 장점 중 하나인 @File.swift 이런 방식으로 파일 접근 자동 완성을 지원하지 않는다.<br>
그러나 반대로 Claude는 IDE에 대한 종속성이 없다.<br>
어떤 작업을 할 때 Cursor는 VSCode에 종속이 되었지만, Claude는 터미널이라 확실히 더 활용도가 높은 것 같다.

## 현재
이전에는 Cursor의 자동 완성 및 테스트 코드 작성에 활용했다.

현재는 Claude로 요구사항을 알려준 후 코드를 생성하고 오류 또는 생각과 다를 때 룰을 추가하여 해결하고 있다.

완전한 바이브 코딩은 아직이지만, 점차 영역을 확장하고 있다.
