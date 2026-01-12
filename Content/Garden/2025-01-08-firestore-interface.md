---
author: hogumachu
title: FirebaseFirestore 모듈 추상화
subtitle: Timestamp 디코딩 문제와 해결 방법
date: 2025-01-08 21:00
tags: iOS, Firebase, Dependency Injection
published: true
---
## 🚀 FirebaseFirestore 모듈 추상화

- **목표**
- FirebaseFirestore 모듈을 추상화하여 **외부 의존성을 분리**하고, 테스트와 Preview 환경에서 유연하게 사용할 수 있도록 한다.

---

## 🧱 추상화 진행

기존에 사용하던 `CollectionReference`, `Document`, `Query` 등의 코드를 최소화하기 위해 개발을 진행했다.

### ✅ Protocol 기반 추상화

Firestore에서 제공하는 기능을 모두 **Protocol**로 만들어 준수시켜줬다.

> 이 부분은 큰 문제 없이 진행되었다.

---

## 🗄️ Timestamp 문제 발생

그러나 문제는 `Timestamp`에 있었다.

### 🔍 원인 분석

`FirebaseCore`에서 제공하는 `Timestamp`는 내부에 `seconds` 같은 정보를 가지고 있고, `Decodable`을 준수하고 있다.

당연히 동일한 형태로 `Decodable`을 만들면 디코딩이 잘 될 것이라 생각했다.

> **그러나** `Timestamp`는 내부에서 동작하는 **별도의 디코딩 방식**이 존재해서 불가능했다.

---

## 🧪 해결 방법

`TimestampBuilder`를 별도로 만들어서 해결했다.

### 📌 AS-IS (기존 방식)

```swift
struct SomeResponse: Decodable {
  let value: Int
  let timestamp: Timestamp
}

let response = try snapshot.data(as: SomeResponse.self)
```

### 📌 TO-BE (변경된 방식)

```swift
@DependencyClient
struct TimestampBuilder: Sendable {
  var build: @Sendable (_ value: Any?) throws -> CustomTimestamp
}

struct SomeResponse: Decodable {
  let value: Int
}

@Dependency(TimestampBuilder.self) var builder
let timestamp = try builder(snapshot.data("timestamp"))
let response = try snapshot.data(as: SomeResponse.self)
```

`Timestamp`를 사용하는 부분을 별도로 분리하고, `TimestampBuilder`는 **추상화된 모듈**로 관리하고 있다.

---

## ✅ 정리

* `Timestamp`의 내부 디코딩 로직으로 인해 단순 `Decodable` 준수만으로는 해결되지 않았다.
* `TimestampBuilder`를 별도 모듈로 추상화하여 **의존성 주입** 방식으로 해결했다.
* 더 좋은 방법이 있으면 나중에 전환할 예정이다.

> 현재는 `Timestamp`에 대한 Response가 **3개 정도**밖에 없어서
> 유지 보수에 큰 문제가 없을 것으로 판단된다.
