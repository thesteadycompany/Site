---
author: hogumachu
title: Preview 앱 활용
subtitle: 모듈 추상화를 하면 어느 정도 시간이 절약될까?
date: 2025-01-07 21:00
tags: iOS, Performance, Dependency Injection
published: true
---
## 🚀 Preview 앱 활용하기
- **목표**
- Preview 전용 앱 타겟을 분리하고, 의존성을 최소화했을 때 **빌드 시간 단축 효과**를 확인한다.

🔗 **프로젝트 링크**
[PreviewApp GitHub Repository](https://github.com/thesteadycompany/Samples/tree/main/PreviewApp)

---

## 🧱 프로젝트 구조

현재 프로젝트는 다음과 같은 모듈 구조를 가지고 있다.

```text
App
AppFeature
HomeFeature
DatabaseClient
DatabaseClientLive
FeatureKit
```

### 🎯 타겟 구성

* **`App` 타겟**
  → `DatabaseClientLive` 모듈을 의존

* **`HomePreviewApp` 타겟**
  → `DatabaseClient` 모듈만 의존 (Live 구현 제외)

이를 통해 Preview 전용 타겟에서는 **불필요한 외부 의존성 빌드**를 피하도록 구성했다.

---

## 🗄️ `DatabaseClientLive`

`DatabaseClientLive` 모듈에는 외부 라이브러리인
[`SQLiteData`](https://github.com/pointfreeco/sqlite-data) 에 대한 의존성만 추가되어 있다.

> **실험 가설**
> 단 하나의 외부 모듈이라도, 앱 타겟에서 함께 빌드될 경우 **전체 빌드 시간에 유의미한 영향을 준다**.

---

## 🧪 테스트 방법

* 각 타겟을 **3회씩 클린 빌드**
* 평균이 아닌 **총 소요 시간 기준**으로 비교

---

## 📊 테스트 결과

### ⏱️ 빌드 시간 비교 (3회 기준)

| 타겟               | 의존 모듈 구성                     | 3회 빌드 총 시간 |
| ---------------- | ---------------------------- | ---------- |
| `App`            | `DatabaseClientLive` + 외부 모듈 | **18초**    |
| `HomePreviewApp` | `DatabaseClient` (Live 제외)   | **11초**    |

➡️ **약 7초(≈39%) 빌드 시간 단축**

---

## ✅ 정리

* Preview 전용 앱 타겟 분리는 **체감 가능한 빌드 시간 개선**을 가져온다.
* 외부 의존성을 포함한 Live 구현은 **Preview와 분리**하는 것이 효과적이다.
* 모듈 추상화 + 타겟 분리는 단순한 구조 개선을 넘어 **개발 생산성**에 직접적인 영향을 준다.

> Preview를 자주 사용하는 UI 중심 개발 환경일수록,
> 이러한 구조적 분리는 **누적 시간 절약 효과**가 크다.
