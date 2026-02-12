---
author: hogumachu
title: Preview 앱 활용
subtitle: 모듈 추상화를 하면 어느 정도 시간이 절약될까?
coverImage: /images/covers/2025-01-07-preview-app-performance-cover.jpg
date: 2025-01-07 21:00
tags: iOS, Performance, Dependency Injection
published: true
---

## 들어가며

Preview 전용 앱 타겟을 분리하고, 의존성을 최소화하면 빌드 시간이 얼마나 줄어들지 궁금했어요.\
실제로 실험해본 결과를 공유해볼게요.

[PreviewApp GitHub Repository](https://github.com/thesteadycompany/Samples/tree/main/PreviewApp)

---

## 프로젝트 구조

현재 프로젝트는 다음과 같은 모듈 구조를 가지고 있어요.

```text
App
AppFeature
HomeFeature
DatabaseClient
DatabaseClientLive
FeatureKit
```

### 타겟 구성

- **`App` 타겟** → `DatabaseClientLive` 모듈을 의존
- **`HomePreviewApp` 타겟** → `DatabaseClient` 모듈만 의존 (Live 구현 제외)

이렇게 Preview 전용 타겟에서는 불필요한 외부 의존성 빌드를 피하도록 구성했어요.

---

## DatabaseClientLive

`DatabaseClientLive` 모듈에는 외부 라이브러리인\
[SQLiteData](https://github.com/pointfreeco/sqlite-data)에 대한 의존성만 추가되어 있어요.

> 단 하나의 외부 모듈이라도 앱 타겟에서 함께 빌드될 경우,\
> 전체 빌드 시간에 유의미한 영향을 줄 것이라는 가설을 세웠어요.

---

## 테스트 방법과 결과

각 타겟을 **3회씩 클린 빌드**하고, 총 소요 시간 기준으로 비교했어요.

| 타겟               | 의존 모듈 구성                     | 3회 빌드 총 시간 |
| ---------------- | ---------------------------- | ---------- |
| `App`            | `DatabaseClientLive` + 외부 모듈 | **18초**    |
| `HomePreviewApp` | `DatabaseClient` (Live 제외)   | **11초**    |

**약 7초, 39% 정도 빌드 시간이 단축**되었어요.

---

## 마치며

Preview 전용 앱 타겟 분리는 **체감 가능한 빌드 시간 개선**을 가져왔어요.\
외부 의존성을 포함한 Live 구현은 Preview와 분리하는 것이 효과적이었고,\
모듈 추상화 + 타겟 분리가 단순한 구조 개선을 넘어 **개발 생산성**에 직접적인 영향을 준다는 걸 확인했어요.

> Preview를 자주 사용하는 UI 중심 개발 환경일수록,\
> 이런 구조적 분리의 누적 시간 절약 효과가 크다고 느꼈어요.
