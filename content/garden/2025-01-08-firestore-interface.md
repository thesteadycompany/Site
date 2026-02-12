---
author: hogumachu
title: FirebaseFirestore 모듈 추상화
subtitle: Timestamp 디코딩 문제와 해결 방법
coverImage: /images/covers/2025-01-08-firestore-interface-cover.jpg
date: 2025-01-08 21:00
tags: iOS, Firebase, Dependency Injection
published: true
---

## 들어가며

FirebaseFirestore 모듈을 추상화해서 외부 의존성을 분리하고,\
테스트와 Preview 환경에서 유연하게 사용할 수 있도록 만들고 싶었어요.

---

## 추상화 진행

기존에 사용하던 `CollectionReference`, `Document`, `Query` 등의 코드를\
최소화하기 위해 Protocol 기반 추상화를 진행했어요.

Firestore에서 제공하는 기능을 모두 Protocol로 만들어 준수시켜줬는데,\
이 부분은 큰 문제 없이 진행되었어요.

---

## Timestamp 문제 발생

그런데 문제는 `Timestamp`에 있었어요.

`FirebaseCore`에서 제공하는 `Timestamp`는 내부에 `seconds` 같은 정보를 가지고 있고,\
`Decodable`을 준수하고 있어요.\
당연히 동일한 형태로 `Decodable`을 만들면 디코딩이 잘 될 거라 생각했는데,

> `Timestamp`는 내부에서 동작하는 **별도의 디코딩 방식**이 존재해서 불가능했어요.

---

## 해결: TimestampBuilder

`TimestampBuilder`를 별도로 만들어서 해결했어요.

### AS-IS (기존 방식)

```swift
struct SomeResponse: Decodable {
  let value: Int
  let timestamp: Timestamp
}

let response = try snapshot.data(as: SomeResponse.self)
```

### TO-BE (변경된 방식)

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

`Timestamp`를 사용하는 부분을 별도로 분리하고,\
`TimestampBuilder`는 추상화된 모듈로 관리하고 있어요.

---

## 마치며

`Timestamp`의 내부 디코딩 로직 때문에 단순한 `Decodable` 준수만으로는 해결이 안 됐고,\
`TimestampBuilder`를 별도 모듈로 추상화해서 의존성 주입 방식으로 풀었어요.\
더 좋은 방법이 있으면 나중에 전환할 예정이에요.

> 현재는 `Timestamp`에 대한 Response가 3개 정도밖에 없어서\
> 유지 보수에 큰 문제가 없을 것으로 판단하고 있어요.
